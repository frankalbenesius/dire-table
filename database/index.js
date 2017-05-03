import firebase from 'firebase';
import rand from 'random-key';

/* Database Initialization */

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

/* Database References */

const tablesRef = database.ref('tables');

/* Utility Functions */

const keyLength = 6;
const getUniqueKey = (tablesSnapshot) => {
  const generatedKey = rand.generate(keyLength);
  if (tablesSnapshot.hasChild(generatedKey)) {
    // this check is mostly unecessary;
    return getUniqueKey(tablesSnapshot);
  }
  return generatedKey;
};

/* Table Initialization Function */

export const initTable = key =>
  tablesRef.once('value').then((snapshot) => {
    if (key && key.length === keyLength && snapshot.hasChild(key)) {
      return key;
    }
    return getUniqueKey(snapshot);
  });

/* Data Update Functions */
