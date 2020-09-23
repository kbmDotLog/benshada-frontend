/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faLock, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { passwordValidate as validate } from '../../../assets/js/validate.js';

import '../../../assets/css/form.css';
import FormField from '../../form/formField.js';

class PasswordForm extends Component {
  static propTypes = {
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    handleSubmit: PropTypes.func
  };

  render = () => (
      <form
        onSubmit={this.props.handleSubmit}
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
  )
}

const warn = () => ({});

export default reduxForm({
  form: 'passwordForm',
  validate,
  warn
})(PasswordForm);
