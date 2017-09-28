import React, {Component} from "react";
import ImageUpload from '../ImageUpload';
import firebase from '../../firebase';
//import { NumericInput } from "@blueprintjs/core";
import Ingredients from '../ingredients/Ingredients';

class AddRecipe extends Component {

  state = {
    name: '',
    steps: '', 
    time: '',
    numberOfPeople: '', 
    description: '', 
    imageUrl: '', 
    ingredients: [] 
  }

  // Push new recipe to database
  createNewRecipe = (event) => {
    const recipe = {
      name: this.state.name,
      authorId: this.props.user,
      description: this.state.description,
      numberOfPeople: this.state.numberOfPeople,
      time: this.state.time,
      ingredients: this.state.ingredients, 
      imageUrl: this.state.imageUrl
    }
    firebase.database().ref('recipes')
    .push(recipe)
    .then(()=> { console.log('Pushed!') })
    .catch(error => { console.log('You messed up', error) });
  }

  // Remove a recipe
  removerecipe = (key) => {
    firebase.database().ref(`recipes/${key}`).remove()
    .then(()=> {console.log('Removed!')})
    .catch(error => {console.log('You messed up', error)});
  }

   // Generic on change for input fields
   onChange = (event) => {this.setState({[event.target.name]: event.target.value});
  }


render(){

  return( 
    <div className="AddRecipe">
      <div className="addRecipeContainer">
        <div className="addRecipeInputs">
          <h1>Lägg till recept</h1>
          <div className="pt-form-group">
              <label className="pt-label" htmlFor="input">
                Receptets namn 
              </label>
              <div className="pt-form-content">
                <input value={this.state.name} onChange={this.onChange} name="name" className="pt-input pt-fill" type="text" dir="auto" />
                <div className="pt-form-helper-text">Beskrivande såsom "Mustig höstgryta med kantareller"</div>
              </div>
            </div>

            <div className="pt-form-group">
              <label className="pt-label" htmlFor="input">
                Tillagning 
              </label>
              <div className="pt-form-content">
                <textarea value={this.state.steps} onChange={this.onChange} name="steps" className="pt-input pt-fill" dir="auto"></textarea>
                <div className="pt-form-helper-text">Beskriv steg för steg </div>
              </div>
            </div>

            <div className="pt-control-group">
              <label className="pt-label" htmlFor="input">
                Antal personer
              </label>
              <div className="pt-input-group">
                <span className="pt-icon pt-icon-people"></span>
                <input value={this.state.numberOfPeople} onChange={this.onChange} name="numberOfPeople" className="pt-input pt-fill" type="number" dir="auto" />
              </div>
            </div>

            <div className="pt-control-group">
              <label className="pt-label" htmlFor="input">
                Tidsåtgång (minuter)
              </label>
              <div className="pt-input-group">
                <span className="pt-icon pt-icon-time"></span>
                <input value={this.state.time} onChange={this.onChange} name="time" className="pt-input pt-fill" type="number" dir="auto" />
              </div>
            </div>

            <Ingredients />

            <div className="pt-form-group">
              <label className="pt-label" htmlFor="input">
                Beskrivning 
              </label>
              <div className="pt-form-content">
                <textarea value={this.state.description} onChange={this.onChange} name="description" className="pt-input pt-fill" dir="auto"></textarea>
                <div className="pt-form-helper-text">Skriv gärna personligt, t ex berätta om hur du kom på receptet eller var du fick inpiration. </div>
              </div>
            </div>

        </div>

        <div className="addRecipePreview">
          <h1>Förhandsgranskning</h1>
          <h2>{this.state.name}</h2>

          {this.state.numberOfPeople && <div><span className="pt-icon pt-icon-people"></span> {this.state.numberOfPeople} personer </div> }
          {this.state.time && <div><span className="pt-icon pt-icon-time"></span> {this.state.time} minuter</div> }
          <ImageUpload image={this.state.image}/>
          <p>{this.state.description}</p>
        </div>



        {/* 
            Tillagning (steg)
            Iingredienser
            Efterrätt/huvudrätt
          */}


    </div>
        <button type="button" className="pt-button pt-intent-primary pt-icon-add pt-fill" onClick={this.createNewRecipe} >Add</button>
        </div>
              )
            }
            }

 export default AddRecipe;