import React from 'react';
import firebase from '../../../firebase';

function ViewRecipe(props){

  console.log(props.recipe);

/*    //Destructuring 
    const {name, imagePreviewUrl, cookingTime, prepareTime, portions} = props.recipe.value;

    let ingredients = recipe.ingredients.map((item, index) => {
          return <p key={index}>{item.amount} {item.unit} {item.comment}</p>
    });

    let recipe = 
    (
      <div className={'pt-card pt-elevation-1 pt-interactive'}>
        <h3>{name}</h3>
        <img src={imagePreviewUrl} className="recipeCard" alt={name} />
        {ingredients}
      </div>
    );*/

    return (
      <div className="ViewRecipe" style={{display: 'flex'}}>
        
      </div>
    );
}


export default ViewRecipe;