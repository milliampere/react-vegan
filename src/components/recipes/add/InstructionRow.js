import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '@blueprintjs/core';


const InstructionRow = props => {

  return (
    <tr>
      <td>
        {(props.id+1)}
      </td>

      <td>
        <textarea className="pt-input" dir="auto" value={props.instruction.description} onChange={props.onChangeInstruction} id={props.id} name="description" />
      </td>

      <td>
        <Button onClick={props.onClickRemoveInstruction} type="button" className="pt-minimal" iconName="remove" id={props.id} />
      </td>
</tr>

  );
};

InstructionRow.propTypes = {
  onChange: PropTypes.func,
};

export default InstructionRow;

        
