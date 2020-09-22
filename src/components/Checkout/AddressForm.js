/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  faMapPin, faUser, faUsers, faMobileAlt
} from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { addressValidate as validate } from '../../assets/js/validate.js';

import '../../assets/css/form.css';
import FormField from '../form/formField.js';
import states from '../../assets/data/states.json';

class AddressForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animationClass: 'animate__zoomIn'
    };
  }

  static propTypes = {
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    handleSubmit: PropTypes.func,
    user: PropTypes.object,
    initialize: PropTypes.func
  };

  componentWillUnmount() {
    this.setState({ animationClass: 'animate__slideOutLeft' });
  }

  componentDidMount() {
    const { user } = this.props;

    const initialUser = {
      ...user,
      firstName: (user && user.name).split(' ')[0],
      familyName: (user && user.name).split(' ')[1],
      categories: (user && user.categories).map((value) => ({ label: value, value }))
    };

    delete initialUser.name;
    this.props.initialize(initialUser);
  }

  render() {
    const { animationClass } = this.state;

    return (
      <form
        onSubmit={this.props.handleSubmit}
        className={`animate__animated ${animationClass} m-0 px-lg-5`}
        autoComplete="off"
      >
        <div className="form-row">
          <Field
            action="address"
            name="firstName"
            type="text"
            component={FormField}
            label="First Name"
            icon={faUser}
            className="col-12 col-sm-6"
            placeholder="e.g John"
          />
          <Field
            action="address"
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
            action="address"
            name="phone"
            type="tel"
            component={FormField}
            label="Phone Number"
            icon={faMobileAlt}
            className="col-12"
            placeholder="e.g 2348163186209"
          />
        </div>

        <div className="form-row">
          <Field
            action="address"
            name="address"
            type="textarea"
            component={FormField}
            label="Address"
            icon={faMapPin}
            className="col-12 col-md-6"
            placeholder="e.g: 3 Pound Road"
          />
          <Field
            action="address"
            name="state"
            type="datalist"
            options={states.map(({ name }) => name)}
            component={FormField}
            label="State"
            icon={faFlag}
            className="col-12 col-md-6"
            placeholder="e.g: Anambra"
          />
        </div>

        <div className="button-group">
          <button className="btn btn-primary" type="submit">
            {this.props.buttonValue}
          </button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">
            Continue
          </button>
        </div>
      </form>
    );
  }
}

const warn = () => ({});

const mapStateToProps = ({ user }) => ({
  user: user.selected
});

export default reduxForm({
  form: 'addressForm',
  validate,
  warn
})(connect(mapStateToProps)(AddressForm));
