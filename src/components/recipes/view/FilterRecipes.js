import React, { Component } from 'react';
import firebase from '../../../firebase';
import SingleRecipe from './SingleRecipe';
import RecipeCards from './RecipeCards';
import Filterbox from './Filterbox';
//import { Tab2, Tabs2 } from "@blueprintjs/core";

class FilterRecipes extends Component {

  state =  {
    recipes: [],
    allRecipes: [],
    filteredRecipes: [], 
    showSingle: false, 
    recipeId: '',
    filterBy: '',
    searchInput: '',
    onlyVegan: false,
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
      this.setState({allRecipes:recipes});
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
      this.setState({allRecipes:recipes});
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
      this.setState({filteredRecipes:recipes});
    })

}

  // Update state on input change
  onChange = (event) => { 
    this.setState({ [event.target.name] : event.target.value }); 
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
    //Copy the state
    const recipes = [...this.state.recipes];
    // Filter
    const pastryRecipes = this.state.recipes.filter((item) => {
      return item.value.type === 'pastry';
    })
    //this.setState({pastryRecipes: pastryRecipes});
    return pastryRecipes;
  }

  getFoodRecipes = () => {
    //Copy the state
    const recipes = [...this.state.recipes];
    // Filter
    const foodRecipes = this.state.recipes.filter((item) => {
      return item.value.type === 'food';
    })
    //this.setState({foodRecipes: foodRecipes});
    return foodRecipes;
  }

  updateRecipes = () => {
    let recipesToSearch = [];
    
        if(this.state.showFood && this.state.showPastry){
          console.log("Both");
          recipesToSearch = this.state.recipes;
        }
        else if(this.state.showFood){
          console.log("Fooood");
          recipesToSearch = this.getFoodRecipes();
        }
        else if(this.state.showPastry){
          console.log("Pastry");
          recipesToSearch = this.getPastryRecipes();
        };
    this.setState({filteredRecipes: recipesToSearch});
    return recipesToSearch;
  }



  searchByRecipeName = () => {
    let recipesToSearch = [];



    const filteredArray = recipesToSearch.filter((item) => {
      return item.value.name.toLowerCase().indexOf(this.state.searchInput.toLowerCase()) > -1;
    })
    if(this.state.searchInput.length === 0){
      const recipes = [...this.state.recipes];
      this.setState({filteredRecipes: recipes});
    } else if(filteredArray.length === 0){
      console.log("Tomt");
      this.setState({filteredRecipes: filteredArray});
    } else {
      this.setState({filteredRecipes: filteredArray});
    }
  }

  filterByType = () => {

    firebase.database().ref("recipes").orderByChild('value/type').once('value', (snapshot) => {
      console.log(snapshot());
    });

    

/*     const recipes = [...this.state.filteredRecipes];

    const food = recipes.filter((item) => {
      return item.value.type === 'food';
    })

    const pastry = recipes.filter((item) => {
      return item.value.type === 'pastry';
    })

    if (this.state.showFood && this.state.showPastry) {

      this.setState({filteredRecipes: recipes});
    } else if (this.state.showFood){
      this.setState({filteredRecipes: food});
    } else if (this.state.showPastry){
      this.setState({filteredRecipes: pastry});
    } else {
      this.setState({filteredRecipes: []});
    } */
  }

  showState = () => {

    this.updateRecipes();


    console.log('showFood: ' + this.state.showFood);
    console.log('showPastry: ' + this.state.showPastry);
    console.log(this.state.filteredRecipes);
  }

  render() {

    return (
      <div className="FilterRecipes">
        
        <div className="jumbotron" style={{display: 'flex'}}>
          <div className="searchbar">
            {/*Searchbar*/}
            <div className="pt-input-group pt-large">
              <span className="pt-icon pt-icon-search"></span>
              <input className="pt-input" type="search" placeholder="Sök efter recept" dir="auto" name="searchInput" onChange={this.onChange} onKeyUp={this.searchByRecipeName} />
            </div>
            {/*End of Searchbar*/}
          </div>
        </div>


        <div className="flex">
          <div className="sidebar">
            Filtrera
            <Filterbox showFood={this.state.showFood} showPastry={this.state.showPastry} toggleFood={this.toggleFood} togglePastry={this.togglePastry} updateRecipes={this.updateRecipes} />
            <button onClick={this.showState}>Show state</button>
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
              : <RecipeCards recipes={this.state.filteredRecipes} user={this.props.user} showSingle={this.showSingle} /> }
              {/*End of Recipes */}
            </div>
          </div>
        </div>

   
        
      </div>
    );
  }
}

export default FilterRecipes;