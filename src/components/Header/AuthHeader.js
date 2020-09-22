// Module imports
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import ContainerDimensions from 'react-container-dimensions';

class AuthHeader extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    cart: PropTypes.array
  };

  // Link to cart
  renderCartLink() {
    const cart = this.props.cart || [];
    return (
      <li className="nav-item position-relative border border-left-0 border-top-0 border-bottom-0 border-right-light px-md-3">
        <Link className="nav-link" to="/user/cart">
          {cart.length < 1 ? (
            ''
          ) : (
            <div className="cart-count cart-count-header">
              <ContainerDimensions>
                {({ height, width }) => (
                  <span className="" style={{ top: `-${height / 2}px`, left: `-${width / 2}px` }}>
                    {cart.length}
                  </span>
                )}
              </ContainerDimensions>
            </div>
          )}
          <FontAwesomeIcon className="mr-2" icon={faShoppingCart} />
          {/* Cart */}
        </Link>
      </li>
    );
  }

  render() {
    const { user } = this.props;
    const name = (user && user.name) || '';
    const firstName = name.includes(' ') ? name.split(' ')[0] : name;

    return (
      <ul className="navbar-nav ml-auto " id="loggedIn">
        {['UDC', 'UA'].includes(user && user.type) ? '' : this.renderCartLink()}
        <li className="nav-item dropdown pl-md-3">
          <Link
            className="nav-link dropdown-toggle"
            to=""
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <FontAwesomeIcon className="mr-2" icon={faUser} />
            {firstName}
          </Link>
          <div className="dropdown-menu border-0 shadow-md-sm" aria-labelledby="navbarDropdown">
            {['UDC', 'UA'].includes(user && user.type) ? (
              ''
            ) : (
              <>
                <Link className="dropdown-item" to={'/user/saved'}>
                  Saved
                </Link>
                <Link className="dropdown-item" to={'/user/cart'}>
                  Cart
                </Link>
              </>
            )}
            <Link className="dropdown-item" to={'/user/profile'}>
              Account
            </Link>
            <div className="dropdown-divider" />
            <Link className="dropdown-item" to="/logout">
              Logout
            </Link>
          </div>
        </li>
      </ul>
    );
  }
}

export default AuthHeader;
