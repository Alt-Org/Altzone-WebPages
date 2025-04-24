import React, { useState } from 'react';

const ChatBotComponent = () => {
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const runTest = async () => {
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY; // Käytä ympäristömuuttujaa
            if (!apiKey) {
                setError('OpenAI API key is missing. Please set it in the .env.local file.');
                setLoading(false);
                return;
            }

            const res = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'user',
                            content: "Say 'Hello World!'",
                        },
                    ],
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                setError(`Error: ${JSON.stringify(errorData)}`);
                setLoading(false);
                return;
            }

            const data = await res.json();
            setResponse(data.choices[0]?.message?.content || 'No response');
        } catch (err) {
            setError(`Unexpected Error: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>ChatBot Test</h1>
            <button
                onClick={runTest}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Run Test'}
            </button>
            {response && <p>Response: {response}</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
};

export default ChatBotComponent;
