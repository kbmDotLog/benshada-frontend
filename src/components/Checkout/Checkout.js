/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { toast } from 'react-toastify';

// Component imports
import HrFr from '../HrFr/HrFr.js';
import Price from '../ProductList/ProductDisplay/Price.js';
import AuthRedirect from '../Auth/AuthRedirect.js';
import AddressForm from './AddressForm.js';
import CheckoutProductList from './CheckoutProductList.js';
import ProductDeliveryMethod from './ProductDeliveryMethod.js';

// Action imports
import { deliveryPackagesOneSelected } from '../../redux/actions/deliveryPackages.js';
import { orderAdd } from '../../redux/actions/orders.js';

// Asset imports
import { genUniqueNumber } from '../../assets/js/prototypes.js';
import Loading from '../../assets/js/loading.js';

// Start Component
class CheckOut extends Component {
  // Initial Value for state
  INIT = { details: {}, btnOrder: 'Place Order', order: [] };

  // Initialize component state
  constructor(props) {
    super(props);
    this.state = this.INIT;
  }

  // Declare propTypes
  static propTypes = {
    user: PropTypes.object,
    isSignedIn: PropTypes.bool,
    orders: PropTypes.array,
    stores: PropTypes.array,
    deliveryPackages: PropTypes.array,
    selectedDeliveryPackage: PropTypes.object,
    deliveryPackagesOneSelected: PropTypes.func,
    orderAdd: PropTypes.func
  };

  // Delivery addresses
  submitAddress = ({
    firstName, familyName, phone, address, state
  }) => this.setState({
    details: {
      name: `${firstName} ${familyName}`,
      phone,
      address,
      state
    }
  });

  renderAddress = () => {
    const {
      name, address, state, phone
    } = this.state.details;

    return name ? (
      <div className="py-4 px-5">
        <p className="font-weight-bold">{name}</p>
        <p>
          {address}, {state}
        </p>
        <p>+{phone}</p>
      </div>
    ) : (
      <div className="form-container-holder" id="formContainerHolder">
        <AddressForm buttonValue="Continue" onSubmit={this.submitAddress} />
      </div>
    );
  };

  componentDidMount = () => {
    const {
      _id, cart, name, address, state, phone
    } = this.props.user;
    const { order } = this.state;
    const details = {
      name,
      address,
      state,
      phone
    };
    const uniqCart = _.uniqBy(cart, '_id');

    for (let i = 0; i < uniqCart.length; i += 1) {
      const product = uniqCart[i];
      const { price, discountPercentage } = product;
      const count = _.countBy(cart, (j) => j._id === product._id).true;

      order.push({
        product,
        user: _id,
        totalPrice: price * (1 - discountPercentage / 100) * count,
        deliveryPackage: null,
        orderNumber: null,
        count,
        details
      });
    }

    this.setState({ details, order });
  };

  orderCreate = (order) => {
    this.setState({
      btnOrder: <Loading />
    });

    const orderNumbers = (this.props.orders || []).map(({ orderNumber }) => orderNumber);
    const finalOrder = order.map((item) => ({
      ...item,
      orderNumber: genUniqueNumber(1073741824, orderNumbers)
    }));

    this.props
      .orderAdd(finalOrder)
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
      .finally(() => this.setState({ btnOrder: this.INIT.btnOrder }));
  };

  updateDeliveryPackage = ({ _id, cost }, productID) => {
    this.setState({
      order: this.state.order.map((item) => (item.product && item.product._id === productID
        ? { ...item, deliveryPackage: _id, totalPrice: item.totalPrice + cost }
        : item))
    });
  };

  renderOrderButton = (l1, l2) => (l1 === l2 ? (
      <div className="col-12">
        <button
          className="btn btn-primary d-block w-100"
          onClick={() => this.orderCreate(this.state.order)}
        >
          {this.state.btnOrder}
        </button>
        <small>This is where you go ahead to make payment</small>
      </div>
  ) : (
    ''
  ));

