

import {initializeApp} from 'firebase/app'
import {getMessaging} from 'firebase/messaging'

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
    apiKey: "AIzaSyBcIbcre15_W5qlquK6ceuW0n0qLoqmCto",
    authDomain: "wsil-fb.firebaseapp.com",
    projectId: "wsil-fb",
    storageBucket: "wsil-fb.appspot.com",
    messagingSenderId: "519965076207",
    appId: "1:519965076207:web:9ccb5288624e7dd84b891a",
    measurementId: "G-RFSH8MTEB4"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);
