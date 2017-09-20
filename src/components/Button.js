import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
    return(
      <button type="button" className={`btn ${props.className}`} onClick={props.onClick} style={props.style}>
         {props.children}
      </button>
    )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired
}

Button.defaultProps = {
  children: "Text"
}

export default Button;
