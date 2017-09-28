import React, { Component } from 'react';
import firebase from './firebase';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import './App.css';
import AddRecipe from './components/recipes/add/AddRecipe';
import FilterRecipes from './components/recipes/view/FilterRecipes';
import {Spinner} from '@blueprintjs/core';

class App extends Component {

  state = {
    authenticated: false,
    user: {},
    userDB: {},
    pageToView: 'home',
  }

  componentDidMount(){

    //Hämtar förändingar i auth (inloggning, utloggning) från Firebase
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        // Inloggad
        const userInfo = {
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          uid = user.uid
        }
        this.setState({
          authenticated: true,
          user: userInfo
        });
      }else{
        // Utloggad
        this.setState({
          authenticated: false,
          user: {}
        })  
      }
    })  
  }

  //Function gets called in LoginForm but state is being set in App   ?????? remove?
  onSignIn = (userFromLoginForm) => {
    this.setState({ user: userFromLoginForm })
    this.setState({authenticated: true});
  }
 
  // Sign out
  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.setState({pageToView: 'home'});
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
          email={this.state.user.email}  
          onNavbarClick={this.onNavbarClick} 
        />

        <main style={{maxWidth: "100%", margin: "0 auto"}}>
          {!(this.state.authenticated) && <Login onSignIn={this.onSignIn} />}
{/*           {(Object.keys(this.state.user).length === 0) && <Login onSignIn={this.onSignIn} />}
 */}
          {authenticated && pageToView === "home" && <FilterRecipes user={this.state.user} />}
          {pageToView === "add" && <AddRecipe user={this.state.user} /> }
          {pageToView === "favorites" && <div><h2>Favoriter</h2></div>}
          {pageToView === "profile" && <Profile user={this.state.user} />}

          {pageToView === "login" && <Login onSignIn={this.onSignIn} />}

        </main>
      </div>
    );
  }
}

export default App;


