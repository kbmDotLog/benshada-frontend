/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  faHandsHelping,
  faTruckMoving,
  faMoneyBill,
  faMapPin,
  faWeight
} from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { faFlag, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { packageValidate as validate } from '../../../assets/js/validate.js';

import '../../../assets/css/form.css';
import FormField from '../../form/formField.js';
import states from '../../../assets/data/states.json';

class PackageForm extends Component {
  INIT = {
    animationClass: 'animate__zoomIn'
  };

  constructor(props) {
    super(props);

    this.state = this.INIT;
  }

  static propTypes = {
    action: PropTypes.string,
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    handleSubmit: PropTypes.func,
    package: PropTypes.object,
    formData: PropTypes.object,
    onSubmit: PropTypes.func,
    initialize: PropTypes.func
  };

  componentWillUnmount() {
    this.setState({ animationClass: 'animate__slideOutLeft' });
  }

  getSnapshotBeforeUpdate = (prvP) => ({
    shouldInitialize:
      (prvP.package && prvP.package._id)
      !== (this.props.package && this.props.package._id)
  });

  componentDidUpdate = (prvP, prvS, snapshot) => (snapshot.shouldInitialize ? this.props.initialize(this.props.package) : '')

  componentDidMount = () => this.props.initialize(this.props.package);

  onSubmit = ({
    _id,
    deliveryCompany,
    to,
    from,
    method,
    pickupStationName,
    pickupStationAddress,
    pickupStationState,
    cost,
    duration,
    maxDeliverySize
  }) => this.props.onSubmit({
    _id,
    deliveryCompany,
    method,
    cost,
    to,
    from,
    duration,
    pickupStationName,
    pickupStationAddress,
    pickupStationState,
    maxDeliverySize
  });

  render() {
    const { animationClass } = this.state;
    const { formData } = this.props;

    return (
      <>
        <h2 className="mb-0 px-3 pt-4">
          {this.props.action ? 'New Delivery Package' : 'Edit Delivery Package'}
        </h2>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className={`animate__animated ${animationClass} m-0`}
          autoComplete="off"
          id="packageForm"
        >
          <small className="section-header">Delivery Method</small>
          <div className="form-row align-items-center">
            <Field
              action="package"
              name="method"
              type="radio"
              component={FormField}
              label="pickup"
              icon={faHandsHelping}
              className="col form-holder-select"
              value="pickup"
              key="package-method-pickup"
            />

            <Field
              action="package"
              name="method"
              type="radio"
              component={FormField}
              label="delivery"
              icon={faTruckMoving}
              className="col form-holder-select"
              value="delivery"
              key="package-method-delivery"
            />
          </div>

          {formData && formData.method === 'pickup' ? (
            <>
              <div className="form-row">
                <Field
                  action="package"
                  name="pickupStationName"
                  type="text"
                  component={FormField}
                  label="Name of Pickup Place"
                  className="col-12"
                  placeholder="e.g: Mega Chicken"
                />
              </div>
              <div className="form-row">
                <Field
                  action="package"
                  name="pickupStationAddress"
                  type="textarea"
                  component={FormField}
                  label="Address"
                  icon={faMapPin}
                  className="col-12 col-md-6"
                  placeholder="e.g: 3 Pound Road"
                />
                <Field
                  action="package"
                  name="pickupStationState"
                  type="datalist"
                  options={states.map(({ name }) => name)}
                  component={FormField}
                  label="State"
                  icon={faFlag}
                  className="col-12 col-md-6"
                  placeholder="e.g: Anambra"
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-row">
                <Field
                  action="package"
                  name="from"
                  type="datalist"
                  options={states.map(({ name }) => name)}
                  component={FormField}
                  label="From"
                  icon={faFlag}
                  className="col-12 col-md-6"
                  placeholder="e.g: Anambra"
                />
                <Field
                  action="package"
                  name="to"
                  type="datalist"
                  options={states.map(({ name }) => name)}
                  component={FormField}
                  label="To"
                  icon={faFlag}
                  className="col-12 col-md-6"
                  placeholder="e.g: Anambra"
                />
              </div>
              <div className="form-row">
                <Field
                  action="package"
                  name="duration"
                  type="number"
                  component={FormField}
                  label="Days to delivery"
                  icon={faCalendar}
                  className="col-12"
                  placeholder="e.g: 10"
                />
              </div>
            </>
          )}

          <div className="form-row">
            <Field
              action="package"
              name="cost"
              type="number"
              component={FormField}
              label="Cost of Delivery Package"
              icon={faMoneyBill}
              className="col-12 col-md-6"
              placeholder="e.g 2000"
            />
            <Field
              action="product"
              name="maxDeliverySize"
              type="number"
              component={FormField}
              label="Maximum Delivery Size in KG"
              icon={faWeight}
              className="col-12 col-md-6"
              placeholder="e.g: 10"
            />
          </div>

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

const mapStateToProps = ({ deliveryPackage, form }) => ({
  package: deliveryPackage.selected,
  formData: form.packageForm && form.packageForm.values
});

export default reduxForm({
  form: 'packageForm',
  validate,
  warn
})(connect(mapStateToProps)(PackageForm));
