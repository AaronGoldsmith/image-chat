const express = require('express');
const firebase = require('firebase');
const morgan = require('morgan');
const cors = require('cors');
const admin = require('firebase-admin');

const chatRoutes = require('./api/chat');
const imageRoutes = require('./api/image');


// load and configure environmental vars
const dotenv = require('dotenv');
dotenv.config();
const serviceAccount = require(`./${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);

try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (err) {
    console.error('Firebase initialization error', err.stack);
  }

  function stringToNumber(s) {
    return [...s].reduce((hashValue, char) => {
      const charCode = char.charCodeAt(0);
      return ((hashValue << 5) + hashValue) + charCode;
    }, 5381);
  }

  async function writeImgData(user, prompt, imageUrl, res) {
    const db = admin.firestore();
  
    if (!user) {
      res.status(400).send('Missing ID parameter');
      return;
    }
  
    const gen_id = stringToNumber(imageUrl);
    const userRef = db.collection('users').doc(user).collection('generations').doc(String(gen_id));
    const docRef = db.collection('generations').doc(String(gen_id));
  
    const timestamp = new Date().toISOString();
    const data = {
      prompt: prompt,
      image: imageUrl,
      datetime: timestamp,
      user: user
    };
  
    try {
      await userRef.set(data);
      console.log('Document successfully written to user ref!');
  
      await docRef.set(data);
      console.log('Document successfully written to generations!');
  
      res.status(200).send('Documents successfully written!');
    } catch (error) {
      console.error('Error writing documents: ', error);
      res.status(500).send('Error writing documents');
    }
  }
  


let fetch
const initServer = async () => {
  fetch = await import('node-fetch').then((module) => module.default);

  const app = express();
  // Enable CORS
  app.use(cors({
    origin: process.env.API_ORIGIN
  }));  
  // Enable logging
  app.use(morgan('combined'));
  app.use(express.json());

  app.use('/api/chat', chatRoutes);
  app.use('/api/image', imageRoutes);
  app.post('/api/save', (req, res) => {
    console.log(req.body)
    res.json(200)
    const {prompt, imageUrl, user_id} = req.body
  
    if (!user_id) {
      res.status(400).send('Missing ID parameter');
      return;
    }
    writeImgData(user_id, prompt, imageUrl, res)
  })
  app.get('/proxy-image', async (req, res) => {
    const imageUrl = req.query.url;
  
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
  
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  

};

initServer()