import React from 'react';

function RecipeCards(props){

  const recipes = props.recipes.map(item => {

    //Destructuring 
    const {name, imagePreviewUrl, cookingTime, prepareTime} = item.value;
    const totalTime = cookingTime + prepareTime;
    
    return (
      <div key={item.key} className='pt-card pt-elevation-1 pt-interactive recipeCard' onClick={() => props.showSingle(item.key)}>
        <img src={imagePreviewUrl} alt={name} />
        <h3>{name}</h3>
        <span className="pt-icon pt-icon-time"></span> {totalTime} minuter
      </div>
    );

  });

  return(
    <div className="RecipeCards">
      {recipes}
    </div>
  )
};

export default RecipeCards;