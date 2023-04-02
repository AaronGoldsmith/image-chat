const admin = require('firebase-admin');
const serviceAccount = require(`../${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'imagegen-36210.appspot.com'
  });
} catch (err) {
  console.error('Firebase initialization error', err.stack);
}
