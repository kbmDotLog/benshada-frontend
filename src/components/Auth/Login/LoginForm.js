/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { loginValidate as validate } from '../../../assets/js/validate.js';

import '../../../assets/css/form.css';
import FormField from '../../form/formField.js';

class LoginForm extends Component {
  static propTypes = {
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    handleSubmit: PropTypes.func
  };

  render = () => (
      <form
        onSubmit={this.props.handleSubmit}
        // className={`animate__animated ${this.state.animationClass} m-0 px-lg-5`}
        className="m-0 px-lg-5"
        autoComplete="off"
      >
        <Link to="/" className="navbar-brand w-100 text-left">
          <i className="font-weight-bold">benshada</i>
        </Link>
        <h2 className="mb-4">Login to Benshada Place</h2>

        <div className="form-row">
          <Field
            action="login"
            name="email"
            type="email"
            component={FormField}
            label="Email Address"
            icon={faEnvelope}
            className="col-12"
            placeholder="e.g john.doe@example.com"
          />
        </div>

        <div className="form-row">
          <Field
            action="login"
            name="password"
            type="password"
            component={FormField}
            label="Password"
            icon={faLock}
            className="col-12"
            placeholder="Type here"
          />
        </div>

        <div className="button-group">
          <button className="btn btn-primary" type="submit">
            {this.props.buttonValue}
          </button>
          <Link to="/register" type="button" className="btn">
            Register
          </Link>
        </div>

        <p>Forgot password?</p>
      </form>
  )
}

const warn = () => ({});

export default reduxForm({
  form: 'loginForm',
  validate,
  warn
})(LoginForm);
