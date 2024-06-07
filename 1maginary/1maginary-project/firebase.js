const firebaseConfig = {
    apiKey: "AIzaSyA6WX1wyybNv8y7YjWoxjYo3r7A9JXFrn0",
    authDomain: "imaginary-online.firebaseapp.com",
    projectId: "imaginary-online",
    storageBucket: "imaginary-online.appspot.com",
    messagingSenderId: "161150961566",
    appId: "1:161150961566:web:601b3313b7aa4a0c39b88f",
    measurementId: "G-VYEP9HHWPB"
  };
  firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const pagesRef = db.collection('Pages');
const storage = firebase.storage();