/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

// Component imports
import FormField from '../../form/formField.js';
import ImageUpload from '../../Image/ImageUpload.js';

// Asset imports
import '../../../assets/css/form.css';
import { ticketValidate as validate } from '../../../assets/js/validate.js';
import ticketTypes from '../../../assets/js/ticketTypes.js';

class TicketForm extends Component {
  INIT = {
    animationClass: 'animate__zoomIn',
    imageButtonValue: 'Select Image',
    data: null,
    buttonTicket: 'Upload Ticket',
    orderNumber: null
  };

  constructor(props) {
    super(props);

    this.state = this.INIT;
  }

  static propTypes = {
    action: PropTypes.string,
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    formData: PropTypes.object,
    handleSubmit: PropTypes.func,
    user: PropTypes.object,
    users: PropTypes.array,
    shops: PropTypes.array,
    orders: PropTypes.array,
    ticket: PropTypes.object,
    tickets: PropTypes.array,
    onSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    initialize: PropTypes.func,
    selectedOrders: PropTypes.array
  };

  componentWillUnmount() {
    this.setState({ animationClass: 'animate__slideOutLeft' });
  }

  getSnapshotBeforeUpdate = (prvP) => ({
    shouldInitialize:
      (prvP.ticket && prvP.ticket._id) !== (this.props.ticket && this.props.ticket._id)
  });

  componentDidUpdate = (prvP, prvS, snapshot) => (snapshot.shouldInitialize && this.props.action !== 'create'
    ? this.props.initialize(this.props.ticket)
    : '');

  componentDidMount = () => (this.props.action === 'create' ? this.props.initialize(this.props.ticket) : '');

  ifTicketExists = (tD) => {
    this.props.tickets.filter(
      ({ owner, title, orderNumber }) => (owner && owner._id === tD.user && title === tD.title)
        || (owner && owner._id === tD.user && orderNumber === tD.order)
    );
  };

  ifWrongTypeIdentifier = (type, order, shop, user) => {
    const { users, shops, orders } = this.props;

    if (!order && !shop && !user && type !== 'other') return true;
    if (
      type === 'order'
      && orders.filter(({ orderNumber }) => orderNumber === Number(order)).length < 1
    ) {
      return true;
    }
    if (type === 'shop' && shops.filter(({ _id }) => _id === shop).length < 1) return true;
    if (type === 'user' && users.filter(({ _id }) => _id === user).length < 1) return true;

    return false;
  };

  onSubmit = ({
    _id, title, description, type, user, shop, orderNumber
  }) => {
    const { data } = this.state;

    if (!data) {
      return toast.error('Do select an image');
    }

    const ticketData = {
      _id,
      title,
      description,
      type,
      user,
      shop,
      orderNumber
    };

    Object.entries(ticketData).forEach(([key, value]) => (data.get(key) ? '' : data.append(key, value)));

    if (this.ifTicketExists(ticketData)) {
      return toast.warn('You have already created a similar ticket');
    }

    return this.ifWrongTypeIdentifier(type, orderNumber, shop, user)
      ? toast.warn(`This ${type} does not exist`)
      : this.props.onSubmit(data);
  };

  render() {
    const { animationClass } = this.state;

    return (
      <>
        <h2 className="mb-0 px-3 pt-4">{this.props.action ? 'Upload Ticket' : 'Edit Ticket'}</h2>
        <p className="px-3 pb-4 text-danger font-weight-bold lead">
          Image should be 680x850 pixels
        </p>
        <div
          className="position-absolute w-100 text-center item-upload ticket-upload"
          style={{
            top: '0'
          }}
        >
          <ImageUpload
            buttonValue={this.state.imageButtonValue}
            object={this.props.ticket}
            onImageChange={(data) => this.setState({ data })}
            type="ticket"
          />
        </div>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className={`animate__animated ${animationClass}`}
        >
          <div className="form-row">
            <Field
              action="ticket"
              name="title"
              type="text"
              component={FormField}
              label="Ticket Title"
              className="col-12"
              placeholder="e.g Observation"
            />
          </div>

          <div className="form-row">
            <Field
              action="ticket"
              name="description"
              type="textarea"
              component={FormField}
              label="Description"
              className="col-12"
              placeholder="e.g: Here's how your site can be better..."
            />
          </div>

          <small className="section-header">Ticket Type</small>
          <div className="form-row align-items-center">
            {ticketTypes.map(({ name, icon }) => (
              <Field
                action="ticket"
                name="type"
                type="radio"
                component={FormField}
                label={name}
                icon={icon}
                className="col form-holder-select"
                value={name}
                key={`product-ticket-${name}`}
              />
            ))}
          </div>

          {
            {
              order: (
                <div className="form-row">
                  <Field
                    action="ticket"
                    name="orderNumber"
                    type="text"
                    component={FormField}
                    label="Order Number"
                    className="col-12"
                    placeholder="e.g: **********"
                  />
                </div>
              ),
              user: (
                <div className="form-row">
                  <Field
                    action="ticket"
                    name="user"
                    type="text"
                    component={FormField}
                    label="User ID"
                    className="col-12"
                    placeholder="e.g: 5dd475268c62056a768d076f"
                  />
                </div>
              ),
              shop: (
                <div className="form-row">
                  <Field
                    action="ticket"
                    name="shop"
                    type="text"
                    component={FormField}
                    label="Shop ID"
                    className="col-12"
                    placeholder="e.g: 5dd475268c62056a768d076f"
                  />
                </div>
              )
            }[this.props.formData && this.props.formData.type]
          }

          <div className="button-group">
            <button className="btn btn-primary" type="submit">
              {this.props.buttonValue}
            </button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
              Done
            </button>
          </div>
        </form>
      </>
    );
  }
}

const warn = () => ({});

const mapStateToProps = ({
  ticket, order, form, user, store
}) => ({
  ticket: ticket.selected,
  selectedOrders: order.selected,
  formData: form.ticketForm && form.ticketForm.values,
  users: user.all,
  shops: store.all,
  orders: order.all,
  tickets: ticket.all
});

export default reduxForm({
  form: 'ticketForm',
  validate,
  warn
})(connect(mapStateToProps)(TicketForm));
