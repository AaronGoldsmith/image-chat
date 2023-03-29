const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');

// Set the OpenAI API key
// load env vars
dotenv.config();

// Set the OpenAI API key using the configuration object
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

router.get('/', async function (req, res) {
  res.status(200).json({ "message": "you hit chat" });
})

// Endpoint for chat API
router.post('/', async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Prepare the API call with messages
    const messages = [
      { role: 'system', content: 'You are a helpful assistant creating alt tags from user prompts.' },
      { role: 'user', content: 'a white siamese cat' },
      { role: 'system', content: 'a close up, studio photographic portrait of a white siamese cat that looks curious, backlit ears'},
      { role: 'user', content: userMessage }
    ];

    // Call the OpenAI Chat API
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    // Extract the assistant's reply and send it back to the frontend
    const assistantReply = chatResponse.data.choices[0].message;
    res.status(200).json({ reply: assistantReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the chat request.' });
  }
});

module.exports = router;
