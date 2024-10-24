const express = require('express');
const bodyParser = require('body-parser');
const readline = require('readline');
import { ChatGPTAPI } from 'chatgpt'

(async () => {



    const app = express();
    const port = 3000;

    // Middleware setup
    app.use(bodyParser.json());

    // ChatGPT API setup
    const api = new ChatGPTAPI({
        apiKey: 'YOUR_OPENAI_API_KEY' // Replace with your actual API key
    });

    // Endpoint for handling user messages
    app.post('/user-message', async (req, res) => {
        const userMessage = req.body.message;

        if (!api.apiKey || api.apiKey === 'YOUR_OPENAI_API_KEY') {
            console.error('Error: Missing or invalid API key.');
            return res.status(500).send('Server configuration error: Missing API key.');
        }

        try {
            // Send user message to ChatGPT
            const conversationResponse = await api.sendMessage(userMessage);

            if (!conversationResponse || !conversationResponse.text) {
                throw new Error('Unexpected response structure from ChatGPT API');
            }

            const chatResponse = conversationResponse.text;

            // Send metadata request (this is invisible to the user)
            const metadataResponse = await api.sendMessage(
                `Analyze the following response for sentiment, topic, and keywords: "${chatResponse}"`
            );

            if (!metadataResponse || !metadataResponse.text) {
                throw new Error('Unexpected response structure from metadata request');
            }

            const metadata = metadataResponse.text;

            // Respond to user
            res.json({ response: chatResponse });

            // Log metadata for analysis (optional - store in DB, log, etc.)
            console.log('Metadata:', metadata);
        } catch (error) {
            console.error('Error communicating with ChatGPT:', error.message);
            res.status(500).send('Error processing your request. Please try again later.');
        }
    });

    app.listen(port, () => {
        console.log(`Middleware API listening at http://localhost:${port}`);
    });

    // Command line UI for multiple chat contexts using readline and ansi-escapes
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> '
    });

    let chatContexts = {};

    function displayContextMenu() {
        console.clear();
        console.log('Select a chat context or create a new one:');
        const contextNames = Object.keys(chatContexts);
        contextNames.forEach((name, index) => {
            console.log(`${index + 1}. ${name}`);
        });
        console.log(`${contextNames.length + 1}. Create new context`);
        rl.prompt();
    }

    function createNewContext() {
        rl.question('Enter a name for the new chat context: ', (contextName) => {
            if (chatContexts[contextName]) {
                console.log('Context already exists. Returning to menu.');
            } else {
                chatContexts[contextName] = [];
                console.log(`New context '${contextName}' created.`);
            }
            displayContextMenu();
        });
    }

    function selectContext(index) {
        const contextNames = Object.keys(chatContexts);
        const contextName = contextNames[index];
        if (contextName) {
            console.log(`Switched to context: ${contextName}`);
            startChat(contextName);
        } else {
            console.log('Invalid context selected. Returning to menu.');
            displayContextMenu();
        }
    }

    function startChat(contextName) {
        rl.setPrompt(`${contextName}> `);
        rl.prompt();

        rl.removeAllListeners('line'); // Remove previous listeners to prevent multiple handlers

        rl.on('line', async (line) => {
            if (line.toLowerCase() === 'exit') {
                displayContextMenu();
                return;
            }

            try {
                const response = await api.sendMessage(line);
                const chatResponse = response.text;
                chatContexts[contextName].push({ user: line, response: chatResponse });
                console.log(`Joan: ${chatResponse}`);
            } catch (error) {
                console.error('Error communicating with middleware API:', error.message);
            }

            rl.prompt();
        });
    }

    rl.on('line', (line) => {
        const choice = parseInt(line.trim(), 10);
        const contextNames = Object.keys(chatContexts);
        if (choice === contextNames.length + 1) {
            createNewContext();
        } else if (choice > 0 && choice <= contextNames.length) {
            selectContext(choice - 1);
        } else {
            console.log('Invalid choice. Please try again.');
            displayContextMenu();
        }
    });

    displayContextMenu();
})();
