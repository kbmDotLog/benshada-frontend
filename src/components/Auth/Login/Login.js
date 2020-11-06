import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Auth from '../Auth.js';
import LoginForm from './LoginForm.js';
import { authLogin } from '../../../redux/actions/auth.js';
import Loading from '../../../assets/js/loading.js';

class Login extends Component {
  INIT = {
    buttonValue: 'Login'
  };

  constructor(props) {
    super(props);
    this.state = this.INIT;
  }

  static propTypes = {
    authLogin: PropTypes.func
  };

  submit = (loginData) => {
    this.setState({
      buttonValue: <Loading />
    });

    return this.props
      .authLogin(loginData)
      .finally(() => this.setState(this.INIT));
  };

  render = () => (
    <Auth>
      <LoginForm buttonValue={this.state.buttonValue} onSubmit={this.submit} />

      {/* <p className="text-muted text-left my-3">
        <Link to="#">
          Forgot password or email?
        </Link>
      </p> */}
    </Auth>
  );
}

export default connect(null, { authLogin })(Login);
