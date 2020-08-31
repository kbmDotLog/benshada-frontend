import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import ProfileForm from './ProfileForm.js';
import { userUpdate, userChangePassword } from '../../../redux/actions/users.js';
import PasswordForm from './PasswordForm.js';
import ImageUpload from '../../Image/ImageUpload.js';
import Loading from '../../../assets/js/loading.js';

class Profile extends Component {
  INIT = {
    profileButtonValue: 'Update Profile',
    passwordButtonValue: 'Change Password',
    changeButtonValue: 'Change'
  };

  constructor(props) {
    super(props);
    this.state = this.INIT;
  }

  static propTypes = {
    user: PropTypes.object,
    store: PropTypes.object,
    userUpdate: PropTypes.func,
    userChangePassword: PropTypes.func
  };

  submitProfile = (profileData) => {
    this.setState({
      profileButtonValue: <Loading />
    });

    const {
      firstName, familyName, phone, address, state, categories
    } = profileData;

    const userData = {
      firstName,
      familyName,
      phone,
      address,
      state,
      categories: categories.map(({ value }) => value)
    };

    const user = {
      ...userData,
      name: `${profileData.firstName} ${profileData.familyName}`
    };
    delete user.firstName;
    delete user.familyName;

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
      .finally(() => this.setState(this.INIT));
  };

  submitPassword = (passwordData) => {
    this.setState({
      passwordButtonValue: <Loading />
    });

    const data = { ...passwordData, email: this.props.user && this.props.user.email };

    return passwordData.oldPassword === passwordData.password
      ? (toast.warn('Your new password should  be different from your old password'),
      this.setState(this.INIT))
      : this.props
        .userChangePassword(data)
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
      .userUpdate(this.props.user.email, fd)
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

  render = () => {
    const { name, email } = this.props.user;

    return (
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
                object={this.props.user}
                onImageChange={this.handleImageChange}
                type="user"
              />
            </div>
          </div>
          <div className="pt-lg-4 mt-1 ml-3 float-lg-left">
            <p className="mb-0">
              <strong>{name}</strong> <br />
              {email}
            </p>
          </div>
          <div className=" clear"></div>

          <div className="form-container-holder">
            <ProfileForm
              user={this.props.user}
              buttonValue={this.state.profileButtonValue}
              onSubmit={this.submitProfile}
            />
          </div>

          <h4 className="mt-5">Change Password</h4>
          <div className="form-container-holder">
            <PasswordForm
              buttonValue={this.state.passwordButtonValue}
              onSubmit={this.submitPassword}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default connect(null, { userUpdate, userChangePassword })(Profile);
