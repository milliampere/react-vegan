import React, { Component } from 'react';
import firebase from '../firebase';
/* import AddRecipeFromText from './recipes/AddRecipeFromText'; */
import AddRecipe from './recipes/AddRecipe';

class Recipes extends Component {

  state = {
    recipes: []
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


  render() {

    return (
      <div className="Recipes" style={{width: "100%", margin: "1rem auto"}}>
 
        {/* <AddRecipeFromText user={this.props.user} onChange={this.onChange} /> */}
        <AddRecipe user={this.props.user} onChange={this.onChange} />


      </div>
    );
  }
}

Recipes.propTypes = {

}

Recipes.defaultProps = {
}

export default Recipes;
