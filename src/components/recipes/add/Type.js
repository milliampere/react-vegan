import React from 'react';
import Heading from './Heading';
import { Button } from "@blueprintjs/core";


const Type = props => {
  return (
    <div>
      <Heading title="Typ av recept" />
      <Button type="button" onClick={() => props.onClick("food")} text="Mat" className={(props.type === 'food') ? "pt-intent-primary" : ''} />
      <Button type="button" onClick={() => props.onClick("bake")} text="Bakverk" className={(props.type === 'bake') ? "pt-intent-primary" : ''} />
    </div>
  );
};

export default Type;