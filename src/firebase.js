import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDKj5SahG-Lq6Tjq4l2lEXRKvcsX0Jvpik",
  authDomain: "vegan-313e0.firebaseapp.com",
  databaseURL: "https://vegan-313e0.firebaseio.com",
  projectId: "vegan-313e0",
  storageBucket: "vegan-313e0.appspot.com",
  messagingSenderId: "487557779851"
};
firebase.initializeApp(config);

// Get a reference to the storage service, which is used to create references in your storage bucket
//var storage = firebase.storage();

export default firebase;