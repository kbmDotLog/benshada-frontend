/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import $ from 'jquery';
import StoreForm from '../../StoreList/StoreDisplay/StoreForm.js';
import { shopUpdate } from '../../../redux/actions/stores.js';
import ImageUpload from '../../Image/ImageUpload.js';
import Loading from '../../../assets/js/loading.js';

class Store extends Component {
  INIT = {
    storeButtonValue: 'Update Store',
    changeButtonValue: 'Change'
  };

  constructor(props) {
    super(props);
    this.state = this.INIT;
  }

  static propTypes = {
    shopUpdate: PropTypes.func,
    user: PropTypes.object,
    store: PropTypes.object
  };

  submit = ({
    _id, name, description, address, state, CACNumber, phone
  }) => {
    this.setState({
      storeButtonValue: <Loading />
    });

    const store = {
      name,
      description,
      address,
      state,
      CACNumber,
      phone
    };

    if (CACNumber) {
      store.isRegisteredBusiness = true;
    }

    Object.keys(store).forEach((key) => {
      if (store[key] === undefined) {
        delete store[key];
      }
    });

    this.props
      .shopUpdate(_id, store)
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

  handleImageChange = (fd) => {
    this.setState({
      changeButtonValue: <Loading />
    });

    this.props
      .shopUpdate(this.props.store._id, fd)
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
              object={this.props.store}
              onImageChange={this.handleImageChange}
              type="store"
            />
          </div>
        </div>
        <div className="pt-lg-4 mt-1 ml-3 float-lg-left">
          <p className="mb-0">
            <strong>{this.props.store && this.props.store.name}</strong> <br />
            {this.props.store && this.props.store.description}
          </p>
        </div>
        <div className=" clear"></div>

        <div className="form-container-holder py-3">
          <StoreForm
            type="user"
            userStore={this.props.store}
            buttonValue={this.state.storeButtonValue}
            onSubmit={this.submit}
          />
        </div>
      </div>
    </div>
  );
}

export default connect(null, { shopUpdate })(Store);
