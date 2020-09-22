// Module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Component imports
import NotificationList from './NotificationList/NotificationList.js';

// Start Component
class Notifications extends Component {
  static propTypes = {
    notifications: PropTypes.array
  };

  render = () => <NotificationList notifications={this.props.notifications} />;
}
// End Component

const mapStateToProps = ({ notification }) => ({ notifications: notification.all });

export default connect(mapStateToProps)(Notifications);
