import React from 'react';
import firebase from '../firebase';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Login from './Login';

function Navbar(props){

  //FOR TESTING
/*   if(!(Object.keys(props.user).length === 0)){
    console.table([{
      "Navbar.js": '',
      "this.state.user": props.user,
      "authenticated": props.authenticated
    }])
  } */


  let profilePhoto;
  if(!(props.user.photoURL === null)){
    profilePhoto = <img src={props.user.photoURL} style={{height: "20px", borderRadius: "50px"}} alt="Profile" />;
  }else{
    profilePhoto = <span className="pt-icon-standard pt-icon-user" />;
  }


  return(
    <nav className="pt-navbar">
      <div className="pt-navbar-group pt-align-left">
        <div className="pt-navbar-heading">Vegan</div>
        <input className="pt-input" placeholder="Search files..." type="text" />
      </div>
      <div className="pt-navbar-group pt-align-right">
        {props.authenticated
          ?  <div><button className="pt-button pt-minimal pt-icon-home">Home</button>
          <button className="pt-button pt-minimal pt-icon-add-to-artifact">Add recipe</button>
        <button className="pt-button pt-minimal pt-icon-document">My recipes</button>
        <button className="pt-button pt-minimal pt-icon-bookmark">Saved</button>
        <span className="pt-navbar-divider"></span>
        <button className="pt-button pt-minimal pt-icon-user"></button>
        <button className="pt-button pt-minimal pt-icon-notifications"></button>
        <button className="pt-button pt-minimal pt-icon-cog"></button>
        <span className="pt-navbar-divider"></span>
         </div>
          : null
        }

        {props.authenticated && profilePhoto}

        {props.authenticated 
          ? <div style={{margin: "0 1em 0 0.5em"}}>{props.email}</div>
          : null
        }

        {props.authenticated
          ? <button onClick={signOut} className="pt-button pt-intent-primary"> Logga ut </button>
          :  <Router>
                <div>
                  <Link to="/login">Login</Link>
                  <Route path="/login" render={LoginRoute} />
                  <button onClick={props.signIn} className="pt-button pt-intent-primary"> Registrera/Logga in </button>
                </div>
            </Router>
          
        }
      </div>




    </nav>

  )}

export default Navbar;


let signOut = () => {
  firebase.auth().signOut().then(() => {
  console.log("Sign-out successful.");
  }).catch(function(error) {
    // An error happened.
  });
} 




const LoginRoute = (props) => {
  return (
    <Login {...props} 
      onSignIn={this.onSignIn}
    />
  );
}