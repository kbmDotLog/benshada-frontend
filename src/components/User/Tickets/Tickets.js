/* eslint-disable no-underscore-dangle */

// Module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Component imports
import TicketList from './TicketList/TicketList.js';

// Start Component
class Tickets extends Component {
  static propTypes = { tickets: PropTypes.array, user: PropTypes.object };

  render = () => (
    <TicketList
      tickets={this.props.tickets.filter(
        ({ owner }) => owner && owner._id === this.props.user._id
      )}
    />
  )
}

const mapStateToProps = ({ ticket }) => ({ tickets: ticket.all });

export default connect(mapStateToProps)(Tickets);
// End Component
