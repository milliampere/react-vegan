import React, {Component} from "react";
import PropTypes from 'prop-types';
import ImageUpload from '../ImageUpload';
import firebase from '../../firebase';
import { NumericInput } from "@blueprintjs/core";

class AddRecipeFromText extends Component {

  state = {
    name: '',
    steps: '', 
    time: '',
    numberOfPeople: '', 
    description: '', 
    image: ''  
  }

  // Push new recipe to database
  createNewRecipe = (event) => {
    const recipe = {
      name: this.state.name,
      author: "Camilla",
      description: this.state.description,
      numberOfPeople: this.state.numberOfPeople,
      time: this.state.time
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

  dissolveRecipe = () => {
    console.log("Dissolve Recipe");
    let recipe = this.state.description;
    
/*     var match = /\r|\n/.exec(recipe);
    if (match) {
      console.log(match.input);
    } */

    var lineArray = recipe.split('\n');
    console.log(lineArray);
    const ingredientsArray = [];
    var id = 0;
    for(let eachLine of lineArray){
      if(!(eachLine === "")){
        id++;
        console.log("Line: " + eachLine);
        let wordsArray = eachLine.split(' ');
        for(let eachWord of wordsArray){
          console.log(eachWord);
        }
        ingredientsArray.push({id: id});
      }
    }
  }

render(){

console.log(this.state.description);


  return( 
    <div className="AddRecipe">
      <div className="addRecipeContainer">
        <div className="addRecipeInputs">

          <h1>Lägg till recept</h1>
          <div className="pt-form-group">
            <label className="pt-label" htmlFor="input">
              Beskrivning 
            </label>
            <div className="pt-form-content">
              <textarea value={this.state.description} onChange={this.onChange} name="description" className="pt-input pt-fill" dir="auto"></textarea>
            </div>
          </div>
          <button onClick={() => this.dissolveRecipe()}>Dissolve</button>

        </div>

        <div className="addRecipePreview">
          <h1>Förhandsgranskning</h1>
          <p>{this.state.description}</p>
        </div>

        <div className="addRecipePreview">

          <p>300 gram sjögräsnudlar</p>
          <p>2 förpackning tofu, ca 500 g</p>
          <p>1 st vitlöksklyfta(or)</p>
          <p>1 msk färsk ingefära, riven</p>
          <p>250 gram morötter</p>
        </div>


    </div>
        <button type="button" className="pt-button pt-intent-primary pt-icon-add pt-fill" onClick={this.createNewRecipe} >Add</button>
        </div>
              )
            }
            }

 export default AddRecipeFromText;