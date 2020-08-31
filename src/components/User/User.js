import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import AuthRedirect from '../Auth/AuthRedirect.js';
import navUA from '../../assets/js/navUA.js';
import navUB from '../../assets/js/navUB.js';
import navUC from '../../assets/js/navUC.js';
import navUDC from '../../assets/js/navUDC.js';
import UserNav from './UserNav.js';
import '../../assets/css/user.css';
import UserBody from './UserBody.js';

class User extends Component {
  static propTypes = {
    email: PropTypes.string,
    user: PropTypes.object,
    userOne: PropTypes.func,
    location: PropTypes.object
  };

  ifPathNameInList = (list, location) => {
    const pathnameArr = location.pathname.split('/');
    const pathnameArrLength = pathnameArr.length;
    const pathnameConcern = pathnameArr[pathnameArrLength - 1];
    const listArray = list.map(({ Title }) => Title.toLowerCase());

    return listArray.includes(pathnameConcern);
  };

  render = () => {
    const { user, location } = this.props;
    const list = {
      UA: navUA,
      UB: navUB,
      UC: navUC,
      UDC: navUDC
    }[user && user.type] || [];

    return (
      <>
        <AuthRedirect type="user" />
        {!this.ifPathNameInList(list, location) ? <Redirect to="/login" /> : ''}
        <div className="container-fluid h-100">
          <div className="row h-100">
            <UserNav
              pathname={location && location.pathname}
              list={list}
              user={user}
              className="bg-primary-benshada user-side-main"
            />
            <UserBody
              pathname={location && location.pathname}
              list={list}
              user={user}
              store={user && user.shops && user.shops[0]}
            />
          </div>
        </div>
      </>
    );
  };
}

export default User;
