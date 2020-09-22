/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Compoennt imports
import Image from '../../../../../../../Image/Image.js';
import Loading from '../../../../../../../../assets/js/loading.js';

// Start component
export default class TicketResponseDisplay extends Component {
  INIT = {
    deleteBtn: <FontAwesomeIcon icon={faTrash} />
  }

  constructor(props) {
    super(props);

    this.state = this.INIT;
  }

  static propTypes = {
    display: PropTypes.string,
    response: PropTypes.object,
    selectedTicket: PropTypes.object,
    ticketUpdate: PropTypes.func,
    users: PropTypes.array
  };

  deleteResponse = () => {
    const { selectedTicket, response } = this.props;
    const { _id, responses } = selectedTicket;
    const ticketData = { responses: responses.filter((i) => i._id !== response._id) };

    this.setState({ deleteBtn: <Loading /> });

    this.props.ticketUpdate(_id, ticketData);
  }

  render = () => {
    const { display, users, response } = this.props;
    const user = users.filter(({ _id }) => _id === response.userID)[0];

    return (
      <div className={`misc ${display}`}>
        <div className="img-holder">
          <Image image={user && user.image} />
        </div>
        <div className="info">
          <p className="name">{user && user.name}</p>
          <p className="response">{response.description}</p>
          {/* <Image image={response.image} /> */}
        </div>
          <button onClick={this.deleteResponse}>
            {this.state.deleteBtn}
          </button>

      </div>
    );
  };
}
// End component
