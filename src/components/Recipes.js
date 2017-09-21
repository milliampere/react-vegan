import React, { Component } from 'react';
import firebase from '../firebase';


class Recipes extends Component {

  state = {
    recipes: [],
    nameInput: '',
    descriptionInput: '', 
    timeInput: '',
    numberOfPeopleInput: ''    
  }

  componentDidMount(){

    // Listen for changes (child_added)
    firebase.database().ref("recipes")
    .on('child_added', (snapshot) => {
      //Copy the state
      const recipes = [...this.state.recipes];
      //Create recipe
      const recipe = {
        key: snapshot.key,
        value: snapshot.val()
      }
      //Push to the state
      recipes.push(recipe);
      //Update state
      this.setState({recipes:recipes});
    })

    // Listen for changes (child_removed)
    firebase.database().ref("recipes")
    .on('child_removed', (snapshot) => {
      //Copy the state
      const recipes = [...this.state.recipes];
      //Higher Order function
      const recipesWithoutTheRemovedRecipe = recipes
        .filter((item) => {
          if(item.key !== snapshot.key){
            return item
          }
      })
      this.setState({ 
        recipes: recipesWithoutTheRemovedRecipe
      });
    })

    // Listen for changes (child_changed)
    firebase.database().ref("recipes")
    .on('child_changed', (snapshot) => {
      //Copy the state
      const recipes = [...this.state.recipes];
      //Look for recipe
      const updatedRecipes = recipes.map(item => {
        if(item.key === snapshot.key){
          console.log(item);
          return Object.assign({}, item, snapshot.val())
        }else{
          return item;
        }
      })
      this.setState({ 
        recipes: updatedRecipes
      });
    })

  }

   // Generic on change for input fields
   onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  // Push new recipe to database
  createNewRecipe = (event) => {
    const recipe = {
      name: this.state.nameInput,
      author: "Camilla",
      description: this.state.descriptionInput,
      numberOfPeople: this.state.numberOfPeopleInput,
      time: this.state.timeInput
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

  render() {

    return (
      <div className="Recipes" style={{width: "75%", margin: "1rem auto"}}>
        
        <h4>Add new recipe</h4>

        <div className="pt-form-group">
          <label className="pt-label" htmlFor="input">
            Receptets namn 
          </label>
          <div className="pt-form-content">
            <input value={this.state.nameInput} onChange={this.onChange} name="nameInput" className="pt-input pt-fill" type="text" dir="auto" />
            <div className="pt-form-helper-text">Beskrivande såsom "Mustig höstgryta med kantareller"</div>
          </div>
        </div>

        <div className="pt-form-group">
          <label className="pt-label" htmlFor="input">
            Beskrivning 
          </label>
          <div className="pt-form-content">
            <textarea value={this.state.descriptionInput} name="descriptionInput" className="pt-input pt-fill" dir="auto"></textarea>
            <div className="pt-form-helper-text">Skriv gärna personligt, t ex berätta om hur du kom på receptet eller var du fick inpiration. </div>
          </div>
        </div>


        <div className="pt-control-group">
          <label className="pt-label" htmlFor="input">
            Antal personer
          </label>
          <div className="pt-input-group">
            <span className="pt-icon pt-icon-time"></span>
            <input value={this.state.numberOfPeopleInput} onChange={this.onChange} name="numberOfPeopleInput" className="pt-input pt-fill" type="number" dir="auto" />
          </div>
        </div>

        <div className="pt-control-group">
          <label className="pt-label" htmlFor="input">
            Tidsåtgång (minuter)
          </label>
          <div className="pt-input-group">
            <span className="pt-icon pt-icon-time"></span>
            <input value={this.state.timeInput} onChange={this.onChange} name="timeInput" className="pt-input pt-fill" type="number" dir="auto" />
          </div>
        </div>


        {/* Antal personer
            Tidsåtgång
            Bild
            Tillagning (steg)
            Iingredienser
            Efterrätt/huvudrätt
         */}



        <button type="button" className="pt-button pt-icon-add pt-fill" onClick={() => this.createNewRecipe(this.state.input)} >Add</button>

        


      </div>
    );
  }
}

Recipes.propTypes = {

}

Recipes.defaultProps = {
}

export default Recipes;
