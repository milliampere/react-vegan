import React from 'react';
import PropTypes from 'prop-types';
import Heading from './Heading';
import Input from './Input';

const NameAndDescription = props => {
  return (
    <div>
      <Heading title="Receptets namn" />
      <Input type="text" name="name" onChange={props.onChange} value={props.name} />

      <Heading title="Kort beskrivning" />
      <Input type="text" name="description" onChange={props.onChange} value={props.description} />
    </div>
  );
};

NameAndDescription.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default NameAndDescription;