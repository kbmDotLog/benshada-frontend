import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import FormIcon from './formIcon.js';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ValidateIcon from './validateIcon.js';

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stateType: props.type
    };
  }

  static propTypes = {
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

  renderEye = () => (
    <div
      className="pt-3"
      onClick={() => this.setState({ stateType: this.state.stateType === 'password' ? 'text' : 'password' })
      }
    >
      <FontAwesomeIcon className="text-secondary" icon={this.state.stateType === 'password' ? faEye : faEyeSlash} />
    </div>
  );

  render = () => {
    const {
      action,
      input,
      label,
      placeholder,
      touched,
      error,
      disabled,
      val,
      maxLength
    } = this.props;

    const id = `${action}${input.name}${Math.random() * 1099511627776}`;

    return (
      <div className="d-flex align-items-center">
        {/* <FormIcon icon={icon} /> */}
        <div className="flex-grow-1">
          <label htmlFor={id}>{label}</label>
          <input
            {...input}
            component="input"
            type={this.state.stateType}
            className="form-control"
            id={id}
            placeholder={placeholder}
            autoComplete="off"
            disabled={disabled}
            value={val || input.value}
            maxLength={maxLength}
          />
        </div>
        {input.name === 'password' ? this.renderEye() : ''}
        <div className="form-validation-response">
          <ValidateIcon touched={touched} error={error} />
        </div>
      </div>
    );
  };
}
