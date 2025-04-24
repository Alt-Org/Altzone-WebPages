import React, { useState } from 'react';

export const ChatBotComponent: React.FC = () => {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([
        {
            role: 'assistant',
            content: 'Hei! Olen Albotti. Ja voin kertoa pelistä kaiken mitä haluat tietää',
        },
    ]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        // Lisää käyttäjän viesti keskusteluun
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
                    model: 'gpt-3.5-turbo',
                    messages: newMessages,
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

    return (
        <div
            style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
            }}
        >
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
