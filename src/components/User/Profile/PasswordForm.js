/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faLock, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { passwordValidate as validate } from '../../../assets/js/validate.js';

import '../../../assets/css/form.css';
import FormField from '../../form/formField.js';

class PasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animationClass: 'animate__zoomIn'
    };
  }

  static propTypes = {
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    handleSubmit: PropTypes.func
  };

  componentWillUnmount() {
    this.setState({ animationClass: 'animate__slideOutLeft' });
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit}
        className={`animate__animated ${this.state.animationClass}`}
        autoComplete="off"
      >
        <div className="form-row">
          <Field
            action="password"
            name="oldPassword"
            type="password"
            component={FormField}
            label="Old Password"
            icon={faLock}
            className="col-12 col-sm-6"
            placeholder="Enter old password here.."
          />
          <Field
            action="password"
            name="password"
            type="text"
            component={FormField}
            label="New Password"
            icon={faUserLock}
            className="col-12 col-sm-6"
            placeholder="Enter New Password here..."
          />
        </div>

        <div className="button-group">
          <button className="btn btn-primary" type="submit">
            {this.props.buttonValue}
          </button>
        </div>
      </form>
    );
  }
}

const warn = () => ({});

export default reduxForm({
  form: 'passwordForm',
  validate,
  warn
})(PasswordForm);
