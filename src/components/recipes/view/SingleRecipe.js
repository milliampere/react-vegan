import React from 'react';
//import firebase from '../../../firebase';

function SingleRecipe(props){

  console.log(props.recipes);
  console.log(props.recipeId);

  const recipe = props.recipes.filter(recipe => recipe.key === props.recipeId);

  let singleRecipe = recipe.map(item => {
    const {name, imagePreviewUrl, cookingTime, prepareTime, portions, authorName} = item.value;

    const ingredients = item.value.ingredients.map((item, index) => {
      return <li key={index}>{item.amount} {item.unit} {item.product} {item.comment}</li>
    });

    const instructions = item.value.instructions.map((item, index) => {
      return <li key={index}>{item.description}</li>
    });

      return (
    <div key={item.key} id={item.key} className="SingleRecipe pink">
      <h2>{name}</h2>
      <img src={imagePreviewUrl} alt={name} />
      <p>Tillagningstid: {cookingTime} min , förberedelsetid: {prepareTime} min, {portions} portioner </p>
      <p>{authorName}</p>
      <div style={{display: 'flex'}}>
        <div><h5>Du behöver:</h5><ul>{ingredients}</ul></div>
        <div><h5>Så här gör du:</h5><ol>{instructions}</ol></div>
      </div>
      <button onClick={props.showAll}>Tillbaka</button>
    </div> )
   
    });


    return (
      <div className="ViewRecipe" style={{display: 'flex'}}>
        {singleRecipe}
      </div>
    );
}


export default SingleRecipe;