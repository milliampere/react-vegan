import React, { Component } from 'react';
import firebase from '../../../firebase';
import ViewRecipe from './ViewRecipe';

class ViewRecipes extends Component {

  state =  {
    recipes: []
  }

  componentDidMount() {



    //this.viewRecipes();
    
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
            return item;
          }
          else{
            return false;
          }
      })
      this.setState({ 
        recipes: recipesWithoutTheRemovedRecipe
      });
    })

    // Listen for changes (child_changed)
    firebase.database().ref("recipes")
    .on('child_changed', (snapshot) => {
      console.log("CHIIILD CHANGED");
      //Copy the state
      const recipes = [...this.state.recipes];
      //Look for recipe
      const updatedRecipes = recipes.map(item => {
        if(item.key === snapshot.key){
          return Object.assign({}, item, {value: snapshot.val()})
        }else{
          return item;
        }
      })
      this.setState({ 
        recipes: updatedRecipes
      });
    })

  
  
/*viewRecipes = () => {
  firebase.database().ref("recipes")
  .once('value', (snapshot) => {
    console.log("PUT IN STATE");
    console.log(snapshot.val());
    this.setState({recipes: snapshot.val()});
  })*/

  }

  render() {

    const recipes = this.state.recipes.map(item => 
    {
      //Destructuring 
      const {name, imagePreviewUrl, cookingTime, prepareTime, portions} = item.value;

      let ingredients = item.value.ingredients.map((item, index) => {
            return <p key={index}>{item.amount} {item.unit} {item.comment}</p>
      });

      let recipe = 
      (
        <div key={item.key} className={'pt-card pt-elevation-1 pt-interactive'}>
          <h3>{name}</h3>
          <img src={imagePreviewUrl} className="recipeCard" alt={name} />
          {ingredients}
        </div>
      );
      return recipe;
    });

    return (
      <div className="ViewRecipes" style={{display: 'flex'}}>
        {recipes}
        <ViewRecipe recipe={this.state.recipes[1]}/>
      </div>
    );
  }
}

export default ViewRecipes;