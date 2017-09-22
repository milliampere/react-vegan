import React from "react";
import PropTypes from 'prop-types';

function Profile(props) {

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
    </div>
  )
}

Profile.propTypes = {
  user: PropTypes.object.isRequired
}

export default Profile;