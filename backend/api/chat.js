const express = require('express');
const router = express.Router();
const openai = require('openai');

// Load your OpenAI API key from an environment variable or secret management service
openai.apiKey = process.env.OPENAI_API_KEY;

// Endpoint for chat API
router.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Prepare the API call with messages
    const messages = [
      { role: 'system', content: 'You are a helpful assistant that can generate images from user descriptions.' },
      { role: 'user', content: userMessage }
    ];

    // Call the OpenAI Chat API
    const chatResponse = await openai.ChatCompletion.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    // Extract the assistant's reply and send it back to the frontend
    const assistantReply = chatResponse.choices[0].message.content;
    res.status(200).json({ reply: assistantReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the chat request.' });
  }
});

module.exports = router;
