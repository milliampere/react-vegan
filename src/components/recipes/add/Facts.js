import React from 'react';
import Heading from './Heading';
import Input from './Input';

const Facts = props => {
  return (
    <div>
      <Heading title="Fakta" />
      <div style={{display: "flex"}}>
        <Input type="number" name="prepareTime" onChange={props.onChange} value={props.prepareTime} label="Förberedelsetid (min)" />
        <Input type="number" name="cookingTime" onChange={props.onChange} value={props.cookingTime} label="Tillagningstid (min)" />
        <Input type="number" name="portions" onChange={props.onChange} value={props.portions} label="Portioner" />
      </div>
    </div>
  );
};

export default Facts;