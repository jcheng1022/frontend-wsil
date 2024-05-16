
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

firebase.initializeApp({
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
const messaging = firebase.messaging();



messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});
