import React from "react";
import PropTypes from 'prop-types';

function ListIngredientsFromSearch(props) {

  // Send ingredient to Ingredients.js
  function chooseIngredient(item){
    props.onChooseIngredient(item);
  }

  const tr = props.array.map((item, index) => 
    <tr key={index} onClick={() => chooseIngredient(item)} >
      <td>{item.value.Namn}</td>
      <td>{item.value.Huvudgrupp}</td>
    </tr>
  );

  return(
    <div>
      <table className="pt-table pt-condensed ingredientResult">
        <tbody>
          {tr}
        </tbody>
      </table>
    </div>
  
  )
}

ListIngredientsFromSearch.propTypes = {
  array: PropTypes.arrayOf(PropTypes.object).isRequired, 
}

export default ListIngredientsFromSearch;