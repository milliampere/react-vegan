import React from 'react';
import InstructionRow from './InstructionRow';
import {Button} from '@blueprintjs/core';

const InstructionTable = props => {

  return (
    <div>
       <table className="pt-table pt-condensed">
        <thead>
          <tr>
            <td>Steg</td>
            <td>Beskrivning</td>
          </tr>
        </thead>
        <tbody>
          {
            props.instructions.map((item,index) => { return(
              <InstructionRow instruction={props.instructions[index]} onChangeInstruction={props.onChangeInstruction} key={index} id={index} onClickRemoveInstruction={props.onClickRemoveInstruction} />
            )})
          }
        </tbody>
      </table>
        
        <Button onClick={props.onClickAddInstruction} text="Lägg till tillagningssteg" type="button" className="pt-intent-primary" iconName="add" />

    </div>
  );
};

export default InstructionTable;