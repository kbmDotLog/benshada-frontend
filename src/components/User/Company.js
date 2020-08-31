/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { deliveryCompanyUpdate } from '../../redux/actions/deliveryCompanies.js';
import ImageUpload from '../Image/ImageUpload.js';
import DeliveryCompanyForm from '../Onboarding/DeliveryCompanyForm.js';
import getDeliveryCompany from '../../assets/js/getDeliveryCompany.js';
import Loading from '../../assets/js/loading.js';

class Company extends Component {
  INIT = {
    buttonValue: 'Update Company',
    changeButtonValue: 'Change Image'
  };

  constructor(props) {
    super(props);
    this.state = this.INIT;
  }

  static propTypes = {
    deliveryCompany: PropTypes.object,
    deliveryCompanyUpdate: PropTypes.func,
    user: PropTypes.object,
    store: PropTypes.object
  };

  submit = ({
    _id, name, email, phone, states
  }) => {
    this.setState({
      buttonValue: <Loading />
    });

    const company = {
      name,
      email,
      phone,
      states: states.map((state) => state.value)
    };

    this.props
      .deliveryCompanyUpdate(_id, company)
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
      .finally(() => this.setState(this.INIT));
  };

  handleImageChange = (fd) => {
    this.setState({
      changeButtonValue: <Loading />
    });

    this.props
      .deliveryCompanyUpdate(this.props.deliveryCompany._id, fd)
      .then((response) => toast.success(
        (response && response.value && response.value.data && response.value.data.message)
            || (response && response.statusText)
            || 'Success'
      ))
      .catch((err) => {
        this.setState(this.INIT);

        toast.error(
          (err && err.response && err.response.data && err.response.data.message)
            || (err
              && err.response
              && err.response.data
              && err.response.data.message
              && err.response.data.message.name)
            || (err && err.response && err.response.statusText)
            || 'Network error'
        );
      })
      .finally(() => this.setState(this.INIT));
  };

  render = () => (
    <div className="tab-content" id="profileTabContent">
      <div className="px-4 mb-4 text-center text-lg-left form-container" id="formContainer">
        <div
          className="float-lg-left text-left rounded-circle position-relative"
          style={{
            width: '100px',
            height: '100px',
            overflow: 'hidden',
            margin: '0 auto'
          }}
        >
          <div
            className="position-absolute w-100 text-center"
            style={{
              bottom: '0'
            }}
          >
            <ImageUpload
              buttonValue={this.state.changeButtonValue}
              object={this.props.deliveryCompany}
              onImageChange={this.handleImageChange}
              type="deliveryCompany"
            />
          </div>
        </div>
        <div className="pt-lg-4 mt-1 ml-3 float-lg-left">
          <p className="mb-0">
            <strong>{this.props.deliveryCompany && this.props.deliveryCompany.name}</strong> <br />
            {this.props.deliveryCompany && this.props.deliveryCompany.email}
          </p>
        </div>
        <div className=" clear"></div>

        <div className="form-container-holder py-3">
          <DeliveryCompanyForm
            buttonValue={this.state.buttonValue}
            onSubmit={this.submit}
            type="user"
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ deliveryCompany, user }) => ({
  deliveryCompany: getDeliveryCompany(user, deliveryCompany)
});

export default connect(mapStateToProps, { deliveryCompanyUpdate })(Company);
