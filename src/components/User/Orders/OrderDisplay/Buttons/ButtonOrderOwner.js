/* eslint-disable no-underscore-dangle */
// Module imports
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import $ from 'jquery';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rave from 'react-flutterwave-rave';

// Component imports
import Image from '../../../../Image/Image.js';
import Price from '../../../../ProductList/ProductDisplay/Price.js';
import PackageDisplay from '../../../Packages/PackageDisplay/PackageDisplay.js';

// Action imports
import { orderDelete, ordersMultipleSelected } from '../../../../../redux/actions/orders.js';
import { transactionVerify } from '../../../../../redux/actions/transactions.js';

class ButtonOrderOwner extends React.Component {
  INIT = {
    btnCancelVal: 'Cancel',
    link: undefined
  };

  constructor(props) {
    super(props);
    this.state = this.INIT;
  }

  static propTypes = {
    deliveryPackages: PropTypes.array,
    order: PropTypes.object,
    orderDelete: PropTypes.func,
    ordersMultipleSelected: PropTypes.func,
    products: PropTypes.array,
    selectedOrders: PropTypes.array,
    transactionVerify: PropTypes.func,
    user: PropTypes.object
  };

  renderPaymentMethod = (order, deliveryCost) => (order && order.status === 'paid' ? (
      <>
        <h5>Payment Method</h5>
        <p>Online transaction</p>
        <h5 className="mt-3">Payment Details</h5>
        <p>
          Items total: <Price price={(order.totalPrice) - deliveryCost} />
        </p>
        <p>
          Delivery fees: <Price price={deliveryCost} />
        </p>
      </>
  ) : (
      <p>Unpaid</p>
  ));

  callback = (res, order, transactionData) => this.props
    .transactionVerify(res, order, transactionData)
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

  render = () => {
    const {
      order, selectedOrders, user, products, deliveryPackages
    } = this.props;
    const details = selectedOrders[0] && selectedOrders[0].details;
    const status = selectedOrders[0] && selectedOrders[0].status;
    const productID = selectedOrders[0] && selectedOrders[0].product;
    const product = products.filter((item) => item && item._id === productID)[0];
    const totalPrice = selectedOrders[0] && selectedOrders[0].totalPrice;
    const deliveryPackageID = selectedOrders[0] && selectedOrders[0].deliveryPackage;
    const deliveryPackage = (deliveryPackages || []).filter(
      (item) => item && item._id === deliveryPackageID
    )[0];
    const orderNumber = selectedOrders[0] && selectedOrders[0].orderNumber;
    const count = selectedOrders[0] && selectedOrders[0].count;
    const createdAt = selectedOrders[0] && selectedOrders[0].createdAt;
    const d = new Date(createdAt);

    return this.state.link ? (
      window.location.replace(this.state.link)
    ) : (
      <>
        {order && order.status === 'unpaid' ? (
          <>
            <Rave
              amount={((order.totalPrice) || '').toString()}
              callback={(res) => this.callback(res, order, {
                amount: order && order.totalPrice,
                trxnRef: order && order.orderNumber,
                user: user && user._id,
                type: 'order',
                description: `Paid for ${order && order.count} of ${product && product.name}`
              })
              }
              class="btn btn-primary-benshada"
              custom_title="Pay for your order"
              custom_description={`OrderNo:  ${order.orderNumber}`}
              custom_logo={`${window.location.origin}/icon.png`}
              customer_email={user && user.email}
              customer_firstname={((user && user.name) || '').split(' ')[0]}
              customer_lastname={((user && user.name) || '').split(' ')[1]}
              customer_phone={user && user.phone}
              metadata={[{ metaname: 'Product', metavalue: order.product }]}
              // onclose={() => console.log('Payment closed')}
              pay_button_text="Pay With FlutterWave"
              ravePubKey={process.env.REACT_APP_RAVE_TEST_PUBKEY}
              redirect_url=""
              txref={((order.orderNumber) || '').toString()}
            />
            <span
              className="mx-2 px-2 pointer"
              data-toggle="modal"
              data-target="#orderDelete"
              onClick={() => this.props.ordersMultipleSelected([order])}
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
            <div
              className="modal text-secondary fade"
              id="orderDelete"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="modelTitleId"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header border-0">
                    <h5 className="modal-title">Cancel Order</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    Are you sure you want to cancel order <strong>{orderNumber}</strong>?
                  </div>
                  <div className="modal-footer border-0">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">
                      Go back
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => this.props
                        .orderDelete(selectedOrders[0])
                        .then((response) => toast.success(
                          (response
                                && response.value
                                && response.value.data
                                && response.value.data.message)
                                || (response && response.statusText)
                                || 'Success'
                        ))
                        .catch((err) => toast.error(
                          (err
                                && err.response
                                && err.response.data
                                && err.response.data.message)
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
                        })
                      }
                    >
                      {this.state.btnCancelVal}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ''
        )}

        <span
          className="mx-2 px-2 pointer"
          data-toggle="modal"
          data-target="#orderView"
          onClick={() => this.props.ordersMultipleSelected([order])}
        >
          <FontAwesomeIcon icon={faEye} />
        </span>

        {/* Modal */}
        <div
          className="modal text-secondary fade"
          id="orderView"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="container">
                  <hgroup>
                    <h4>Order No: {orderNumber}</h4>
                    <h2>
                      Total: <Price price={totalPrice} />
                    </h2>
                    <h5>Status: {status}</h5>
                  </hgroup>
                  <div className="text-left">
                    <p>Placed on: {d.toLocaleString()}</p>

                    <p className="text-uppercase mt-3">Product</p>
                    <div className="d-flex">
                      <Image
                        name={product && product.name}
                        image={product && product.image}
                        type="product"
                        size={6}
                        id={product && product._id}
                      />
                      <div className="flex-grow-1 pl-2">
                        <p>{product && product.name}</p>
                        <p className="font-weight-bold">QTY: {count}</p>
                        <Price
                          price={(product && product.price) * count}
                          discount={product && product.discountPercentage}
                        />
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-12 col-lg-6 border border-secondary py-3">
                        <small className="text-uppercase mb-4 d-block">payment information</small>
                        {this.renderPaymentMethod(
                          selectedOrders[0],
                          deliveryPackage && deliveryPackage.cost
                        )}
                      </div>
                      <div className="col-12 col-lg-6 border border-secondary py-3">
                        <small className="text-uppercase mb-4 d-block">delivery information</small>
                        <h5>Delivery Package</h5>
                        <PackageDisplay
                          deliveryPackage={deliveryPackage}
                          onPackageSelect={() => {}}
                        />

                        <h5 className="mt-3">Shipping Address</h5>
                        <p>{details && details.name}</p>
                        <p>
                          {details && details.address},{details && details.state}
                        </p>
                        <p>{details && details.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = ({ order, product, deliveryPackage }) => ({
  selectedOrders: order.selected,
  products: product.all,
  deliveryPackages: deliveryPackage.all
});

export default connect(mapStateToProps, { orderDelete, ordersMultipleSelected, transactionVerify })(
  ButtonOrderOwner
);
