/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';
import { toast } from 'react-toastify';

// Component imports
import { faEye, faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import TicketDisplayButtons from './Buttons/TicketDisplayButtons.js';
import TicketForm from '../../TicketForm.js';

// Asset imports
import '../../../../../assets/css/ticket.css';

// Action imports
import {
  ticketsOneSelected,
  ticketUpdate,
  ticketDelete
} from '../../../../../redux/actions/tickets.js';
import Loading from '../../../../../assets/js/loading.js';
import Image from '../../../../Image/Image.js';
import TicketResponseForm from './TicketResponse/TicketResponseForm.js';
import TicketResponseList from './TicketResponse/TicketResponseList/TicketResponseList.js';

// Start Component
class TicketDisplay extends Component {
  INIT = {
    btnDelete: 'delete',
    btnUpdate: 'update',
    display: 'd-none',
    displayIcon: faEye,
    displayText: 'view',
    btnResponse: faPaperPlane
  };

  constructor(props) {
    super(props);
    this.state = this.INIT;
  }

  static propTypes = {
    count: PropTypes.number,
    selectedTicket: PropTypes.object,
    ticket: PropTypes.object,
    ticketDelete: PropTypes.func,
    ticketsOneSelected: PropTypes.func,
    ticketUpdate: PropTypes.func,
    user: PropTypes.object,
    users: PropTypes.array
  };

  hashString = () => {};

  ticketResponseSubmit = (ticketData) => {
    this.setState({ btnUpdate: <Loading /> });

    const { userID } = ticketData;
    const { _id, responses } = this.props.selectedTicket;

    // Generate new response ID
    const d = new Date();
    const createdAt = d.getTime();
    const hex = `${createdAt}${_id}${userID}`;

    return this.props
      .ticketUpdate(_id, { responses: [...responses, { ...ticketData, _id: hex, createdAt }] })
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
      .finally(() => {
        this.setState(this.INIT);
      });
  };

  ticketSubmit = (id, ticketData) => {
    this.setState({ btnUpdate: <Loading /> });

    return this.props
      .ticketUpdate(id, ticketData)
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
      .finally(() => {
        this.setState(this.INIT);
        $('.modal-backdrop').remove();
      });
  };

  ticketDelete = (id) => {
    this.setState({ btnDelete: <Loading /> });

    return this.props
      .ticketDelete(id)
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
      .finally(() => {
        this.setState(this.INIT);
        $('.modal-backdrop').remove();
      });
  };

  getStatusColor = (status) => ({ pending: 'light', awaiting: 'success text-white', resolved: 'primary text-white' }[status]);

  getTypeColor = (type) => ({
    order: 'light',
    shop: 'success text-white',
    user: 'primary text-white',
    other: 'secondary text-white'
  }[type]);

  getTypeReference = ({
    type, user, orderNumber, shop
  }) => (type === 'other' ? '' : ` #${{ order: orderNumber, shop, user }[type]}`);

  expandTicket = (ticket, display) => {
    this.props.ticketsOneSelected(ticket);

    this.setState({
      display: display === 'd-none' ? 'd-flex' : 'd-none',
      displayIcon: display === 'd-none' ? faTimes : faEye,
      displayText: display === 'd-none' ? 'close' : 'view'
    });
  };

  render = () => {
    const {
      btnDelete, btnUpdate, display, btnResponse
    } = this.state;
    const {
      ticket, user, selectedTicket, users
    } = this.props;
    const _id = selectedTicket && selectedTicket._id;
    const title = ticket && ticket.title;
    const status = ticket && ticket.status;
    const type = ticket && ticket.type;
    const createdAt = ticket && ticket.createdAt;
    const description = ticket && ticket.description;
    const image = ticket && ticket.image;
    const owner = ticket && ticket.owner;
    const responses = ticket && ticket.responses;
    const { name, email } = owner;
    const usersImage = users.filter((i) => i.email === email)[0].image;
    const d = new Date(createdAt);
    const date = d.toDateString();

    return (
      <>
        <div className="">
          <div className="d-block d-lg-flex align-items-center ticket-row">
            <div className="cell header">
              <div id="ticketID">
                <span className="text-truncate">#{this.props.count + 1}</span>
              </div>
              <div className="ticket-actions ticket-actions-small">
                <TicketDisplayButtons
                  expand={(t) => this.expandTicket(t, display)}
                  state={this.state}
                  ticket={ticket}
                  user={user}
                />
              </div>
            </div>
            <div className="cell title">
              <span className="text-truncate">{title}</span>
            </div>
            <div className="cell status">
              <span className={`rounded-pill bg-${this.getTypeColor(type)} px-3 py-1 mr-2`}>
                {type + this.getTypeReference(ticket)}
              </span>
              <span className={`rounded-pill bg-${this.getStatusColor(status)} px-3 py-1`}>
                {status}
              </span>
            </div>
            <div className="cell createdAt">{date}</div>
            <div className="cell d-none ticket-actions d-lg-flex">
              <TicketDisplayButtons
                expand={(t) => this.expandTicket(t, display)}
                state={this.state}
                ticket={ticket}
                user={user}
              />
            </div>
          </div>
          <div className={`misc ${display}`}>
            <div className="img-holder">
              <Image image={usersImage} />
            </div>
            <div className="info">
              <TicketResponseForm
                buttonValue={btnResponse}
                action="create"
                onSubmit={this.ticketResponseSubmit}
                user={user}
              />
            </div>
          </div>
          <div className={`misc ${display}`}>
            <div className="img-holder">
              <Image image={usersImage} />
            </div>
            <div className="info">
              <p className="name">{name}</p>
              <p className="response">{description}</p>
              <Image image={image} />
            </div>
          </div>
          <div className="responses"><TicketResponseList ticketUpdate={this.props.ticketUpdate} selectedTicket={selectedTicket} users={users} display={display} responses={responses} /></div>
        </div>

        <div
          className="modal fade"
          id="ticketDeleteModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="ticketDeleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Ticket</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">Are you sure you want to delete ticket {_id}?</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger text-capitalize"
                  onClick={() => this.ticketDelete(_id)}
                >
                  {btnDelete}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="ticketEditModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="ticketModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content" id="formContainer">
              <div className="modal-body form-container-holder">
                <TicketForm
                  buttonValue={btnUpdate}
                  onSubmit={(ticketData) => this.ticketSubmit(_id, ticketData)}
                  user={user}
                />{' '}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
}
// End Component

const mapStateToProps = ({ user, ticket }) => ({
  user: user.selected,
  users: user.all,
  selectedTicket: ticket.selected
});

export default connect(mapStateToProps, { ticketsOneSelected, ticketDelete, ticketUpdate })(
  TicketDisplay
);
