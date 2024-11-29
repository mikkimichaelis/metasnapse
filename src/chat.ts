import axios from 'axios';
import readline from 'readline';

const apiUrl = 'http://localhost:3000/api/chat';
const userId = 'user-123'; // Replace this with a unique identifier for each user

// Initialize conversation history
const conversationHistory: { role: 'user' | 'assistant' | 'system'; content: string }[] = [];

// Create interface for reading input from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const chatWithApi = async (input: string) => {
  // Add user input to the conversation history
  conversationHistory.push({ role: 'user', content: input });

  try {
    const response = await axios.post(apiUrl, {
      userId: userId,
      messages: conversationHistory,
    });

    const assistantMessage = response.data.result;
    console.log(`Assistant: ${assistantMessage}`);

    // Add assistant's response to the conversation history
    conversationHistory.push({ role: 'assistant', content: assistantMessage });
  } catch (error) {
    console.error('Error communicating with the chat API:', error);
  }

  promptUser();
};

const promptUser = () => {
  rl.question('You: ', async (input) => {
    if (input.toLowerCase() === 'exit') {
      rl.close();
      return;
    }
    await chatWithApi(input);
  });
};

console.log('Start chatting with the assistant. Type "exit" to end the conversation.');
promptUser();
