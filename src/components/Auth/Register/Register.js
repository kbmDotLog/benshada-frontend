import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Auth from '../Auth.js';
import RegisterForm from './RegisterForm.js';
import { authSignup } from '../../../redux/actions/auth.js';
import Loading from '../../../assets/js/loading.js';

class Register extends Component {
  INIT = {
    buttonValue: 'Register'
  };

  constructor(props) {
    super(props);
    this.state = this.INIT;
  }

  static propTypes = {
    authSignup: PropTypes.func
  };

  submit = (registerData) => {
    this.setState({
      buttonValue: <Loading />
    });

    const user = {
      ...registerData,
      name: `${registerData.firstName} ${registerData.familyName}`
    };
    delete user.firstName;
    delete user.familyName;
    delete user.confirmPassword;

    return this.props
      .authSignup(user)
      .finally(() => this.setState(this.INIT));
  };

  render = () => (
    <Auth>
      <RegisterForm buttonValue={this.state.buttonValue} onSubmit={this.submit} />
    </Auth>
  );
}

export default connect(null, { authSignup })(Register);
