/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  faCartArrowDown,
  faStoreAlt,
  faShoppingBasket,
  faHome,
  faTruck
} from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
          What do you want to do on Benshada Place?
        </h2>
        <p className="lead mb-4 text-center">
          Or return{' '}
          <Link to="/">
            <span className="d-none d-lg-inline">home</span>
            <span className="d-lg-none text-white">
              <FontAwesomeIcon icon={faHome} />
            </span>
          </Link>
        </p>
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
    );
  }
}

const warn = () => ({});

export default reduxForm({
  form: 'typeForm',
  validate,
  warn
})(TypeForm);
