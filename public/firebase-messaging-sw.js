

importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBcIbcre15_W5qlquK6ceuW0n0qLoqmCto",
    authDomain: "wsil-fb.firebaseapp.com",
    projectId: "wsil-fb",
    storageBucket: "wsil-fb.appspot.com",
    messagingSenderId: "519965076207",
    appId: "1:519965076207:web:9ccb5288624e7dd84b891a",
    measurementId: "G-RFSH8MTEB4"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message: ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = { body: payload.notification.body };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
