import React, { Component } from 'react';
import firebase from './firebase';
import Login from './components/authentication/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import './App.css';
import AddRecipe from './components/recipes/add/AddRecipe';
import FilterRecipes from './components/recipes/view/FilterRecipes';

class App extends Component {

  state = {
    authenticated: false,
    user: {},
    pageToView: 'home'
  }

  componentDidMount(){

    //Hämtar förändingar i auth (inloggning, utloggning) från Firebase
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userInfo = {
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          uid: user.uid,
          providerData: user.providerData
        }        
        this.setState({authenticated: true, user: userInfo});
      } else {
        this.setState({authenticated: false, user: {}});
      }
    });





  }
 
  // Sign out
  signOut = () => {
    firebase.auth().signOut().then(() => {
      console.log(this.state.authenticated);
      this.setState({pageToView: 'login'});
    })
    .catch(function(error) {
      console.log(error);
    })
  } 

  // Route to view page
  pageToView = (page) => {
    this.setState({pageToView: page});
  }

  render() {

    const {pageToView, authenticated} = this.state;

    return (
      <div className="App">
        <Navbar 
          user={this.state.user} 
          authenticated={this.state.authenticated} 
          pageToView={this.pageToView} 
          signOut={this.signOut}  
          onNavbarClick={this.onNavbarClick}  
        />

        <main style={{maxWidth: "100%", margin: "0 auto"}}>

          {pageToView === "home" && <FilterRecipes user={this.state.user} />}
          {authenticated && pageToView === "add" && <AddRecipe user={this.state.user} /> }
          {authenticated && pageToView === "favorites" && <div><h2>Favoriter</h2></div>}
          {authenticated && pageToView === "profile" && <Profile user={this.state.user} />}

          {!(authenticated) && pageToView === "login" && <Login onSignIn={this.onSignIn} user={this.state.user} pageToView={this.pageToView} />}

        </main>
      </div>
    );
  }
}

export default App;

