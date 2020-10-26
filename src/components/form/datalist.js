import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import FormIcon from './formIcon.js';
import ValidateIcon from './validateIcon.js';

export default class DataList extends Component {
  static propTypes = {
    action: PropTypes.string,
    input: PropTypes.object,
    label: PropTypes.string,
    options: PropTypes.array,
    touched: PropTypes.bool,
    error: PropTypes.string,
    placeholder: PropTypes.string
  };

  renderOptions = (options, id) => options.map((option, i) => <option key={`${id}${i}`} value={option} />);

  render = () => {
    const {
      action, input, label, touched, error, options, placeholder
    } = this.props;

    const id = `${action}${input.name}${Math.random() * 1099511627776}`;

    return (
      <div className="d-flex align-items-center">
        <div className="flex-grow-1">
          <label htmlFor={`${id}`}>{label}</label>
          <input
            {...input}
            placeholder={placeholder}
            type="text"
            className="form-control"
            id={id}
            list={`${id}s`}
          />

          <datalist id={`${id}s`}>{this.renderOptions(options, id)}</datalist>
        </div>
        <div className="form-validation-response">
          <ValidateIcon touched={touched} error={error} />
        </div>
      </div>
    );
  };
}
