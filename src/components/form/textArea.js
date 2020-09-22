import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormIcon from './formIcon.js';
import ValidateIcon from './validateIcon.js';

export default class TextArea extends Component {
  static propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    action: PropTypes.string,
    input: PropTypes.object,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    touched: PropTypes.bool,
    error: PropTypes.string
  };

  render = () => {
    const {
      icon, action, input, label, placeholder, touched, error
    } = this.props;

    const id = `${action}${input.name}${Math.random() * 1099511627776}`;

    return (
      <div className="d-flex align-items-center">
        <FormIcon icon={icon} />
        <div className="flex-grow-1">
          <label htmlFor={id}>{label}</label>
          <textarea
            {...input}
            component="textarea"
            className="form-control"
            id={id}
            placeholder={placeholder}
            autoComplete="off"
            rows={3}
          ></textarea>
        </div>
        <div className="form-validation-response">
          <ValidateIcon touched={touched} error={error} />
        </div>
      </div>
    );
  };
}
