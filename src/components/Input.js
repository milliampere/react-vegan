import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
    return(
      <form>
        <div className="form-group">
            <input 
              type="text" 
              name={props.name}
              value={props.value} 
              onChange={ props.onChange }
              className="input form-control"
              id="input1" />
        </div>
      </form>
    )
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

Input.defaultProps = {
  type: "text"
}

export default Input;
