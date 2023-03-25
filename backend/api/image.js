const express = require('express');
const router = express.Router();
const openai = require('openai'); // Assuming you have installed the OpenAI package

openai.apiKey = process.env.OPENAI_API_KEY

router.post('/', async (req, res) => {
  // Implement the image API call and return response
  console.log('attempting to get image')
});

module.exports = router;
