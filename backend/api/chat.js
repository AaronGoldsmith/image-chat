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
    if(userMessage === ''){return;}
    // Prepare the API call with messages
    const messages = [
      { role: 'system', content: 'You are interpreterting partial user input to create vivid textual descriptions for the user\'s minds eye.' },
      { role: 'user', content: 'a white siamese' },
      { role: 'system', content: 'a close up, studio photographic portrait of a white siamese cat that looks curious, backlit ears'},
      { role: 'user', content: 'a;slkdjf;alskdjfasdf blah blah trouble' },
      { role: 'system', content: 'Vibrant blossoms, magically enchanting, blooming and twirling in intricate patterns, captured in an infinite series of reflections and repetitions, refracted through a prism of colors and shapes, creating an ethereal dance of light and motion.'},
      { role: 'user', content: userMessage + '. You should only respond with your version, or interpretation – '}
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
