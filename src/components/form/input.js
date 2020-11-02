/** Asset imports */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IntlTelInput from 'react-intl-tel-input';
// import FormIcon from './formIcon.js';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/** Component imports */
import ValidateIcon from './validateIcon.js';
import MultiColor from './multicolor/multicolor.js';

/** Asset imports */
import 'react-intl-tel-input/dist/main.css';

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: [],
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

  updateColor = () => {
    if (this.props.type === 'color') {
      const passedValue = this.props.val || this.props.input.value;
      const colors = ((passedValue && passedValue.split(',')) || []).filter(
        (color) => color !== 'undefined'
      );

      this.setState(() => ({ colors }));
    }
  };

  renderInput = ({
    type, input, id, placeholder, disabled, val, maxLength
  }) => ({
    color: (
        <MultiColor
          colors={this.state.colors}
          onUpdateColors={(colors) => this.setState(() => ({ colors }))}
          id={id}
          input={input}
        />
    ),
    tel: (
        <IntlTelInput
          {...input}
          containerClassName="intl-tel-input"
          inputClassName="form-control"
          preferredCountries={['ng']}
          defaultCountry="ng"
          onlyCountries={['ng', 'gh']}
          autoHideDialCode={false}
          nationalMode={false}
          onPhoneNumberChange={(a, value) => input.onChange(value)}
          onPhoneNumberBlur={(a, value) => input.onBlur(value)}
          onPhoneNumberFocus={() => input.onFocus()}
        />
    )
  }[type] || (
      <input
        {...input}
        type={this.state.stateType}
        className="form-control"
        placeholder={placeholder}
        autoComplete="off"
        disabled={disabled}
        value={val || input.value}
        maxLength={maxLength}
      />
  ));

  getSnapshotBeforeUpdate = (prevProps) => prevProps.input.value !== this.props.input.value && {
    shouldUpdateColors: true
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (this.props.type === 'color') {
      return snapshot.shouldUpdateColors && this.updateColor();
    }
    return false;
  };

  componentDidMount = () => this.updateColor();

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
