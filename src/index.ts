import express, { Request, Response } from 'express';
import OpenAI from 'openai';
require('dotenv').config();  console.log('dotenv sucks ass');

(async () => {

    const app = express();
    const port = process.env.PORT || 3000;

    // Middleware to parse JSON requests
    app.use(express.json());

    // Setting up OpenAI instance
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // In-memory storage for conversation history (for demonstration purposes only)
    const conversations: { [userId: string]: { role: 'user' | 'assistant' | 'system'; content: string }[] } = {};

    // Endpoint to interact with OpenAI API for chat generation
    app.post('/api/chat', async (req: any, res: any) => {
        try {
            const { messages, model, userId } = req.body;

            if (!userId || !messages || !Array.isArray(messages)) {
                return res.status(400).json({ error: 'User ID and messages array are required.' });
            }

            // Append new messages to existing conversation
            if (!conversations[userId]) {
                conversations[userId] = [];
            }
            conversations[userId] = [...conversations[userId], ...messages];

            const response = await openai.chat.completions.create({
                model: model || 'gpt-4o',
                messages: conversations[userId],
            });

            if (response.choices && response.choices.length > 0) {
                // Add assistant's response to the conversation
                const assistantMessage = {
                    role: 'assistant',
                    content: response.choices[0].message.content,
                };
                // @ts-ignore
                conversations[userId].push(assistantMessage);

                res.status(200).json({ result: assistantMessage.content });
            } else {
                res.status(500).json({ error: 'No response from OpenAI.' });
            }
        } catch (error) {
            console.error('Error generating chat response from OpenAI:', error);
            res.status(500).json({ error: 'An error occurred while generating the chat response.' });
        }
    });
    // Starting the server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})();

// TypeScript types (Optional, for additional clarity)
type ChatRequestBody = {
    messages: { role: 'user' | 'assistant' | 'system'; content: string }[];
    model?: string;
};

declare module 'express' {
    interface Request {
        body: ChatRequestBody;
    }
}