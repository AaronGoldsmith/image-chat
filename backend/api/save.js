const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const stringToNumber = require('../helpers/stringToNumber');

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


router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    // res.json(200)  // Comment out or remove this line
    const {prompt, imageUrl, user_id} = req.body

    if (!user_id) {
      res.status(400).send('Missing ID parameter');
      return;
    }
    await writeImgData(user_id, prompt, imageUrl, res)
  } catch (error) {
    next(error);
  }

});

module.exports = router;