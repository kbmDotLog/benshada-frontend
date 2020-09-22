import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { authLogout } from '../../../redux/actions/auth.js';
import AuthRedirect from '../AuthRedirect.js';

class Logout extends Component {
  static propTypes = {
    authLogout: PropTypes.func
  };

  render = () => <AuthRedirect type="logout" />;

  componentDidMount = () => this.props.authLogout();
}

export default connect(null, { authLogout })(Logout);
