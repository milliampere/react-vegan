import React from 'react';

function RecipeCards(props){

  let recipes;

  // Make recipe cards of recipes if there is any
  if(props.recipes){ 
    recipes = props.recipes.map(item => {

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
   }

  return(
    <div className="RecipeCards">
      {recipes ? recipes : <p>Tyvärr hittades inga recepet med dina sökval.</p>}
    </div>
  )
};

export default RecipeCards;