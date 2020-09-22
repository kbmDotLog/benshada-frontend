/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userValidate as validate } from '../../assets/js/validate.js';

import '../../assets/css/form.css';
import FormField from '../form/formField.js';
import states from '../../assets/data/states.json';
import categories from '../../assets/js/categories.js';
import genders from '../../assets/js/genders.js';

class UserForm extends Component {
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
    initialValues: PropTypes.object,
    initialize: PropTypes.func
  };

  componentWillUnmount() {
    this.setState({ animationClass: 'animate__slideOutLeft' });
  }

  componentDidMount = () => this.props.initialize(this.props.user);

  render() {
    const { animationClass } = this.state;
    const { user } = this.props;

    return (
      <form
        onSubmit={this.props.handleSubmit}
        className={`animate__animated ${animationClass} m-0 px-lg-5`}
        autoComplete="off"
      >
        <h2 className="mb-0">Hello {user && user.name}</h2>
        <p>
          Tell us more about you{' '}
          <span role="img" aria-label="smiley-face-wink">
            &#128521;
          </span>
        </p>
        <div className="form-row">
          <Field
            action="user"
            name="address"
            type="textarea"
            component={FormField}
            label="Address"
            icon={faMapPin}
            className="col-12 col-md-6"
            placeholder="e.g: 3 Pound Road"
          />
          <Field
            action="user"
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

        <small className="section-header">Gender</small>
        <div className="form-row align-items-center">
          {genders.map(({ name, icon }) => (
            <Field
              action="user"
              name="gender"
              type="radio"
              component={FormField}
              label={name}
              icon={icon}
              className="col form-holder-select"
              value={name}
              key={`user-gender-${name}`}
            />
          ))}
        </div>

        <div className="form-row">
          <Field
            action="user"
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
          <Link type="button" to="/logout" className="btn btn-danger">
            Logout
          </Link>
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
  form: 'userForm',
  validate,
  warn
})(connect(mapStateToProps)(UserForm));
