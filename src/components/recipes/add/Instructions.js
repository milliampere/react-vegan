import React from 'react';
import Heading from './Heading';
import InstructionTable from './InstructionTable';

const Instructions = props => {
  return (
    <div>
      <Heading title="Tillagning" />
        <InstructionTable instructions={props.instructions} onChangeInstruction={props.onChangeInstruction} onClickAddInstruction={props.onClickAddInstruction} onClickRemoveInstruction={props.onClickRemoveInstruction} />
    </div>
  );
};

export default Instructions;