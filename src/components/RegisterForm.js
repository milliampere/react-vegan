import React, { Component } from 'react';
import firebase from './../firebase';

class RegisterForm extends Component{

  state = {
    username: '',
    password: '',
    name: '', 
    user: []
  }

  onChange = (e) => {
    e.preventDefault(); 
    this.setState({ [e.target.name] : e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    firebase.auth()
      .createUserWithEmailAndPassword(this.state.username, this.state.password)
      .then((user) => {
        firebase
        .database()
        .ref(`users`)
        .push({email: user.email, uid: user.uid, name: this.state.name })
      })
      .then(()=> { console.log('Användare skapad!') })
      .catch(error => console.log(error));
  }

  render(){

    return(
      <div>
          <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="username">E-postadress</label>
            <input
              type="text"
              name="username"
              className="form-control m-3"
              value={this.state.username}
              onChange={this.onChange}
              placeholder="din@e-post.com"
            />
            <label htmlFor="password">Lösenord</label>
            <input
              type="password"
              name="password"
              className="form-control m-3"
              value={this.state.password}
              onChange={this.onChange}
            />
            <input
              type="text"
              name="name"
              className="form-control m-3"
              value={this.state.name}
              onChange={this.onChange}
            />
          </div>
          <input type="submit" value="Registrera" className="btn btn-primary m-3" />
        </form>
      </div>
    );
  }
}

export default RegisterForm;