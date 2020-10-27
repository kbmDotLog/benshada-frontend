import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import FormIcon from './formIcon.js';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BlockPicker } from 'react-color';
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
      onClick={() => this.setState(({ stateType }) => ({
        stateType: stateType === 'password' ? 'text' : 'password'
      }))
      }
    >
      <FontAwesomeIcon
        className="text-secondary"
        icon={this.state.stateType === 'password' ? faEye : faEyeSlash}
      />
    </div>
  );

  renderInput = ({
    type, input, id, placeholder, disabled, val, maxLength
  }) => (type === 'color' ? (
      <BlockPicker
        {...input}
        className="w-100"
        id={id}
        triangle="hide"
        color={val || input.value}
      />
  ) : (
      <input
        {...input}
        component="input"
        type={this.state.stateType}
        className="form-control"
        placeholder={placeholder}
        autoComplete="off"
        disabled={disabled}
        value={val || input.value}
        maxLength={maxLength}
      />
  ));

  render = () => {
    const {
      action, input, label, touched, error
    } = this.props;

    const id = `${action}${input.name}${Math.random() * 1099511627776}`;

    return (
      <div className="d-flex align-items-center">
        <div className="flex-grow-1">
          <label htmlFor={id}>{label}</label>
          {this.renderInput({ ...this.props, id })}
        </div>
        {input.name === 'password' && this.renderEye()}
        <div className="form-validation-response">
          <ValidateIcon touched={touched} error={error} />
        </div>
      </div>
    );
  };
}
