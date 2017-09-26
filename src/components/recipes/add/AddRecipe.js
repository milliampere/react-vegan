import React, { Component } from 'react';
import Type from './Type';
import NameAndDescription from './NameAndDescription';
import ImageUpload from './ImageUpload';
import Facts from './Facts';
import Ingredients from './Ingredients';
import Instructions from './Instructions';

class AddRecipe extends Component {

  state = {
    // Inputs
    type: '',
    name: '',
    description: '',
    prepareTime: '',
    cookingTime: '',
    portions: '',
    ingredients: [{amount: 1, unit: 'tsk', comment: ''},{amount: 1, unit: 'tsk', comment: ''},{amount: 1, unit: 'tsk', comment: ''}],
    instructions: []
  }

  // Get type for this.state.type from Type-component
  onClickType = (type) => {
      this.setState({type: type});
  }

  onClickAddIngredient = () => {
    let ingredients = [...this.state.ingredients];
    ingredients.push({amount: 1, unit: 'tsk', comment: ''});
    this.setState({ingredients:ingredients});
  }

  onClickRemoveIngredient = (event) => {
    let ingredients = [...this.state.ingredients];
    let id = parseInt(event.target.id, 10);
    ingredients = ingredients.filter((item,index) => {
      // Filter out the ingredient
      if(!(index === id)){
        return item;
      }
    });
    this.setState({ingredients:ingredients});
  }

  // Get type for this.state.type from Type-component
  onChangeIngredient = (event) => {
    let ingredients = [...this.state.ingredients];
    let id = event.target.id;
    if(event.target.name === 'amount'){
      ingredients[id].amount = event.target.value;
    } else if(event.target.name === 'unit'){
      ingredients[id].unit = event.target.value;
    } else if(event.target.name === 'comment'){
      ingredients[id].comment = event.target.value;
    }
    this.setState({ingredients: ingredients})
  }

  // Generic on change for input fields
   onChange = (event) => {this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <div className="AddRecipe">
        <Type onClick={this.onClickType} type={this.state.type} />
        <NameAndDescription onChange={this.onChange} name={this.state.name} description={this.state.description} />
        <ImageUpload />
        <Facts onChange={this.onChange} prepareTime={this.state.prepareTime} cookingTime={this.state.cookingTime} portions={this.state.portions} />
        <Ingredients ingredients={this.state.ingredients} onChangeIngredient={this.onChangeIngredient} onClickAddIngredient={this.onClickAddIngredient} onClickRemoveIngredient={this.onClickRemoveIngredient} />
        <Instructions />
      </div>
    );
  }
}

export default AddRecipe;