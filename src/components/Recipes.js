import React, { Component } from 'react';
//import firebase from '../firebase';
/* import AddRecipeFromText from './recipes/AddRecipeFromText'; */
import AddRecipe from './recipes/add/AddRecipe';

class Recipes extends Component {

  state = {
    recipes: []
  }

  componentDidMount(){


  }

   // Generic on change for input fields
   onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }


  render() {

    return (
      <div className="Recipes" style={{width: "100%", margin: "1rem auto"}}>
 
        {/* <AddRecipeFromText user={this.props.user} onChange={this.onChange} /> */}
        {/*<AddRecipe user={this.props.user} onChange={this.onChange} />*/}


      </div>
    );
  }
}

Recipes.propTypes = {

}

Recipes.defaultProps = {
}

export default Recipes;
