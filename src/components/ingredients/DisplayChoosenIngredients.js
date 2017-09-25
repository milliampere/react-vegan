import React from "react";
import PropTypes from 'prop-types';

function DisplayChoosenIngredients(props) {

  return(
    <div className="DisplayChoosenIngredients">
      { props.ingredentsInput.length > 0 && 
      <table className="pt-table pt-condensed">
        <thead>
          <tr>
            <td>Mängd</td>
            <td>Mått</td>
            <td>Ingrediens</td>
          </tr>
        </thead>
        <tbody>
        {props.ingredentsInput.map(item => {
          return (
            <tr key={item.key}>
              <td style={{width: "10%"}}><input type="text" style={{width: "5em"}} /></td>
              <td>
                <div className="pt-select pt-inline">
                  <select>
                    <option defaultValue>liter</option>
                    <option value="1">dl</option>
                    <option value="2">msk</option>
                    <option value="3">tsk</option>
                    <option value="4">st</option>
                  </select>
                </div>
              </td>
              <td style={{width: "60%"}}>{item.value.Namn}</td>
              <td><span className="pt-icon pt-icon-cross" onClick={()=>{props.removeInputIngredient(item.key)}} /></td>
            </tr>)
        })}
        </tbody>
      </table>
      }
    </div>
  
  )
}

DisplayChoosenIngredients.propTypes = {
  ingredentsInput: PropTypes.arrayOf(PropTypes.object).isRequired, 
  removeInputIngredient: PropTypes.func.isRequired
  }

export default DisplayChoosenIngredients;