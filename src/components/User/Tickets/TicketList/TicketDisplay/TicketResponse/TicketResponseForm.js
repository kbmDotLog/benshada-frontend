/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Component imports
import FormField from '../../../../../form/formField.js';

// Asset imports
import { ticketResponseValidate as validate } from '../../../../../../assets/js/validate.js';
import '../../../../../../assets/css/form.css';

class TicketResponseForm extends Component {
  INIT = {
    imageButtonValue: 'Select Image',
    data: null,
    buttonTicketResponse: 'respond'
  };

  constructor(props) {
    super(props);

    this.state = this.INIT;
  }

  static propTypes = {
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    handleSubmit: PropTypes.func,
    user: PropTypes.object,
    ticketResponse: PropTypes.object,
    onSubmit: PropTypes.func,
    initialize: PropTypes.func
  };

  getSnapshotBeforeUpdate = (prvP) => ({
    shouldInitialize:
      (prvP.ticketResponse && prvP.ticketResponse._id)
      !== (this.props.ticketResponse && this.props.ticketResponse._id)
  });

  componentDidUpdate = (prvP, prvS, snapshot) => (snapshot.shouldInitialize ? this.props.initialize(this.props.ticketResponse) : '');

  componentDidMount = () => this.props.initialize(this.props.ticketResponse);

  onSubmit = ({ _id, description }) => this.props.onSubmit({
    _id,
    userID: this.props.user._id,
    description
  });

  render = () => (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        // className={`animate__animated ${this.state.animationClass} m-0 px-lg-5`}
        className="m-0 form"
        autoComplete="off"
        id="ticketResponseForm"
      >
        <div className="form-row">
          <Field
            action="ticketResponse"
            name="description"
            type="textarea"
            component={FormField}
            label=""
            className="col-12"
            placeholder="Enter response here"
          />
        </div>

        <div className="button-group">
          <button className="btn btn-link v-align" type="submit">
            <FontAwesomeIcon className="text-primary-benshada" icon={this.props.buttonValue} />
          </button>
        </div>
      </form>
  )
}

const warn = () => ({});

export default reduxForm({
  form: 'ticketResponseForm',
  validate,
  warn
})(TicketResponseForm);
