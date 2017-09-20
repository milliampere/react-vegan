import React, { Component } from 'react';
import firebase from '../firebase';
//import {Toaster, Indent} from '@blueprintjs/core';

class Login extends Component{

  state = {
    email: '',
    password: '', 
    user: {}
  }

  authWithFacebook = () => {
    console.log("Authed with Facebook");
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => this.setState({user: result.user}))
    .catch(error => {
      console.log(error.code, error.message, error.email);
    })
  }

  authWithEmailPassword = (event) => {
    event.preventDefault();
    console.log("Authed with email and password");
    console.table([{
      email: this.state.email,
      password: this.state.password
    }])
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch(error => console.log(error));
  }

  componentDidMount(){
    firebase.auth()
    .onAuthStateChanged((user) =>{
      if(user){
        this.setState({ user: user });
        this.props.onSignIn(this.state.user);
      }else{
        this.setState({ user: {}});
        this.props.onSignIn(this.state.user);
      }
    })
  }

  onChange = (e) => { this.setState({ [e.target.name] : e.target.value }); }

  render(){

    return(
      <div style={{maxWidth: "70%", margin: "5rem auto", border: "1px solid #ddd", borderRadius: "5px", padding: "1rem"}}>

        <button style={{width: "100%"}} className="pt-button pt-intent-primary" 
        onClick={() => {this.authWithFacebook() }}>Logga in med Facebook</button>
        <hr style={{marginTop: "10px", marginBottom: "10px"}}/>
        
        <div style={{marginBottom: "10px"}} className="pt-callout pt-icon-info-sign">
          Om du inte har ett konto redan, kommer ett skapas.
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