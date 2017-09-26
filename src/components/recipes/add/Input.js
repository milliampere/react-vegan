import React from 'react';
import PropTypes from 'prop-types';

const Input = props => {
  return (
    <div className="pt-form-group">
      <label className="pt-label" htmlFor={props.name}>
        {props.label} 
      </label>
      <div className="pt-form-content">
        <input value={props.value} onChange={props.onChange} name={props.name} className="pt-input pt-fill" type={props.type} dir="auto" id={props.id} />
      </div>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.node.isRequired,
  onChange: PropTypes.func,
};

export default Input;