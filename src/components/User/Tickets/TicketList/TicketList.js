// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component imports
import TicketDisplay from './TicketDisplay/TicketDisplay.js';
import NotFound from '../../../NotFound/NotFound.js';

// Start Component
export default class TicketList extends Component {
  static propTypes = {
    tickets: PropTypes.array
  };

  renderTicketList = (tickets) => (tickets.length > 0 ? (
      <div className="cards tickets" id="ticketTable">
        {tickets.map((ticket, key) => (
          <TicketDisplay key={`ticketList${key}`} count={key} ticket={ticket} />
        ))}
      </div>
  ) : (
      <NotFound type="ticket" />
  ));

  render = () => <>{this.renderTicketList(this.props.tickets)}</>;
}
// End Component
