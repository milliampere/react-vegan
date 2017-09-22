import React, { Component } from 'react';
import firebase from './firebase';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Recipes from './components/Recipes'; 
import Ingredients from './components/Ingredients';
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
    pageToView: ''
  }

  componentDidMount(){
    firebase.auth()
    .onAuthStateChanged((user) =>{
      if(user){
        this.setState({ user: user });
      }else{
        //this.setState({ user: {}});
        this.setState({authenticated: false});
      }
    })

    
  }

  //Function gets called in LoginForm but state is being set in App
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
        <main style={{maxWidth: "70%", margin: "3rem auto"}}>

        {this.state.pageToView === "Lägg till recept" && <Recipes />}
        {this.state.pageToView === "Favoriter" && <div><h2>Favoriter</h2></div>}

        {(Object.keys(this.state.user).length === 0) && <Login onSignIn={this.onSignIn} />}

        {this.state.pageToView === "Profile" && <Profile user={this.state.user} />}


        <Ingredients />


        </main>

      </div>
    );
  }
}

export default App;


