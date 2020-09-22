/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  faStoreAlt, faMapPin, faTrademark, faMobileAlt
} from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { storeValidate as validate } from '../../../assets/js/validate.js';

import '../../../assets/css/form.css';
import FormField from '../../form/formField.js';
import states from '../../../assets/data/states.json';

class StoreForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animationClass: 'animate__zoomIn'
    };
  }

  static propTypes = {
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    handleSubmit: PropTypes.func,
    store: PropTypes.object,
    userStore: PropTypes.object,
    initialValues: PropTypes.object,
    initialize: PropTypes.func,
    type: PropTypes.string
  };

  componentWillUnmount() {
    this.setState({ animationClass: 'animate__slideOutLeft' });
  }

  getSnapshotBeforeUpdate = (prvP) => ({
    shouldInitialize: prvP.store && prvP.store._id !== this.props.store && this.props.store._id
  });

  componentDidUpdate = (prvP, prvS, snapshot) => (snapshot.shouldInitialize && this.props.type !== 'create' && this.props.type !== 'user'
    ? this.props.initialize(this.props.store)
    : '');

  componentDidMount = () => (this.props.type === 'user' ? this.props.initialize(this.props.userStore) : '');

  render() {
    const { animationClass } = this.state;
    const { type, store } = this.props;

    return (
      <form
        onSubmit={this.props.handleSubmit}
        className={`animate__animated ${animationClass} m-0 ${
          this.props.type === 'user' ? '' : 'px-lg-5'
        }`}
        autoComplete="off"
      >
        <h2 className="mb-0">{type === 'create' ? 'New store' : `Edit ${store && store.name}`}</h2>
        <p>
          {type === 'create' ? 'Create a new store' : 'Make changes to your store'}
          <FontAwesomeIcon icon={faStoreAlt} className="ml-2" />
        </p>
        <div className="form-row">
          <Field
            action="store"
            name="name"
            type="text"
            component={FormField}
            label="Store Name"
            className="col-12"
            placeholder="e.g Amadi Stores"
          />
        </div>

        <div className="form-row">
          <Field
            action="store"
            name="description"
            type="textarea"
            component={FormField}
            label="Store Description"
            className="col-12"
            placeholder="e.g: We deal in female wears"
          />
        </div>

        <div className="form-row">
          <Field
            action="store"
            name="address"
            type="textarea"
            component={FormField}
            label="Address"
            icon={faMapPin}
            className="col-12 col-md-6"
            placeholder="e.g: 3 Pound Road"
          />
          <Field
            action="store"
            name="state"
            type="datalist"
            options={states.map(({ name }) => name)}
            component={FormField}
            label="State"
            icon={faFlag}
            className="col-12 col-md-6"
            placeholder="e.g: Anambra"
          />
        </div>

        <div className="form-row">
          <Field
            action="store"
            name="CACNumber"
            type="text"
            component={FormField}
            label="CAC Number"
            icon={faTrademark}
            className="col-12 col-md-6"
            placeholder="Type here..."
          />

          <Field
            action="store"
            name="phone"
            type="tel"
            component={FormField}
            label="Store Contact Number"
            icon={faMobileAlt}
            className="col-12 col-md-6"
            placeholder="e.g: 2348124971450"
          />
        </div>

        <div className="button-group">
          <button className="btn btn-primary" type="submit">
            {this.props.buttonValue}
          </button>
          {type === 'create' ? (
            <Link type="button" to="/logout" className="btn btn-danger">
              Logout
            </Link>
          ) : (
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
              Done
            </button>
          )}
        </div>
      </form>
    );
  }
}

const warn = () => ({});

const mapStateToProps = ({ store }) => ({
  store: store.selected
});

export default reduxForm({
  form: 'storeForm',
  validate,
  warn
})(connect(mapStateToProps)(StoreForm));
