const crypto = require('crypto');
const express = require('express');
const admin = require('firebase-admin');
const screenshot = require('screenshot-desktop');
const ip = require('ip');
const account = require('./secret.json');

admin.initializeApp({
  credential: admin.credential.cert(account),
  databaseURL: 'https://watcher-ad785.firebaseio.com',
});

const db = admin.firestore();

const ipAddress = ip.address();
const port = 5000;

function createFileName(timeStamp) {
  return crypto.createHash('md5').update(timeStamp).digest('hex').slice(0, 8);
}

function addOneScreenshot(fileName) {
  return db.collection('screenshots').add({
    path: `http://${ipAddress}:${port}/${fileName}.jpg`,
    ts: admin.firestore.FieldValue.serverTimestamp(),
  });
}

const intervalId = setInterval(async () => {
  try {
    const timeStamp = new Date().toISOString();
    const fileName = createFileName(timeStamp);
    const path = await screenshot({ filename: `screenshots/${fileName}.jpg` });
    console.log(path);
    await addOneScreenshot(fileName);
    console.log('Notified');
  } catch (err) {
    console.log(err);
    clearInterval(intervalId);
  }
}, 5 * 60 * 1000);

const app = express();

app.use(express.static('screenshots'));
app.listen(port);

console.log(`ip:port = ${ipAddress}:${port}`);


