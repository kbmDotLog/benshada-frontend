/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faUsers, faMobileAlt, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { faUser, faFlag } from '@fortawesome/free-regular-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { profileValidate as validate } from '../../../assets/js/validate.js';

import '../../../assets/css/form.css';
import FormField from '../../form/formField.js';
import categories from '../../../assets/js/categories.js';
import states from '../../../assets/data/states.json';

class ProfileForm extends Component {
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
    initialize: PropTypes.func,
    initialValues: PropTypes.object
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
    return (
      <form
        onSubmit={this.props.handleSubmit}
        className={`animate__animated ${this.state.animationClass}`}
        autoComplete="off"
      >
        <div className="form-row">
          <Field
            action="profile"
            name="firstName"
            type="text"
            component={FormField}
            label="First Name"
            icon={faUser}
            className="col-12 col-sm-6"
            placeholder="e.g John"
          />
          <Field
            action="profile"
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
            action="profile"
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
            action="profile"
            name="address"
            type="textarea"
            component={FormField}
            label="Address"
            icon={faMapPin}
            className="col-12 col-md-6"
            placeholder="e.g: 3 Pound Road"
          />
          <Field
            action="profile"
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

        <div className="form-row">
          <Field
            action="profile"
            name="categories"
            type="multi"
            component={FormField}
            label="Preferred Categories"
            className="col-12"
            options={categories.map(({ name }) => ({ label: name, value: name }))}
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
  form: 'profileForm',
  validate,
  warn
})(ProfileForm);
