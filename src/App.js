import React, { Component } from 'react';
import firebase from './firebase';
import Login from './components/Login';
import Navbar from './components/Navbar';
//import Recipes from './components/Recipes';
import Products from './components/Products';

/* import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'; */

class App extends Component {

  state = {
    authenticated: false,
    user: {}  
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
        <Navbar authenticated={this.state.authenticated} signOut={this.signOut} email={this.state.user.email} user={this.state.user} />
        <main style={{maxWidth: "70%", margin: "3rem auto"}}>

        {/* <Recipes /> */}


        <Products />

        <Login onSignIn={this.onSignIn} />
        <p>{ this.state.user && this.state.user.email }</p>
        <p>{`Hi, ${this.state.user.displayName}!`}</p>
        <div>
        </div>
        </main>

      </div>
    );
  }
}

export default App;


