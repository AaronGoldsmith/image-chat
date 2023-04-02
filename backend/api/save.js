const express = require('express');
const router = express.Router();
// const axios = require('axios')
const admin = require('firebase-admin');
const uuid = require('uuid').v4

let fetch;
const initFetch = async () => {
  const fetchModule = await import('node-fetch');
  fetch = fetchModule.default;
};
initFetch();

async function saveImageToFirebase(url, filename) {
  try {
    const response = await fetch(url)
    const data = await response.arrayBuffer();
    const bucket = admin.storage().bucket();
    const file = bucket.file(`images/${filename}`);
    await file.save(Buffer.from(data));
    console.log('Image saved successfully!');
  } catch (error) {
    console.error('Error saving image:', error);
  }
}


async function writeImgData(user, title, prompt, id, res) {
  const db = admin.firestore();

  if (!user) {
    res.status(400).send('Missing ID parameter');
    return;
  }

  // save static asset
  const filename = `${id}.jpg`

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
    image: `imagegen-36210.appspot.com/images/${filename}`,
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
    const id = uuid()
    const filename = `${id}.jpg`
    await saveImageToFirebase(imageUrl, filename )
    await writeImgData(user_id, title, prompt, id, res)

    // await writeImgData(user_id, title, prompt, imageData, res)
  } catch (error) {
    next(error);
  }

});



module.exports = router;