  render() {
    const {
      user, stores, selectedDeliveryPackage, deliveryPackages
    } = this.props;
    const cart = (user && user.cart) || [];
    const uniqCart = _.uniqBy(user && user.cart, '_id') || [];
    const { details, order } = this.state;
    const combinedTotal = this.state.order
      .map(({ totalPrice }) => totalPrice)
      .reduce((a, b) => a + b, 0);

    return (
      <>
        <AuthRedirect type="checkout" />
        <HrFr>
          <div className="container mt-5 py-5" id="checkOut">
            <div className="row">
              <div className="col-12 col-lg">
                <div className="row">
                  <div
                    className="col-12 bg-sm-white shadow-sm p-0 mb-4 form-container"
                    id="formContainer"
                  >
                    <div className="d-flex text-uppercase font-weight-bold lead border border-secondary border-left-0 border-right-0 border-top-0 p-3">
                      <div className="flex-grow-1 text-left">
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className={`${
                            details && details.address ? 'text-primary-benshada' : 'text-ash'
                          } mr-2`}
                        />
                        1. Address Details
                      </div>
                      {details && details.address ? (
                        <>
                          <div className="flex-grow-1 text-right text-primary-benshada">
                            <span
                              className="pointer"
                              data-toggle="modal"
                              data-target="#addressModal"
                            >
                              Change
                            </span>
                          </div>
                          <div
                            className="modal fade"
                            id="addressModal"
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="modelTitleId"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-lg" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title">Change Address</h5>
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body p-0 form-container" id="formContainer">
                                  <div className="form-container-holder" id="formContainerHolder">
                                    <AddressForm buttonValue="Save" onSubmit={this.submitAddress} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        ''
                      )}{' '}
                    </div>
                    {this.renderAddress()}
                  </div>
                  <div className="col-12 bg-sm-white shadow-sm p-0 mb-4">
                    <div className="text-uppercase font-weight-bold lead border border-secondary border-left-0 border-right-0 border-top-0 p-3">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className={`${
                          selectedDeliveryPackage && selectedDeliveryPackage.cost
                            ? 'text-primary-benshada'
                            : 'text-ash'
                        } mr-2`}
                      />
                      2. Delivery Method
                    </div>
                    <ProductDeliveryMethod
                      details={details}
                      deliveryPackages={deliveryPackages}
                      products={uniqCart}
                      stores={stores}
                      onPackageSelect={this.updateDeliveryPackage}
                      checkoutOrder={order}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4 offset-lg-1">
                <div className="row">
                  <div className="col-12 shadow-sm bg-sm-white border border-light p-0">
                    <div className="lead text-uppercase font-weight-bold border border-secondary border-left-0 border-right-0 border-top-0 p-3">
                      Your Order{cart.length > 1 ? 's' : ''}
                    </div>
                    <CheckoutProductList orders={this.state.order} />
                    <div className="d-flex p-3 font-weight-bold lead">
                      <h4 className="text-left flex-grow-1 text-uppercase">total</h4>
                      <div className="text-right flex-grow-1">
                        <Price price={combinedTotal} />
                      </div>
                    </div>
                  </div>

                  <div className="col-12 text-center my-4 font-weight-bold">
                    <Link to="/user/cart" className="text-uppercase">
                      Modify your cart
                    </Link>
                  </div>
                </div>
              </div>
              {this.renderOrderButton(
                uniqCart.length,
                _.compact(order.map(({ deliveryPackage }) => deliveryPackage)).length
              )}
            </div>
          </div>
        </HrFr>
      </>
    );
  }
}

const mapStateToProps = ({
  cart, auth, store, deliveryPackage, order
}) => ({
  cart,
  isSignedIn: auth.isSignedIn,
  stores: store.all,
  deliveryPackages: deliveryPackage.all,
  selectedDeliveryPackage: deliveryPackage.selected,
  orders: order.all
});

export default connect(mapStateToProps, { deliveryPackagesOneSelected, orderAdd })(CheckOut);
