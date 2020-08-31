/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  faLock,
  faUsers,
  faMobileAlt,
  faUserLock,
  faCartArrowDown,
  faStoreAlt,
  faShoppingBasket,
  faHome,
  faTruck
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { registerValidate as validate } from '../../../assets/js/validate.js';

import '../../../assets/css/form.css';
import FormField from '../../form/formField.js';

class RegisterForm extends Component {
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
        className={`animate__animated ${this.state.animationClass} m-0 px-lg-5`}
        autoComplete="off"
      >
        <h2 className="mb-2 text-center">
          Register on Benshada Place
        </h2>
        <p className="lead mb-4 text-center">
          Or return
          <Link to="/">
            <span className="d-none d-lg-inline">home</span>
            <span className="d-lg-none text-white">
              <FontAwesomeIcon icon={faHome} />
            </span>
          </Link>
        </p>
        <div className="form-row">
          <Field
            action="register"
            name="firstName"
            type="text"
            component={FormField}
            label="First Name"
            icon={faUser}
            className="col-12 col-sm-6"
            placeholder="e.g John"
          />
          <Field
            action="register"
            name="familyName"
            type="text"
            component={FormField}
            label="Family Name"
            icon={faUsers}
            className="col-12 col-sm-6"
            placeholder="e.g Doe"
          />
        </div>

        <div className="form-row">
          <Field
            action="register"
            name="email"
            type="email"
            component={FormField}
            label="Email Address"
            icon={faEnvelope}
            className="col-12 col-sm-6"
            placeholder="e.g john.doe@gmail.com"
          />
          <Field
            action="register"
            name="phone"
            type="tel"
            component={FormField}
            label="Phone Number"
            icon={faMobileAlt}
            className="col-12 col-sm-6"
            placeholder="e.g 2348163186209"
          />
        </div>

        <div className="form-row">
          <Field
            action="register"
            name="password"
            type="password"
            component={FormField}
            label="Password"
            icon={faLock}
            className="col-12 col-sm-6"
            placeholder="Type here"
          />
          <Field
            action="register"
            name="confirmPassword"
            type="text"
            component={FormField}
            label="Confirm Password"
            icon={faUserLock}
            className="col-12 col-sm-6"
            placeholder="Confirm here"
          />
        </div>

        <small className="section-header">I want to</small>
        <div className="form-row align-items-center">
          <Field
            action="register"
            name="type"
            type="radio"
            component={FormField}
            label="Sell Only"
            icon={faStoreAlt}
            className="col form-holder-select"
            value="UA"
          />
          <Field
            action="register"
            name="type"
            type="radio"
            component={FormField}
            label="Buy & Sell"
            icon={faShoppingBasket}
            className="col form-holder-select"
            value="UB"
          />
          <Field
            action="register"
            name="type"
            type="radio"
            component={FormField}
            label="Buy Only"
            icon={faCartArrowDown}
            className="col form-holder-select"
            value="UC"
          />
          <Field
            action="register"
            name="type"
            type="radio"
            component={FormField}
            label="Deliver Only"
            icon={faTruck}
            className="col form-holder-select"
            value="UDC"
          />
        </div>

        <div className="button-group">
          <button className="btn btn-primary" type="submit">
            {this.props.buttonValue}
          </button>
          <Link to="/login" type="button" className="btn">
            Login
          </Link>
        </div>
      </form>
    );
  }
}

const warn = () => ({});

export default reduxForm({
  form: 'registerForm',
  validate,
  warn
})(RegisterForm);
