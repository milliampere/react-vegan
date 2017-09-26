import React from 'react';
import PropTypes from 'prop-types';

const Heading = props => {
  return (
    <div>
      <h3>{props.title}</h3>
    </div>
  );
};

Heading.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Heading;