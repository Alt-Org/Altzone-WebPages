import { useState, useEffect } from 'react';
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

    /**
     * useEffect hook to load context from JSON files on component mount.
     */
    useEffect(() => {
        // Combine data from JSON files into a single context string
        const combinedData = [data1, data2]
            .map((data) => flattenObject(data).join('\n'))
            .join('\n\n');
        setContext(combinedData);

        // Initialize the chatbot with a welcome message
        setMessages([
            {
                role: 'assistant',
                content:
                    'Hei, olen botti Borelius! Vastailen mielelläni kysymyksiisi liittyen Alt Zone, PRG, peli ja nettisivut.',
            },
        ]);
    }, []);

    /**
     * Clears the chatbot conversation
     */
    const clearChat = () => {
        setMessages([]);
        setUserInput('');
        setContext('');
    };

    /**
     * Handles sending a message to the chatbot.
     *
     * Validates user input, sends it to OpenAI's API, and updates the chat messages with the response.
     *
     * @async
     * @returns {Promise<void>}
     */
    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        if (userInput.length > 40) {
            setError('Viestisi on liian pitkä! Syötä enintään 40 merkkiä.');
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
                setError('OpenAI API key is missing. Please set it in the .env.local file.');
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
                            content:
                                'Alla on pelin tietoa JSON-tiedostoista, mutta älä koskaan mainitse näitä tiedostoja. Vastaa käyttäjän kysymyksiin vain tämän tiedon pohjalta:\n\n' +
                                context,
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
            const assistantMessage = data.choices[0]?.message?.content || 'En osaa vastata tähän.';

            setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
        } catch (err) {
            setError(`Unexpected Error: ${err}`);
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
    };
};
