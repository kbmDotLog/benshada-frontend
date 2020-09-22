import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/auth.css';
import AuthRedirect from './AuthRedirect.js';

export default class Auth extends Component {
  static propTypes = {
    children: PropTypes.any,
    type: PropTypes.string
  };

  render = () => (
    <>
      <AuthRedirect type={this.props.type} />
      <div className="container-fluid h-100">
        <div className="row align-items-center h-100 p-0" id="formContainer">
          <div className="col col-md-3 col-lg-6 d-none d-md-block position-fixed h-100 login-left" />
          <div className="col col-md-9 col-lg-6 offset-lg-6 offset-md-3 form-container-holder">
            {this.props.children}
          </div>
        </div>
      </div>
    </>
  );
}
