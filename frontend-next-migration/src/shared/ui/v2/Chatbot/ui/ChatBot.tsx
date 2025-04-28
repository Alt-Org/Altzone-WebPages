/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import data1 from '@/shared/i18n/locales/fi/heroes.json';
import data2 from '@/shared/i18n/locales/fi/about.json';

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

export const ChatBotComponent: React.FC = () => {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [context, setContext] = useState('');

    useEffect(() => {
        // Lataa konteksti sovelluksen alussa
        const combinedData = [data1, data2]
            .map((data) => flattenObject(data).join('\n'))
            .join('\n\n');
        setContext(combinedData);

        // Alustava viesti
        setMessages([
            {
                role: 'assistant',
                content: 'Hei! Olen Albotti. Voin kertoa pelistä kaiken mitä haluat tietää.',
            },
        ]);
    }, []);

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

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
                                'Alla on pelin tietoa JSON-tiedostoista, mutta älä koskaan mainitse näitä tiedostoja. Vastaa käyttäjän kysymyksiin lyhyesti vain tämän tiedon pohjalta:\n\n' +
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

            // --- COST CALCULATION --- source for prices: https://platform.openai.com/docs/pricing
            //gpt-4o-mini
            const tokenPrompt = 0.0000000015;
            const tokenCompletion = 0.000000006;
            const apiCall = 0.0001; // Cost per API call, estimated.

            // gpt-3.5-turbo
            //const tokenPrompt = 0.000003;
            //const tokenCompletion = 0.000006;
            //const apiCall = 0.0001; // Cost per API call, estimated.

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
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h1>ChatBot</h1>
            <div
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '10px',
                    height: '400px',
                    overflowY: 'auto',
                    marginBottom: '10px',
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            textAlign: msg.role === 'assistant' ? 'left' : 'right',
                            margin: '10px 0',
                        }}
                    >
                        <strong>{msg.role === 'assistant' ? 'Albotti' : 'Sinä'}:</strong>{' '}
                        {msg.content}
                    </div>
                ))}
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(event) => setUserInput(event.target.value)}
                    placeholder="Kirjoita viestisi..."
                    style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                />
                <button
                    onClick={handleSendMessage}
                    disabled={loading}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    {loading ? 'Lähetetään...' : 'Lähetä'}
                </button>
            </div>
        </div>
    );
};

export default ChatBotComponent;
