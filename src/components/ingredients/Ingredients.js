import React, { Component } from 'react';
import firebase from '../../firebase';
import ListIngredientsFromSearch from './ListIngredientsFromSearch';
import DisplayChoosenIngredients from './DisplayChoosenIngredients';

class Ingredients extends Component {

  state = {
    productInput: '',
    productSearch: [], 
    products: [], 
    ingredients: [],
    ingredentsInput: []
  }

  componentDidMount(){

    // Listen for changes 
    firebase.database().ref("ingredients")
    .on('value', (snapshot) => {
      //Copy the state
      const ingredients = snapshot.val();

      let array = [];
      for(let item in ingredients){
        array.push({ key: item, value: ingredients[item] })
      }

      //Update state
      this.setState({ingredients: array});
    })

  }

   // Generic on change for input fields
   onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }
 
  // Remove a ingredient
  removeIngredient = (key) => {
    firebase.database().ref(`ingredients/${key}`).remove()
    .then(()=> {console.log('Removed!')})
    .catch(error => {console.log('You messed up', error)});
  }

  // Search
  searchByProductName = () => {
    const filteredArray = this.state.ingredients.filter((item) => {
      return item.value.Namn.toLowerCase().indexOf(this.state.productInput.toLowerCase()) > -1;
    })
    this.setState({productSearch: filteredArray});
  }

  //Function gets called in LoginForm but state is being set in App
  onChooseIngredient = (ingredientFromListIngredientsFromSearch) => {
    const array = [...this.state.ingredentsInput];
    // If ingredient don't already exists in array
    if(!array.includes(ingredientFromListIngredientsFromSearch)){
      array.push(ingredientFromListIngredientsFromSearch);
    }
    this.setState({ ingredentsInput: array })
  }

  // Remove a ingredient
  removeInputIngredient = (ingredientFromListIngredientsFromSearch) => {
    const array = [...this.state.ingredentsInput];
    array.pop(ingredientFromListIngredientsFromSearch);
    this.setState({ ingredentsInput: array })
  }

  render() {
    return (
      <div className="Ingredients">
        
<DisplayChoosenIngredients ingredentsInput={this.state.ingredentsInput} removeInputIngredient={this.removeInputIngredient}/>


        <div className="pt-control-group">
          <div className="pt-input-group pt-fill">
            <span className="pt-icon pt-icon-shopping-cart"></span>
            <input type="text" onKeyUp={this.searchByProductName} onChange={this.onChange} className="pt-input pt-fill" name="productInput" placeholder="Hitta produkter..." />
          </div>
          <button className="pt-button pt-intent-primary">Sök</button>
        </div>

        
      {this.state.productInput.length > 0 && <ListIngredientsFromSearch array={this.state.productSearch} onChange={this.onChange} onChooseIngredient={this.onChooseIngredient} />}
      



      </div>
    );
  }
}

export default Ingredients;









