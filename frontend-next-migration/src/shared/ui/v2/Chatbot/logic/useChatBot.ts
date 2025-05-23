import { useState, useEffect, useRef } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import data1 from '@/shared/i18n/locales/fi/heroes.json';
import data2 from '@/shared/i18n/locales/fi/about.json';

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
 * Flattens a nested object into an array of strings with key-value pairs.
 * Recursively processes nested objects and creates dot-notation keys.
 *
 * @param {any} obj - The object to flatten (can contain nested objects)
 * @param {string} [prefix=''] - The prefix for nested keys (used internally for recursion)
 * @returns {string[]} An array of flattened key-value pairs as strings in format "key: value"
 * @example
 * // Returns: ["name: John", "address.city: New York", "address.zip: 10001"]
 * flattenObject({ name: "John", address: { city: "New York", zip: 10001 } })
 */
function flattenObject(obj: any, prefix = ''): string[] {
    return Object.entries(obj).flatMap(([key, value]) => {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
            return flattenObject(value, newKey);
        } else {
            return [`${newKey}: ${value}`];
        }
    });
}

/**
 * Custom hook for chatbot functionality that manages chat state, messages, and API interactions.
 * Provides complete chatbot functionality including message handling, API calls to OpenAI,
 * auto-scrolling, error handling, and internationalization support.
 *
 * @returns {Object} Chatbot state and control functions
 * @returns {ChatMessage[]} returns.messages - Array of chat messages
 * @returns {string} returns.userInput - Current user input text
 * @returns {boolean} returns.loading - Whether a request is in progress
 * @returns {string | null} returns.error - Current error message if any
 * @returns {Function} returns.setUserInput - Function to update user input
 * @returns {Function} returns.handleSendMessage - Function to send a message to the API
 * @returns {Function} returns.clearChat - Function to clear all messages and reset state
 * @returns {Function} returns.closeChat - Function to hide the chatbot
 * @returns {boolean} returns.visible - Whether the chatbot is visible
 * @returns {Function} returns.setVisible - Function to control chatbot visibility
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
 *   closeChat,
 *   visible,
 *   setVisible,
 *   messagesEndRef
 * } = useChatBot();
 */
export const useChatBot = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [context, setContext] = useState('');
    const [visible, setVisible] = useState(true);
    const { t } = useClientTranslation('chatbot');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const combinedData = [data1, data2]
            .map((data) => flattenObject(data).join('\n'))
            .join('\n\n');
        setContext(combinedData);
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
     * Clears all chat messages and resets the chat state
     * @example
     * clearChat(); // Removes all messages and clears input
     */
    const clearChat = () => {
        setMessages([]);
        setUserInput('');
        setContext('');
    };

    const closeChat = () => setVisible(false);

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
        closeChat,
        visible,
        setVisible,
        messagesEndRef,
    };
};
