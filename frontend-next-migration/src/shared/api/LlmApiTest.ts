/* eslint-disable no-console */
// Runnable with command: npx ts-node src/shared/api/LlmApiTest.ts
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function runTest() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error('OpenAI API key is missing. Please set it in the .env.local file.');
        return;
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
                        content: 'kerro millä kielellä kirjoitan',
                    },
                ],
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error:', error);
            return;
        }

        const data = await response.json();
        console.log('API Response Summary:');
        console.log('Model:', data.model);
        console.log('Tokens Used:', data.usage.total_tokens);
        console.log('Assistant Response:', data.choices[0]?.message?.content);
    } catch (error) {
        console.error('Unexpected Error:', error);
    }
}

runTest();
