import firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'diretools.firebaseio.com',
  databaseURL: 'https://diretools.firebaseio.com/',
};

try {
  firebase.initializeApp(config);
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack); // eslint-disable-line
  }
}
const database = firebase.database();
export default database;
