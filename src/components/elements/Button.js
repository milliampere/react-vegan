import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
    return(
      <button type="button" className={`pt-button ${props.className}`} onClick={props.onClick} style={props.style}>
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


// http://blueprintjs.com/docs/#core/components/button