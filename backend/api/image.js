const { Configuration, OpenAIApi } = require('openai');
const router = require('express').Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
router.get('/', async (res) =>{
    res.status(200).json({"message": "sign of life"})
})
router.post('/', async (req, res) => {
  // Implement the image API call and return response
  console.log('Attempting to generate image');

  const prompt = req.body.prompt;

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '512x512', // Customize the desired image size
      response_format: 'url',
    });
    console.log(response.data)
    if (response.data && response.data.data && response.data.data.length > 0) {
      const imageUrl = response.data.data[0].url;
      res.json({ imageUrl });
    } else {
      res.status(400).json({ error: 'No image generated.' });
    }
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Error generating image.' });
  }
});

module.exports = router;
