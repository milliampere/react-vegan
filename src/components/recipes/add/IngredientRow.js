import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import {Button} from '@blueprintjs/core';


const IngredientRow = props => {

  let units = [ 
    {value: 'st'},
    {value: 'l'},
    {value: 'msk'},
    {value: 'tsk'},
  ];

  return (
    <tr>
      <td>
        <Input type="number" name="amount" onChange={props.onChangeIngredient} value={props.ingredient.amount} id={props.id} />
      </td>

      <td>
      <div className="pt-select pt-inline">
        <select id={props.id}>
          {units.map((item, index) => {
            return (<option key={index} value={item.value}>{item.value}</option>)})}
        </select>
      </div>
      </td>

      <td>
        <Input type="text" name="comment" onChange={props.onChangeIngredient} value={props.ingredient.comment} id={props.id} />
      </td>

      <td>
        <Button onClick={props.onClickRemoveIngredient} type="button" className="pt-minimal" iconName="remove" id={props.id} />
      </td>
</tr>

  );
};

IngredientRow.propTypes = {
  onChange: PropTypes.func,
};

export default IngredientRow;

        
