import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormIcon from './formIcon.js';
import ValidateIcon from './validateIcon.js';

export default class Input extends Component {
  static propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    action: PropTypes.string,
    input: PropTypes.object,
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    touched: PropTypes.bool,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    val: PropTypes.string,
    maxLength: PropTypes.number
  };

  render = () => {
    const {
      icon, action, input, label, type, placeholder, touched, error, disabled, val, maxLength
    } = this.props;

    const id = `${action}${input.name}${Math.random() * 1099511627776}`;

    return (
      <div className="d-flex align-items-center">
        <FormIcon icon={icon} />
        <div className="flex-grow-1">
          <label htmlFor={id}>{label}</label>
          <input
            {...input}
            component="input"
            type={type}
            className="form-control"
            id={id}
            placeholder={placeholder}
            autoComplete="off"
            disabled={disabled}
            value={val || input.value}
            maxLength={maxLength}
          />
        </div>
        <div className="form-validation-response">
          <ValidateIcon touched={touched} error={error} />
        </div>
      </div>
    );
  };
}
