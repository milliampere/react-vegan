import React from 'react';
import {Checkbox, Button} from '@blueprintjs/core';

function Filterbox(props){

  return(
    <div className="Filterbox">
      <div className='pt-card pt-elevation-1 pt-interactive'>
        <p>Typ av rätt</p>
        <Checkbox checked={props.showFood} label="Maträtt" onChange={props.toggleFood} />
        <Checkbox checked={props.showPastry} label="Bakverk" onChange={props.togglePastry} />
        <Button onClick={props.filterRecipes}>Filtrera</Button>
      </div>
    </div>
  )
};

export default Filterbox;