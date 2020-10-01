/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  faCartArrowDown,
  faStoreAlt,
  faShoppingBasket,
  faTruck
} from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { typeValidate as validate } from '../../assets/js/validate.js';

import '../../assets/css/form.css';
import FormField from '../form/formField.js';

class TypeForm extends Component {
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
        <h2 className="mb-4">
          What do you want to do on Benshada Place?
        </h2>

        <small className="section-header">I want to</small>
        <div className="form-row align-items-center">
          <Field
            action="type"
            name="type"
            type="radio"
            component={FormField}
            label="Sell Only"
            icon={faStoreAlt}
            className="col form-holder-select"
            value="UA"
          />
          <Field
            action="type"
            name="type"
            type="radio"
            component={FormField}
            label="Buy & Sell"
            icon={faShoppingBasket}
            className="col form-holder-select"
            value="UB"
          />
          <Field
            action="type"
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
          <Link to="/logout" type="button" className="btn btn-danger">
            Logout
          </Link>
        </div>
      </form>
  )
}

const warn = () => ({});

export default reduxForm({
  form: 'typeForm',
  validate,
  warn
})(TypeForm);
