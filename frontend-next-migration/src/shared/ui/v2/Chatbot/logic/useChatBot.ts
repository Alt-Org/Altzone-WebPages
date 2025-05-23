import { useState, useEffect } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import data1 from '@/shared/i18n/locales/fi/heroes.json';
import data2 from '@/shared/i18n/locales/fi/about.json';

export interface ChatMessage {
    role: string;
    content: string;
}

/**
 * Flattens a nested object into an array of strings with key-value pairs.
 *
 * @param {object} obj - The object to flatten.
 * @param {string} [prefix=''] - The prefix for nested keys.
 * @returns {string[]} - An array of flattened key-value pairs as strings.
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
 * Custom hook for chatbot functionality
 *
 * @returns {Object} - An object containing chatbot state and functions
 */
export const useChatBot = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [context, setContext] = useState('');
    const [visible, setVisible] = useState(true);
    const { t } = useClientTranslation('chatbot');

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

    const clearChat = () => {
        setMessages([]);
        setUserInput('');
        setContext('');
    };

    const closeChat = () => setVisible(false);

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
    };
};
