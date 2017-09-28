import React, { Component } from 'react';
import firebase from '../firebase';
import { Position, Intent, Toaster  } from "@blueprintjs/core";


class Login extends Component{

  state = {
    email: '',
    password: ''
  }

  // Update state on input change
  onChange = (event) => { 
    this.setState({ [event.target.name] : event.target.value }); 
  }
  
  // Authentication with Facebook
  authWithFacebook = () => {
    console.log("Auth with Facebook");
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => this.setState({user: result.user}))
    .then((user) => {
      user = this.state.user;
      return (this.doesUserExistInDatabase(user) ? null : this.addUserToDatabase(user));
    })
    .catch(error => {
      console.log(error.code, error.message);
    })
  }

  // Authentication with email and password
  authWithEmailPassword = (event) => {
    event.preventDefault();
    console.log("Auth with email");    
    console.table([{email: this.state.email,password: this.state.password}])

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch(error => {
      console.log(error.code, error.message)
      if(error.code === "auth/wrong-password"){
        Toaster.create({position: Position.TOP_CENTER})
        .show({ 
          message: "Fel lösenord!", 
          iconName: "warning-sign", 
          intent: Intent.DANGER, 
          action: {
            onClick: () =>
              this.sendPasswordResetEmail(),
              text: "Glömt lösenord?"
          } });
      }else if(error.code === "auth/user-not-found"){
        this.signUp();
      }
    })
    .then(user => {
      return (this.doesUserExistInDatabase(user) ? null : this.addUserToDatabase(user));
      //console.log(user);
    });  
  }

  // Create an authentication for a user with email and password, then add to database
  signUp = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .catch(error => console.log(error))
    .then(user => console.log(user))
  }

  doesUserExistInDatabase = () => {
    firebase.database().ref("users").once('value', (snapshot) => {
      const users = snapshot.val();
      let value;
      for(let user in users){
        value = users[user];
        // If first time login or email is not in database
        if(!(value.email === this.state.email)){
          console.log("Email not found in database");
          return false;
        }
        else{
          console.log("Email found!");
          return true;
        }
      }
    });  
  }

  // Add a user to the database
  addUserToDatabase = (user) => {
    console.log("Add user to database");
    let displayName;

    // If the user don't have a displayName create one with email
    if(user.displayName === null){
      const nameByEmail = user.email.split("@");
      displayName = nameByEmail[0];
    }
    else{
      displayName = user.displayName;
    }
    firebase.database().ref("users").push({
      email: user.email, 
      uid: user.uid, 
      displayName: displayName, 
      photoUrl: user.photoURL
     });
  }

  sendPasswordResetEmail = () => {
    const email = this.state.email;
    firebase.auth().languageCode = 'sv';
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
  }

  componentDidMount(){
    this.props.onSignIn(this.state.user);
  }


  render(){

    return(
      <div style={{maxWidth: "70%", margin: "5rem auto", border: "1px solid #ddd", borderRadius: "5px", padding: "1rem"}}>

          <button style={{width: "100%"}} className="pt-button pt-intent-primary" 
          onClick={() => {this.authWithFacebook() }}>Logga in med Facebook</button>
          <hr style={{marginTop: "10px", marginBottom: "10px"}}/>
        
          <div style={{marginBottom: "10px"}} className="pt-callout pt-icon-info-sign">
            Om du inte har ett konto redan, kommer ett att skapas.
          </div>

          <form onSubmit={this.authWithEmailPassword}>
            <label className="pt-label">E-post
              <input type="text" className="pt-input" name="email" onChange={this.onChange} 
              value={this.state.email} placeholder="Användarnamn" style={{width: "100%"}}  />
            </label>
            <label className="pt-label">Lösenord
              <input type="password" className="pt-input" name="password" onChange={this.onChange} 
              value={this.state.password} placeholder="Lösenord" style={{width: "100%"}}  />
              </label>
            <input type="submit" className="pt-button pt-intent-primary" value="Logga in med e-post" style={{width: "100%"}} />
          </form>

      </div>
    );
  }
}

export default Login;