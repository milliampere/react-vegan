import React, { Component } from 'react';
import firebase from '../../../firebase';
import SingleRecipe from './SingleRecipe';
import RecipeCards from './RecipeCards';
import Filterbox from './Filterbox';
//import { Tab2, Tabs2 } from "@blueprintjs/core";

class FilterRecipes extends Component {

  state =  {
    recipes: [], 
    showSingle: false, 
    recipeId: '-Kv1n5jYKbyktYBEgIE4',
    filterBy: '',
    input: '',
    onlyVegan: false,
    recipeType: ''
  }

  componentDidMount() {
    
    // Listen for changes in database
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
          return Object.assign({}, item, {value: snapshot.val()})  //Object assign === merge the old object with the new object.
        }else{
          return item;
        }
      })
      this.setState({ 
        recipes: updatedRecipes
      });
    })

  

}

showSingle = (id) => {
  console.log("Showing single recipe");
  this.setState({
    showSingle: true, 
    recipeId: id,
  });
}

showAll = () => {
  this.setState({
    showSingle: false, 
    recipeId: '',
  });
}


  render() {

    return (
      <div className="FilterRecipes">
        
        <div className="jumbotron" style={{display: 'flex'}}>
          <div className="searchbar">
            {/*Searchbar*/}
            <div className="pt-input-group pt-large">
              <span className="pt-icon pt-icon-search"></span>
              <input className="pt-input" type="search" placeholder="Sök efter recept" dir="auto" />
            </div>
            {/*End of Searchbar*/}
          </div>
        </div>


        <div className="flex">
          <div className="sidebar">
            Filtrera
            <Filterbox />
          </div>
          <div className="main">

            {this.state.showSingle ?
            <button type="button" className="pt-button pt-minimal pt-intent-primary" onClick={this.showAll} style={{marginLeft: "-10px"}}>Tillbaka</button>
            :
              <div> Sortera efter 
                    Popularitet
                    Antal ingredienser
                    Tidsåtgång
                    Senaste
              </div>
            }

            <div className="recipes">
              {/*Recipes*/}
              {this.state.showSingle ? 
              <SingleRecipe recipes={this.state.recipes} recipeId={this.state.recipeId} user={this.props.user} showAll={this.showAll} /> 
              : <RecipeCards recipes={this.state.recipes} user={this.props.user} showSingle={this.showSingle} /> }
              {/*End of Recipes */}
            </div>
          </div>
        </div>

{/*        <Tabs2 id="Tabs2Example" onChange={this.handleTabChange}>
            <Tab2 id="rx" title="Alla" panel={<RecipeCard recipes={this.state.recipes} user={this.props.user} onClick={this.showSingle} />} />
            <Tab2 id="ng" title="En" panel={<SingleRecipe recipes={this.state.recipes} recipeId={this.state.recipeId} user={this.props.user} onClick={this.showAll} />} />
            <Tabs2.Expander />
            <input className="pt-input" type="text" placeholder="Search..." />
        </Tabs2>  */}      
        
              </div>
    );
  }
}

export default FilterRecipes;