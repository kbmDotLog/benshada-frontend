/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

// Component imports
import Image from '../../../../Image/Image.js';

// Asset imports
import '../../../../../assets/css/notification.css';
import Loading from '../../../../../assets/js/loading.js';

// Action imports
import {
  notificationMarkAsRead,
  notificationDelete
} from '../../../../../redux/actions/notifications.js';

// Start Component
class NotificationDisplay extends Component {
  INIT = {
    btnRead: 'Mark as',
    btnDelete: 'Delete'
  };

  constructor(props) {
    super(props);

    this.state = this.INIT;
  }

  static propTypes = {
    notification: PropTypes.object,
    notificationMarkAsRead: PropTypes.func,
    notificationDelete: PropTypes.func
  };

  notificationMarkAsRead = (notification) => {
    this.setState({ btnRead: <Loading /> });

    this.props
      .notificationMarkAsRead(notification)
      .then((response) => toast.success(
        (response && response.value && response.value.data && response.value.data.message)
            || (response && response.statusText)
            || 'Success'
      ))
      .catch((err) => toast.error(
        (err && err.response && err.response.data && err.response.data.message)
            || (err
              && err.response
              && err.response.data
              && err.response.data.message
              && err.response.data.message.name)
            || (err && err.response && err.response.statusText)
            || 'Network error'
      ))
      .finally(() => this.setState(this.INIT));
  };

  notificationDelete = (notification) => {
    this.setState({ btnDelete: <Loading /> });

    this.props
      .notificationDelete(notification)
      .then((response) => toast.success(
        (response && response.value && response.value.data && response.value.data.message)
            || (response && response.statusText)
            || 'Success'
      ))
      .catch((err) => toast.error(
        (err && err.response && err.response.data && err.response.data.message)
            || (err
              && err.response
              && err.response.data
              && err.response.data.message
              && err.response.data.message.name)
            || (err && err.response && err.response.statusText)
            || 'Network error'
      ))
      .finally(() => this.setState(this.INIT));
  };

  render = () => {
    const { notification } = this.props;
    const read = notification && notification.read;
    const type = notification && notification.type;
    const description = notification && notification.description;
    const createdAt = notification && notification.createdAt;

    return (
      <div className={`notification ${read ? '' : 'bg-white'}`}>
        <div className="img-holder">
          <Image type={type || 'notification'} />
        </div>
        <div className="info">
          <div>
            <p className="name">{description}</p>
            <p className="time">
              <small>{new Date(createdAt).toDateString()}</small>
            </p>
          </div>
          <div className="action">
            <button
              className="btn btn-link"
              onClick={() => this.notificationMarkAsRead(notification)}
            >
              {typeof this.state.btnRead === 'string'
                ? `${this.state.btnRead} ${read ? 'unread' : 'read'}`
                : this.state.btnRead}
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.notificationDelete(notification)}
            >
              {this.state.btnDelete}
            </button>
          </div>
        </div>
      </div>
    );
  };
}
// End Component

export default connect(null, { notificationMarkAsRead, notificationDelete })(NotificationDisplay);
