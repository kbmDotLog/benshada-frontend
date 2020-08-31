/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Component imports
import NotificationDisplay from './NotificationDisplay/NotificationDisplay.js';
import NotFound from '../../../NotFound/NotFound.js';

// Start Component
export default class NotificationList extends Component {
  static propTypes = {
    notifications: PropTypes.array
  };

  renderNotificationList = (notifications) => (notifications.length > 0 ? (
      <div className="cards notifications" id="notificationTable">
        {_.orderBy(notifications, ['read', ['asc']]).map((notification, key) => (
          <NotificationDisplay key={`notificationList${key}`} notification={notification} />
        ))}
      </div>
  ) : (
      <NotFound type="notification" />
  ));

  render = () => <>{this.renderNotificationList(this.props.notifications)}</>;
}
// End Component
