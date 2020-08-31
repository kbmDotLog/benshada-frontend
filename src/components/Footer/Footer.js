import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faPinterest,
  faInstagram,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { subscriptionAdd } from '../../redux/actions/subscriptions.js';
import Loading from '../../assets/js/loading.js';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subscriptionEmail: '',
      buttonValue: <FontAwesomeIcon className="text-white pointer" icon={faPaperPlane} />
    };
  }

  static propTypes = {
    subscriptionAdd: PropTypes.func,
    subscriptions: PropTypes.array
  };

  submit = (subEmail) => {
    this.setState({
      buttonValue: <Loading />
    });

    if (!subEmail) toast.error('What email do you want to subscribe for?');

    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(subEmail)) {
      this.setState({
        buttonValue: <FontAwesomeIcon className="text-white pointer" icon={faPaperPlane} />
      });
      return toast.error('Provide a valid email address');
    }

    if (this.props.subscriptions.filter(({ email }) => email === subEmail).length > 0) {
      this.setState({
        buttonValue: <FontAwesomeIcon className="text-white pointer" icon={faPaperPlane} />
      });
      return toast.warn('You have already subscribed');
    }

    this.props
      .subscriptionAdd({ email: subEmail })
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

    return this.setState({
      buttonValue: <FontAwesomeIcon className="text-white pointer" icon={faPaperPlane} />
    });
  };

  render = () => (
    <>
      <footer className="bg-white pt-1 shadow-sm">
        <div className="container">
          <div className="row my-4">
            <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
              <h5 className="mb-3">Contact Info</h5>
              <a href="tel:+2349072340517">
                <p className="mb-1">(+234) 907 - 234 - 0517</p>
              </a>
              <a href="mailto:benshada@gmail.com">
                <p className="mb-1">benshada@gmail.com</p>
              </a>
              <p className="mb-1">68 Sanya Street Aguda Surulere Lagos Nigeria</p>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0 text-capitalize">
              <h5 className="mb-3">Quick Links</h5>
              {/* <Link to="/stores">
                <p className="mb-1">Stores</p>
              </Link> */}
              <Link to="/catalog?a=p">
                <p className="mb-1">Products</p>
              </Link>
              <Link to="/user/cart">
                <p className="mb-1">Cart</p>
              </Link>
              <Link to="/user/saved">
                <p className="mb-1">Saved</p>
              </Link>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
              <h5 className="mb-3">Information</h5>
              <Link to="/about">
                <p className="mb-1">About Us</p>
              </Link>
              <Link
                to={{
                  pathname: '/',
                  hash: '#how-it-works'
                }}
              >
                <p className="mb-1">How It Works</p>
              </Link>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">
              <h5 className="mb-3">Newsletter Subscribe</h5>
              <form
                action=""
                className="form-inline"
                onSubmit={(e) => {
                  e.preventDefault();
                  this.submit(this.state.subscriptionEmail);
                }}
              >
                <div className="input-group flex-grow-1">
                  <input
                    className="form-control border-top-0 border-right-0 border-left-0 rounded-0"
                    type="email"
                    placeholder="example@gmail.com"
                    aria-label="Email"
                    value={this.state.subscriptionEmail}
                    onChange={(e) => this.setState({ subscriptionEmail: e.target.value })}
                    required
                  />
                  <div className="input-group-append">
                    <button
                      className="input-group-text bg-primary-benshada border-0"
                      id="basic-addon2"
                      type="submit"
                    >
                      {this.state.buttonValue}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="border border-left-0 border-right-0 border-bottom-0 border-top-light">
          <div className="container">
            <div className="row py-2">
              <div className="col-12 col-md-6">
                <p className="text-center text-md-left">
                  <span className="font-weight-bolder d-none d-md-inline">Connect with us</span>
                  <a href="https://web.facebook.com/Benshadaplace">
                    <FontAwesomeIcon className="mx-2 ml-4" icon={faFacebookF} />
                  </a>
                  <a href="https://www.twitter.com/Benshadaplace">
                    <FontAwesomeIcon className="mx-2" icon={faTwitter} />
                  </a>
                  <a href="https://www.pinterest.com/Benshada">
                    <FontAwesomeIcon className="mx-2" icon={faPinterest} />
                  </a>
                  <a href="https://www.instagram.com/Benshadaplace">
                    <FontAwesomeIcon className="mx-2" icon={faInstagram} />
                  </a>
                  <a href="https://wa.me/2349072340517">
                    <FontAwesomeIcon className="mx-2" icon={faWhatsapp} />
                  </a>
                </p>
              </div>
              <div className="col-12 col-md-6">
                <p className="text-center text-md-right">
                  Copyright &copy; <Link to="/">Benshada Place</Link>. All rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

const mapStateToProps = ({ subscription }) => ({ subscriptions: subscription.all });

export default connect(mapStateToProps, { subscriptionAdd })(Footer);
