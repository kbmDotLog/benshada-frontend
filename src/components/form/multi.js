import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import FormIcon from './formIcon.js';
import ValidateIcon from './validateIcon.js';

export default class Multi extends Component {
  static propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    action: PropTypes.string,
    input: PropTypes.object,
    label: PropTypes.string,
    options: PropTypes.array,
    touched: PropTypes.bool,
    error: PropTypes.string
  };

  render = () => {
    const {
      icon, action, input, label, touched, error, options
    } = this.props;

    const id = `${action}${input.name}${Math.random() * 1099511627776}`;

    return (
      <div className="d-flex align-items-center">
        <FormIcon icon={icon} />
        <div className="flex-grow-1">
          <label htmlFor={`${id}`}>{label}</label>
          <Select
            {...input}
            options={options}
            value={input.value}
            isMulti={true}
            isSearchable={true}
            id={id}
            className="form-control"
            style={{ zIndex: 999 }}
            onBlur={() => input.onBlur([...input.value])}
          />
        </div>
        <div className="form-validation-response">
          <ValidateIcon touched={touched} error={error} />
        </div>
      </div>
    );
  };
}
