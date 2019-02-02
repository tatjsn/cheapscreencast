import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyCkOzg6OIEUEJ_22l-jAttp5Fdc_H6O9xw',
  authDomain: 'watcher-ad785.firebaseapp.com',
  projectId: 'watcher-ad785'
});

const db = firebase.firestore();

ReactDOM.render(<App db={db} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
