import React from "react";
import PropTypes from 'prop-types';
import firebase from '../firebase';

function Profile(props) {

  const updateProfile = () => {
    var user = firebase.auth().currentUser;
    
    user.updateProfile({
      displayName: "Camilla Tranberg",
      photoURL: "http://simpleicon.com/wp-content/uploads/user1.png"
    }).then(function() {
      // Update successful.
      
    }).catch(function(error) {
      // An error happened.
    });
  }


  let profilePhoto;
  if(!(props.user.photoURL === null)){
    profilePhoto = <img src={props.user.photoURL} style={{height: "100px", borderRadius: "50px"}} alt="Profile" />;
  }else{
    profilePhoto = <span className="pt-icon-standard pt-icon-user" />;
  }

  return(
    <div>
      <h3>{`${props.user.displayName}`}</h3>
      {profilePhoto}
      <p>{`Recept som ${props.user.displayName} har skapat:`}</p>
      <button onClick={() => updateProfile()}>Uppdatera profil</button>
    </div>
  )
}

Profile.propTypes = {
  user: PropTypes.object.isRequired
}

export default Profile;