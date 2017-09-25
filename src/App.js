import React, { Component } from 'react';
import firebase from './firebase';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Recipes from './components/Recipes'; 
import Profile from './components/Profile';
import './App.css';
/* import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'; */

class App extends Component {

  state = {
    authenticated: false,
    user: {},
    name: '', 
    email: '',
    userDB: {},
    pageToView: ''
  }

  componentDidMount(){
    firebase.auth()
    .onAuthStateChanged((user) =>{
      if(user){
        this.setState({user: user});

        // Ta info från Facebook men också från Firebase?
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          providerData: user.providerData
        }

        this.setState({userDB: userInfo});
        this.setState({authenticated: true});
      }else{
        this.setState({ user: {}});
        this.setState({authenticated: false});
      }
    })  
  }

  //Function gets called in LoginForm but state is being set in App   ?????? remove?
  onSignIn = (userFromLoginForm) => {
    this.setState({ user: userFromLoginForm })
    this.setState({authenticated: true});
  }
 
  //Function gets called in Navbar but state is being set in App
  onNavbarClick = (fromNavbar) => {
    this.setState({ pageToView: fromNavbar })
  }

  render() {

    // FOR TESTING
/*     console.log("Render App.js");
    if(firebase.auth().currentUser || !(Object.keys(this.state.user).length === 0)){
        console.table([{
          "App.js": '',
          "firebase.auth().currentUser": firebase.auth().currentUser,
          "this.state.user": this.state.user,
          "authenticated": this.state.authenticated
        }])
    }
    else{
      console.log("Both firebase.auth().currentUser and this.state.user is empty");
    } */

    return (
      <div className="App">
        <Navbar authenticated={this.state.authenticated} signOut={this.signOut} email={this.state.user.email} user={this.state.user} onNavbarClick={this.onNavbarClick} />
        <main style={{maxWidth: "90%", margin: "3rem auto"}}>
        {(Object.keys(this.state.user).length === 0) && <Login onSignIn={this.onSignIn} />}



        {/* <Recipes user={this.state.user} /> */}
        {this.state.pageToView === "Lägg till recept" && <Recipes user={this.state.user} />}
        {this.state.pageToView === "Favoriter" && <div><h2>Favoriter</h2></div>}

        {this.state.pageToView === "Profile" && <Profile user={this.state.user} />}




        </main>

      </div>
    );
  }
}

export default App;


