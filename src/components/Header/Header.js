// Module imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream } from '@fortawesome/free-solid-svg-icons';

// Component imports
import Search from './Search.js';
import UnAuthHeader from './UnAuthHeader.js';
import AuthHeader from './AuthHeader.js';

// Assets imports
import '../../assets/css/header.css';

// Start Component
class Header extends React.Component {
  // Declare propTypes
  static propTypes = {
    isSignedIn: PropTypes.bool,
    user: PropTypes.object
  };

  // Render based on if user isSignedIn
  authRender = () => (
    this.props.isSignedIn
      ? <AuthHeader user={this.props.user} cart={this.props.user && this.props.user.cart} />
      : <UnAuthHeader />
  );

  render() {
    return (
      <nav className="navbar navbar-expand-md shadow-sm mb-1 bg-white fixed-top" id="header">
        <div className="container px-0">
          <Link to="/" className="navbar-brand">
            <i className="text-primary-benshada font-weight-bold">benshada</i>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={faStream} />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Search />
            {this.authRender()}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth, user }) => ({
  isSignedIn: auth.isSignedIn,
  user: user.selected
});

export default connect(mapStateToProps)(Header);
