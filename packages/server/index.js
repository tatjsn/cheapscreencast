const express = require('express');
const admin = require('firebase-admin');
const account = require('./secret.json');
const screenshot = require('screenshot-desktop');
const ip = require('ip');

admin.initializeApp({
  credential: admin.credential.cert(account),
  databaseURL: 'https://watcher-ad785.firebaseio.com',
});

const db = admin.firestore();

// screenshot({ filename: 'screenshots/shot.jpg' })
//   .then(path => {
//     console.log('path', path);
//   })
//   .catch(err => {
//     console.log(err);
//   });


function addOneScreenshot(path) {
  return db.collection('screenshots').add({
    path,
    ts: admin.firestore.FieldValue.serverTimestamp(),
  });
}

const intervalId = setInterval(async () => {
  try {
    const path = await screenshot({ filename: 'screenshots/shot.jpg' });
    console.log(path);
    await addOneScreenshot(path);
    console.log('Added path to db');
  } catch (err) {
    console.log(err);
    clearInterval(intervalId);
  }
}, 5 * 60 * 1000);

const app = express();

app.use(express.static('screenshots'));
app.listen(5000);
console.log(`ip = ${ip.address()}`);
