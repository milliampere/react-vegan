import React from 'react';
import firebase from '../firebase';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Login from './Login';
import logo from '../images/logo.svg';

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

  // Send click to App.js
  function clickInNavbar(fromNavbar){
    props.onNavbarClick(fromNavbar);
  }

  return(
    <nav className="pt-navbar">
      <div className="pt-navbar-group pt-align-left">
        <div className="pt-navbar-heading"><img src={logo} className="logo" alt="Vegan" /></div>
        {props.authenticated && 
          <div>
            <span className="pt-navbar-divider"></span>
            <button className="pt-button pt-minimal pt-icon-add-to-artifact" onClick={() => clickInNavbar("Lägg till recept")}>Lägg till recept</button>
            <button className="pt-button pt-minimal pt-icon-document" onClick={() => clickInNavbar("Mina recept")}>Mina recept</button>
            <button className="pt-button pt-minimal pt-icon-bookmark" onClick={() => clickInNavbar("Favoriter")}>Favoriter</button>
          </div>
        }
      </div>
      <div className="pt-navbar-group pt-align-right">
        {props.authenticated
          ?  <div>
        <button className="pt-button pt-minimal pt-icon-user" onClick={() => clickInNavbar("Profile")}></button>
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