/* global window */

import firebase from 'firebase';
import rand from 'random-key';

import getPlayerName from './getPlayerName';
import getPlayerColor from './getPlayerColor';

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

const storageAvailable = () => {
  try {
    const storage = window.localStorage;
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
};

const getStoredId = (tableKey) => {
  if (!storageAvailable()) {
    return null;
  }
  const item = `direTable/${tableKey}/myPlayerKey`;
  const storedId = window.localStorage.getItem(item);
  return storedId;
};
const setStoredId = (tableKey, myPlayerKey) => {
  if (!storageAvailable()) {
    return null;
  }
  const item = `direTable/${tableKey}/myPlayerKey`;
  const storedId = window.localStorage.setItem(item, myPlayerKey);
  return storedId;
};

const isValidTable = (key, snapshot) => key && key.length === keyLength && snapshot.hasChild(key);
export const joinTable = proposedKey =>
  database.ref('tables').once('value').then((snapshot) => {
    let tableKey = proposedKey;
    if (!isValidTable(tableKey, snapshot)) {
      tableKey = getUniqueKey(snapshot);
    }

    const playersRef = database.ref(`tables/${tableKey}/players`);
    const storedId = getStoredId(tableKey);
    const myPlayerKey = storedId || playersRef.push().key;
    setStoredId(tableKey, myPlayerKey);
    const myPlayerRef = database.ref(`tables/${tableKey}/players/${myPlayerKey}`);
    myPlayerRef.update({
      connected: true,
    });
    if (!storedId && myPlayerKey) {
      // this player will be new, send an intro message
      const messagesRef = database.ref(`tables/${tableKey}/messages`);
      messagesRef.push({
        content: myPlayerKey,
        player: '',
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        type: 'connected',
      });
    }
    myPlayerRef.onDisconnect().update({
      connected: false,
      disconnectedAt: firebase.database.ServerValue.TIMESTAMP,
    });
    // player update done as a transaction in order to
    // avoid name & color collisions
    playersRef.transaction((players) => {
      if (players) {
        // otherwise there are no players (shouldn't happen)
        const myPlayer = players[myPlayerKey];
        if (myPlayer.gm === undefined) {
          // I'm the first player, become the GM!
          myPlayer.gm = Object.keys(players).length === 1;
        }
        if (!myPlayer.name) {
          const currentNames = Object.values(players).filter(p => !!p.name).map(p => p.name);
          myPlayer.name = getPlayerName(currentNames);
        }
        if (!myPlayer.color) {
          const currentColors = Object.values(players).filter(p => !!p.color).map(p => p.color);
          myPlayer.color = getPlayerColor(myPlayer.gm, currentColors);
        }
        // TODO: figure out player limit
      }
      return players;
    });
    return {
      table: tableKey,
      player: myPlayerKey,
    };
  });

/* Data Update Functions */
