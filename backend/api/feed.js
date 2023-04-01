const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.get('/', async (req, res) => {
  const db = admin.firestore();

  try {
    const generationsRef = db.collection('generations');
    const snapshot = await generationsRef.orderBy('datetime', 'desc').limit(100).get();

    const entries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(entries);
  } catch (error) {
    console.error('Error fetching feed:', error);
    res.status(500).json({ message: 'Error fetching feed', error: error.message });
  }
});

module.exports = router;
