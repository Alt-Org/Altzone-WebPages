import { useState, useEffect, useRef } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import { useGetChatbotDataQuery } from '@/shared/api';
import { createChatbotContext } from '../utils/directusDataProcessor';

/**
 * Represents a chat message with role and content
 * @interface ChatMessage
 * @property {string} role - The role of the message sender ('user' | 'assistant' | 'system')
 * @property {string} content - The text content of the message
 */
export interface ChatMessage {
    role: string;
    content: string;
}

/**
 * Custom hook for chatbot functionality that manages chat state, messages, and API interactions.
 * Provides chat functionality including message handling, API calls to OpenAI,
 * auto-scrolling, error handling, and internationalization support.
 *
 * This hook now fetches context data from Directus collections (heroes, general_content, faq)
 * instead of using static JSON files, providing dynamic and up-to-date information.
 *
 * @returns {Object} Chatbot state and control functions
 * @returns {ChatMessage[]} returns.messages - Array of chat messages
 * @returns {string} returns.userInput - Current user input text
 * @returns {boolean} returns.loading - Whether a request is in progress
 * @returns {string | null} returns.error - Current error message if any
 * @returns {Function} returns.setUserInput - Function to update user input
 * @returns {Function} returns.handleSendMessage - Function to send a message to the API
 * @returns {Function} returns.clearChat - Function to clear all messages and reset state
 * @returns {React.RefObject<HTMLDivElement>} returns.messagesEndRef - Ref for auto-scrolling to latest message
 *
 * @example
 * const {
 *   messages,
 *   userInput,
 *   loading,
 *   error,
 *   setUserInput,
 *   handleSendMessage,
 *   clearChat,
 *   messagesEndRef
 * } = useChatBot();
 */
export const useChatBot = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [context, setContext] = useState('');
    const { t, i18n } = useClientTranslation('chatbot');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch data from Directus
    const { data: chatbotData, isLoading: isDataLoading } = useGetChatbotDataQuery();

    // Initialize context when data is loaded
    useEffect(() => {
        if (!isDataLoading && chatbotData) {
            const currentLanguage = i18n.language || 'fi';
            const newContext = createChatbotContext(chatbotData, currentLanguage);
            setContext(newContext);
        }
    }, [chatbotData, isDataLoading, i18n.language]);

    // Initialize welcome message
    useEffect(() => {
        setMessages([
            {
                role: 'assistant',
                content: t('welcomeMessage'),
            },
        ]);
    }, [t]);

    // Auto-scroll to bottom when new message is added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    /**
     * Clears all chat messages and resets the chat state while preserving system context
     * @example
     * clearChat(); // Removes all messages and clears input but keeps system context
     */
    const clearChat = () => {
        setMessages([
            {
                role: 'assistant',
                content: t('welcomeMessage'),
            },
        ]);
        setUserInput('');
        // Context will be refreshed automatically by useEffect when data changes
    };

    /**
     * Sends user message to OpenAI API and gets response
     * Validates input, makes API call, and updates messages
     * @example
     * // User types "Hello" and clicks send
     * handleSendMessage(); // Sends to API and gets AI response
     */
    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        if (userInput.length > 40) {
            setError(t('errorMessageTooLong'));
            return;
        }

        const newMessages = [...messages, { role: 'user', content: userInput }];
        setMessages(newMessages);
        setUserInput('');
        setLoading(true);
        setError(null);

        try {
            const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
            if (!apiKey) {
                setError(t('errorApiKeyMissing'));
                setLoading(false);
                return;
            }

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [
                        {
                            role: 'system',
                            content: t('systemPrompt') + '\n\n' + context,
                        },
                        ...newMessages,
                    ],
                    max_tokens: 200,
                    stop: ['.'],
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(`Error: ${JSON.stringify(errorData)}`);
                setLoading(false);
                return;
            }

            const data = await response.json();
            const assistantMessage = data.choices[0]?.message?.content || t('errorDefaultResponse');

            setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
        } catch (err) {
            setError(`${t('errorUnexpected')} ${err}`);
        } finally {
            setLoading(false);
        }
    };

    return {
        messages,
        userInput,
        loading,
        error,
        setUserInput,
        handleSendMessage,
        clearChat,
        messagesEndRef,
    };
};
