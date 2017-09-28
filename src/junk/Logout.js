import React from 'react';
import firebase from '../firebase';

function Logout(){

    firebase.auth().signOut().then(() => {
    console.log("Sign-out successful.");
    }).catch(function(error) {
      // An error happened.
    });
}

export default Logout;