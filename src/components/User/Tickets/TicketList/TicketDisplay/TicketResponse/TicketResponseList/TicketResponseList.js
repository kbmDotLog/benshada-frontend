// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component imports
import TicketResponseDisplay from './TicketResponseDisplay/TicketResponseDisplay.js';

// Start Component
export default class TicketResponseList extends Component {
  static propTypes = {
    display: PropTypes.string,
    responses: PropTypes.array,
    selectedTicket: PropTypes.object,
    ticketUpdate: PropTypes.func,
    users: PropTypes.array
  };

  renderList = () => this.props.responses.map((response, i) => (
      <TicketResponseDisplay
        display={this.props.display}
        response={response}
        selectedTicket={this.props.selectedTicket}
        users={this.props.users}
        key={`ticketResponseDisplay${i}`}
        ticketUpdate = {this.props.ticketUpdate}
      />
  ));

  render = () => <>{this.renderList()}</>;
}
// End Component
