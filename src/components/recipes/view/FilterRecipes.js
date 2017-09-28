import React, { Component } from 'react';
import firebase from '../../../firebase';
import SingleRecipe from './SingleRecipe';
import RecipeCards from './RecipeCards';
import Filterbox from './Filterbox';

class FilterRecipes extends Component {

  state =  {
    recipes: [],
    filteredRecipes: [], 
    showSingle: false, 
    recipeId: '',
    searchInput: '',
    recipeType: '',
    showFood: true,
    showPastry: true
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
      this.setState({filteredRecipes:recipes});
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

  // Update state on input change
  onChange = (event) => { 
    this.setState({ [event.target.name] : event.target.value }); 
  }

  showSingle = (id) => {
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

  toggleFood = () => {
    if(!this.state.showFood){
      this.setState({showFood:true});
    }
    else {
      this.setState({showFood:false});
    }
  }

  togglePastry = () => {
    if(!this.state.showPastry){
      this.setState({showPastry:true});
    }
    else {
      this.setState({showPastry:false});
    }
  }

  getPastryRecipes = () => {
    // Filter
    const pastryRecipes = this.state.recipes.filter((item) => {
      return item.value.type === 'pastry';
    })
    return pastryRecipes;
  }

  getFoodRecipes = () => {
    // Filter
    const foodRecipes = this.state.recipes.filter((item) => {
      return item.value.type === 'food';
    })
    return foodRecipes;
  }

  filterRecipes = () => {
    const recipes = [...this.state.recipes];
    let filteredRecipes;

    const filteredByType = this.searchByType(recipes);
    const filteredBySearch = this.searchByRecipeName(filteredByType);

    if(this.state.searchInput.length === 0){ 
      filteredRecipes = filteredByType;
    }else{
      filteredRecipes = filteredBySearch;
    }

    this.setState({filteredRecipes: filteredRecipes});
  }

  searchByType = (recipes) => {
    if(this.state.showFood && this.state.showPastry){
      return recipes;
    }
    else if(this.state.showFood){
      return this.getFoodRecipes();
    }
    else if(this.state.showPastry){
      return this.getPastryRecipes();
    };
  }

  searchByRecipeName = (recipes) => {
    if(this.state.searchInput.length === 0){
      return recipes;
    }

    const filteredBySearch = recipes.filter((item) => {
      return item.value.name.toLowerCase().indexOf(this.state.searchInput.toLowerCase()) > -1;
    })

    return filteredBySearch;
  }

  render() {

    return (
      <div className="FilterRecipes">
        
        <div className="jumbotron" style={{display: 'flex'}}>
          <div className="searchbar">
            {/* Searchbar */}
            <div className="pt-input-group pt-large">
              <span className="pt-icon pt-icon-search"></span>
              <input className="pt-input" type="search" placeholder="Sök efter recept" dir="auto" name="searchInput" onChange={this.onChange} onKeyUp={this.filterRecipes} />
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="sidebar">
            <h5>Filtrera</h5>
            {/* Filters */}
            <Filterbox showFood={this.state.showFood} showPastry={this.state.showPastry} toggleFood={this.toggleFood} togglePastry={this.togglePastry} filterRecipes={this.filterRecipes} />
            {this.state.showSingle && <button type="button" className="pt-button pt-minimal pt-intent-primary" onClick={this.showAll} style={{marginTop: "1rem"}}>Återgå till resultat</button>}
          </div>
          <div className="main">
            <div className="recipes">
            {this.state.showSingle ? null : <h5>Resultat</h5>}
              {/* Recipes */}
              {this.state.showSingle ? 
              <SingleRecipe recipes={this.state.recipes} recipeId={this.state.recipeId} user={this.props.user} showAll={this.showAll} /> 
              : <RecipeCards recipes={this.state.filteredRecipes} user={this.props.user} showSingle={this.showSingle} /> }
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default FilterRecipes;