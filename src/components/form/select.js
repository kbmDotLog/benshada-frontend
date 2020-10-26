import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Select extends Component {
  static propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    action: PropTypes.string,
    input: PropTypes.object,
    label: PropTypes.string,
    type: PropTypes.string
  };

  render = () => {
    const {
      icon, action, input, label, type
    } = this.props;

    const newID = `${action}${input.name}${Math.random() * 1099511627776}`;

    return (
      <>
        <input
          {...input}
          type={type}
          id={newID}
          name={`${action}${input.name}`}
          className="custom-control-input"
          value={input.value}
        />
        <label className="custom-control-label py-3" htmlFor={newID}>
          <FontAwesomeIcon icon={icon} className="icon" /> {label}
        </label>
      </>
    );
  };
}
