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
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Can you help me come up with a text description around specific topics?' },
      { role: 'system', content: 'Sure, provide a topic and I will provide a descriptive interpretation' },
      { role: 'user', content: 'little raddish man with sunglasses, photograph' },
      { role: 'system', content: 'worriesome radicalized radish hipster, dank radish meme Leica DG Vario-Elmarit 50-200mm f/2.8-4 Power O.I.S.'},
      { role: 'user', content: userMessage }
    ];

    // Call the OpenAI Chat API
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    // Extract the assistant's reply and send it back to the frontend
    const assistantReply = chatResponse.data.choices[0].message;
    console.log(assistantReply)
    res.status(200).json({ reply: assistantReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the chat request.' });
  }
});

module.exports = router;
