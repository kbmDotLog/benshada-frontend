import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import headerMenuAnimation from '../../assets/js/headerMenuAnimation.js';

class UserNav extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    list: PropTypes.array,
    notifications: PropTypes.array,
    pathname: PropTypes.string
  };

  componentDidMount = () => headerMenuAnimation();

  renderList = (list) => list.map((item, index) => {
    const active = this.props.pathname.includes(item.Title.toLowerCase()) ? 'active' : '';
    // const selected = this.props.pathname.includes(item.Title.toLowerCase()) ? 'selected' : '';

    const notificationLength = this.props.notifications.filter(({ read }) => !read).length;

    return (
        <li className="nav-item" key={`user-nav-${index}`}>
          <Link
            className={`nav-link text-capitalize ${active}`}
            // id={`pills-${item.Title}-tab`}
            // data-toggle="pill"
            // href={`#pills-${item.Title}`}
            to={`/user/${item.Title.toLowerCase()}`}
            // role="tab"
            // aria-controls={`pills-${item.Title}`}
            // aria-selected={selected}
          >
            <FontAwesomeIcon icon={item.icon} />
            <span className="ml-2">{item.Title}</span>
            {item.Title === 'Notifications' && notificationLength > 0
              ? <span className="badge badge-success mt-1 float-right">{notificationLength}</span>
              : ''}
          </Link>
        </li>
    );
  });

  render = () => (
    <div
      className={`col-7 col-sm-5 col-md-3 col-lg-2 position-fixed h-100 ${this.props.className} px-0 shadow-sm`}
      id="userSide"
    >
      <p className="text-center p-4">
        <Link to="/" className="no-link text-white lead font-weight-bolder">
          benshada
        </Link>
      </p>
      <ul className={'nav nav-pills flex-column my-3 pl-4'} id="userNav" role="tablist">
        {this.renderList(this.props.list)}
        <li className="nav-item">
          <Link className="nav-link text-capitalize" to="/logout">
            <button className="btn btn-danger">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
              Logout
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

const mapStateToProps = ({ notification }) => ({ notifications: notification.all });

export default connect(mapStateToProps)(UserNav);
