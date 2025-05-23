/* eslint-disable no-console */
/**
 * ChatBotComponent
 *
 * A React component that acts as a chatbot. It uses OpenAI's API to respond to user questions
 * based on context loaded from JSON files.
 */

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import data1 from '@/shared/i18n/locales/fi/heroes.json';
import data2 from '@/shared/i18n/locales/fi/about.json';
import xButton from '@/shared/assets/icons/xButton.svg';
import xsLogo from '@/shared/assets/icons/xsAltLogo.svg';
import './ChatBot.scss';

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
 * ChatBotComponent
 *
 * A functional React component that provides a chatbot interface. The chatbot uses OpenAI's API
 * to generate responses based on user input and context from JSON files.
 *
 * @returns {JSX.Element} - The rendered chatbot component.
 */
export const ChatBotComponent: React.FC = () => {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
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
                content: 'Hei! Olen Albotti. Voin kertoa pelistä kaiken mitä haluat tietää.',
            },
        ]);
    }, []);

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

            // --- COST CALCULATION ---
            const tokenPrompt = 0.0000000015;
            const tokenCompletion = 0.000000006;
            const apiCall = 0.0001;

            const promptTokens = data.usage?.prompt_tokens || 0;
            const completionTokens = data.usage?.completion_tokens || 0;
            const costTotal =
                promptTokens * tokenPrompt + completionTokens * tokenCompletion + apiCall;

            console.log('Using model:', data.model);
            console.log(`Prompt tokens used: ${promptTokens}`);
            console.log(`Completion tokens used: ${completionTokens}`);
            console.log(`Single call cost: €${costTotal}`);
            console.log(`Estimated cost for 1000 calls: €${costTotal * 1000}`);
            // --- END COST CALCULATION ---

            setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
        } catch (err) {
            setError(`Unexpected Error: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <Image
                    src={xsLogo}
                    alt="XS Logo"
                    className="logo"
                    width={24}
                    height={24}
                />
                <h2>Chatbot</h2>
                <button
                    className="close-button"
                    onClick={() => {
                        setMessages([]);
                        setUserInput('');
                        setContext('');
                    }}
                >
                    <Image
                        src={xButton}
                        alt="Close"
                        width={20}
                        height={20}
                    />
                </button>
            </div>
            <div className="chatbot-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.role === 'assistant' ? 'assistant-message' : 'user-message'}`}
                    >
                        {msg.content}
                    </div>
                ))}
                {error && <p className="error-message">{error}</p>}
                <div className="input-container">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                        placeholder="Kirjoita viestisi..."
                        className="message-input"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={loading}
                        className="send-button"
                    >
                        {loading ? 'Lähetetään...' : 'Lähetä'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBotComponent;
