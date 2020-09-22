/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import $ from 'jquery';
import TypeForm from './TypeForm.js';
import Auth from '../Auth/Auth.js';

import { userUpdate } from '../../redux/actions/users.js';
import { shopAdd } from '../../redux/actions/stores.js';
import StoreForm from '../StoreList/StoreDisplay/StoreForm.js';
import UserForm from './UserForm.js';
import DeliveryCompanyForm from './DeliveryCompanyForm.js';
import { deliveryCompaniesAdd } from '../../redux/actions/deliveryCompanies.js';

import types from '../../assets/data/types.json';
import getDeliveryCompany from '../../assets/js/getDeliveryCompany.js';
import Loading from '../../assets/js/loading.js';

class Onboarding extends Component {
  INIT = {
    typeButton: 'Next',
    storeButton: 'Create',
    userButton: 'Done',
    deliveryCompanyButton: 'Submit'
  };

  constructor(props) {
    super(props);

    this.state = this.INIT;
  }

  static propTypes = {
    deliveryCompany: PropTypes.object,
    deliveryCompaniesAdd: PropTypes.func,
    user: PropTypes.object,
    userUpdate: PropTypes.func,
    shopAdd: PropTypes.func
  };

  typeSubmit = (typeData) => {
    this.setState({
      typeButton: (
        <Loading />
      )
    });

    this.props
      .userUpdate(this.props.user.email, typeData)
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

  storeSubmit = (storeData) => {
    this.setState({
      storeButton: (
        <Loading />
      )
    });

    if (storeData.CACNumber) {
      storeData.isRegisteredBusiness = true;
    }

    storeData.user = this.props.user._id;

    this.props
      .shopAdd(storeData)
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

  userSubmit = (userData) => {
    this.setState({
      userButton: (
        <Loading />
      )
    });

    if (userData.categories.length < 1) {
      this.setState(this.INIT);
      return toast.warn('Do select at least one preferred category');
    }

    Object.keys(userData).forEach((key) => {
      if (
        userData[key] === undefined
        || (userData[key] && userData[key].length) < 1
        || key === 'createdAt'
        || key === 'updatedAt'
        || key === '_id'
      ) {
        delete userData[key];
      }
    });

    const user = { ...userData, categories: userData.categories.map(({ value }) => value) };

    return this.props
      .userUpdate(this.props.user.email, user)
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

  deliveryCompanySubmit = ({
    name, email, phone, states
  }) => {
    this.setState({
      deliveryCompanyButton: (
        <Loading />
      )
    });

    const company = {
      name,
      email,
      phone,
      states: states.map((state) => state.value),
      contactPerson: this.props.user && this.props.user._id
    };

    return this.props
      .deliveryCompaniesAdd(company)
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

  renderHelp = () => {
    const { user, deliveryCompany } = this.props;

    if (!types.includes(user && user.type)) {
      return <TypeForm buttonValue={this.state.typeButton} onSubmit={this.typeSubmit} />;
    }

    if (
      ((user && user.type === 'UA') || (user && user.type === 'UB'))
      && ((user && user.shops) || []).filter(
        (shop) => shop !== null && shop !== undefined && shop !== ''
      ).length < 1
    ) {
      return (
        <StoreForm type="create" buttonValue={this.state.storeButton} onSubmit={this.storeSubmit} />
      );
    }

    if (
      user
      && user.type === 'UC'
      && ((user && user.categories) || []).filter(
        (cat) => cat !== null && cat !== undefined && cat !== ''
      ).length < 1
    ) {
      return <UserForm buttonValue={this.state.userButton} onSubmit={this.userSubmit} />;
    }

    if (user && user.type === 'UDC') {
      if (
        (deliveryCompany
          && deliveryCompany.contactPerson
          && deliveryCompany.contactPerson.email) !== (user && user.email)
      ) {
        return (
          <DeliveryCompanyForm
            buttonValue={this.state.deliveryCompanyButton}
            onSubmit={this.deliveryCompanySubmit}
          />
        );
      }
    }

    return false;
  };

  render = () => <Auth type="onboarding">{this.renderHelp()}</Auth>;
}

const mapStateToProps = ({ user, deliveryCompany }) => ({
  deliveryCompany: getDeliveryCompany(user, deliveryCompany)
});

export default connect(mapStateToProps, {
  userUpdate,
  shopAdd,
  deliveryCompaniesAdd
})(Onboarding);
