const express = require('express');
const router = express.Router();

let fetch;

const initFetch = async () => {
  const fetchModule = await import('node-fetch');
  fetch = fetchModule.default;
};

initFetch();

router.get('/', async (req, res) => {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    console.error('Error: Missing image URL');
    return res.status(400).send('Error: Missing image URL');
  }

  
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      console.error('Error fetching image, status:', response.status);
      return res.status(response.status).send('Error fetching image');
    }

    const contentType = response.headers.get('content-type');
    const buffer = await response.buffer();

    res.setHeader('Content-Type', contentType);
    res.send(buffer);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Error fetching image');
  }
});

module.exports = router;
