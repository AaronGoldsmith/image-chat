
const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.get('/:userId/generations/:generationId', async (req, res) => {
  const { userId, generationId } = req.params;
  const db = admin.firestore();
  const userRef = db.collection('users').doc(userId).collection('generations').doc(generationId);

  try {
    const doc = await userRef.get();
    if (doc.exists) {
      res.status(200).json(doc.data());
    } else {
      res.status(404).json({ message: 'Generation not found' });
    }
  } catch (error) {
    console.error('Error fetching generation: ', error);
    res.status(500).json({ message: 'Error fetching generation', error: error.message });
  }
});

// Other code...
module.exports = router;