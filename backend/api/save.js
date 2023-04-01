const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const uuid = require('uuid').v4

async function writeImgData(user, title, prompt, imageUrl, res) {
  const db = admin.firestore();

  if (!user) {
    res.status(400).send('Missing ID parameter');
    return;
  }

  const id = uuid()
  const userRef = db.collection('users').doc(user).collection('generations').doc(id);
  const docRef = db.collection('generations').doc(id);

  console.log('saving with ' + user)
  const timestamp = new Date().toISOString();

  const base_data = {
    id: id,
    datetime: timestamp,
    user: user
  }

  const data = {
    ...base_data,
    prompt: prompt,
    image: imageUrl,
    title: title
  }

  try {
    await userRef.set(data);
    console.log('Document successfully written to user ref!');

    await docRef.set(base_data);
    console.log('Document reference successfully written to generation feed!');

    res.status(200).json({ message: 'Documents successfully written!', userRef: userRef.path, docRef: docRef.path });
  } catch (error) {
    console.error('Error writing documents: ', error);
    res.status(500).json({ message: 'Error writing documents', error: error.message });
  }
}


router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const {prompt, title, imageUrl, user_id} = req.body

    if (!user_id || !imageUrl || !prompt) {
      res.status(400).send('Missing parameter');
      return;
    }
    await writeImgData(user_id, title, prompt, imageUrl, res)
  } catch (error) {
    next(error);
  }

});

module.exports = router;