import React from 'react';
import Heading from './Heading';
import IngredientTable from './IngredientTable';

const Ingredients = props => {
  return (
    <div>
      <Heading title="Ingredienser" />
        <IngredientTable ingredients={props.ingredients} onChangeIngredient={props.onChangeIngredient} onClickAddIngredient={props.onClickAddIngredient} onClickRemoveIngredient={props.onClickRemoveIngredient} />
    </div>
  );
};

export default Ingredients;