/* eslint-disable no-underscore-dangle */
/** Module imports */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

/** Component imports */
import FormHeader from 'components/form/formHeader.js';
import FormField from 'components/form/formField.js';

/** Asset imports */
import { loginValidate as validate } from 'assets/js/validate.js';
import 'assets/css/form.css';

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
      <FormHeader title="Login to Benshada Place" />

      <div className="form-row">
        <Field
          action="login"
          name="email"
          type="email"
          component={FormField}
          label="Email Address"
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
  );
}

const warn = () => ({});

export default reduxForm({
  form: 'loginForm',
  validate,
  warn
})(LoginForm);
