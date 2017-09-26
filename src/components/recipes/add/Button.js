import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  return (
    <button onClick={props.onClick} type={props.type} className={`pt-button ${props.iconName} ${props.className}`}>{props.text}</button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
  iconName: PropTypes.string,
  className: PropTypes.string,
};

export default Button;

//http://blueprintjs.com/docs/#core/components/button