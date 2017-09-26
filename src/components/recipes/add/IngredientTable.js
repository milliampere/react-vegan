import React from 'react';
import IngredientRow from './IngredientRow';
import {Button} from '@blueprintjs/core';

const IngredientTable = props => {

  return (
    <div>
       <table className="pt-table pt-condensed">
        <thead>
          <tr>
            <td>Mängd</td>
            <td>Mått</td>
            <td>Ingrediens</td>
          </tr>
        </thead>
        <tbody>
          {
            props.ingredients.map((item,index) => { return(
              <IngredientRow ingredient={props.ingredients[index]} onChangeIngredient={props.onChangeIngredient} key={index} id={index} onClickRemoveIngredient={props.onClickRemoveIngredient} />
            )})
          }
        </tbody>
      </table>
        
        <Button onClick={props.onClickAddIngredient} text="Lägg till ingrediens" type="button" className="pt-intent-primary" iconName="add" />

    </div>
  );
};

export default IngredientTable;