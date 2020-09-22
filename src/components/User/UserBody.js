/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { faStream } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import $ from 'jquery';

// Component imports
import Analytics from './Analytics/Analytics.js';
import Transactions from './Transactions/Transactions.js';
import Cart from './Cart.js';
import Notifications from './Notifications/Notifications.js';
import Orders from './Orders/Orders.js';
import Products from './Products/Products.js';
import Profile from './Profile/Profile.js';
import Saved from './Saved.js';
import Store from './Store/Store.js';
import Tickets from './Tickets/Tickets.js';
import Image from '../Image/Image.js';
import ProductForm from '../ProductList/ProductDisplay/ProductForm.js';
import Deliveries from './Deliveries.js';
import Packages from './Packages/Packages.js';
import Company from './Company.js';
import PackageForm from './Packages/PackageForm.js';
import TicketForm from './Tickets/TicketForm.js';

// Action imports
import { productAdd, productsOneSelected } from '../../redux/actions/products.js';
import { deliveryPackagesAdd } from '../../redux/actions/deliveryPackages.js';
import { userUpdate } from '../../redux/actions/users.js';
import { ticketAdd, ticketsOneSelected } from '../../redux/actions/tickets.js';
import { ordersMultipleSelected } from '../../redux/actions/orders.js';

// Asset imports
import ifSeller from '../../assets/js/ifSeller.js';
import getDeliveryCompany from '../../assets/js/getDeliveryCompany.js';
import newItems from '../../assets/js/newItems.js';
import Loading from '../../assets/js/loading.js';
import Plus from '../Plus/Plus.js';

const Components = {
  Analytics,
  Transactions,
  Cart,
  Company,
  Deliveries,
  Notifications,
  Orders,
  Packages,
  Products,
  Profile,
  Saved,
  Store,
  Tickets
};
class UserBody extends Component {
  INIT = {
    buttonProduct: 'Upload',
    buttonPackage: 'Add',
    buttonTicket: 'Add'
  };

  constructor(props) {
    super(props);

    this.state = this.INIT;
  }

  static propTypes = {
    deliveryCompany: PropTypes.object,
    deliveryPackagesAdd: PropTypes.func,
    list: PropTypes.array,
    orders: PropTypes.array,
    ordersMultipleSelected: PropTypes.func,
    productAdd: PropTypes.func,
    productsOneSelected: PropTypes.func,
    shops: PropTypes.array,
    store: PropTypes.object,
    ticketAdd: PropTypes.func,
    tickets: PropTypes.array,
    ticketsOneSelected: PropTypes.func,
    user: PropTypes.object,
    users: PropTypes.array,
    userUpdate: PropTypes.func,
    pathname: PropTypes.string
  };

  productSubmit = (productData) => {
    this.setState({
      buttonProduct: <Loading />
    });

    if (!productData.get('shop')) productData.append('shop', this.props.store && this.props.store._id);
    if (!productData.get('isBatch')) productData.append('isBatch', this.props.user && this.props.user.type === 'UA');
    productData.delete('_id');

    this.props
      .productAdd(productData)
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

  packageSubmit = (packageData) => {
    this.setState({
      buttonPackage: <Loading />
    });

    const {
      method,
      from,
      to,
      duration,
      maxDeliverySize,
      cost,
      pickupStationName,
      pickupStationAddress,
      pickupStationState
    } = packageData;

    const deliveryPackage = {
      method,
      from,
      to,
      duration,
      maxDeliverySize,
      cost,
      pickupStationName,
      pickupStationAddress,
      pickupStationState,
      pickupStation: {
        name: packageData.pickupStationName,
        address: packageData.pickupStationAddress,
        state: packageData.pickupStationState
      },
      deliveryCompany: this.props.deliveryCompany && this.props.deliveryCompany._id
    };

    if (!pickupStationName) delete deliveryPackage.pickupStation;
    delete deliveryPackage.pickupStationName;
    delete deliveryPackage.pickupStationAddress;
    delete deliveryPackage.pickupStationState;

    this.props
      .deliveryPackagesAdd(deliveryPackage)
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

  ticketSubmit = (ticketData) => {
    this.setState({
      buttonTicket: <Loading />
    });

    const _id = this.props.user && this.props.user._id;

    if (!ticketData.get('owner')) ticketData.append('owner', _id);
    ticketData.delete('_id');

    return this.props
      .ticketAdd(ticketData)
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
      });
  };

  handleNewItems = (name) => ({
    product: this.props.productsOneSelected({}),
    ticket: this.props.ticketsOneSelected({}),
    order: this.props.ordersMultipleSelected([])
  }[name]);

  productUploadRenderer = (user) => {
    const type = user && user.type;
    let all = '';

    if (ifSeller(type)) {
      all = (
        <div
          className="modal fade"
          id="productModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="productModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content" id="formContainer">
              <div className="modal-body form-container-holder">
                <ProductForm
                  action="create"
                  buttonValue={this.state.buttonProduct}
                  onSubmit={this.productSubmit}
                  user={this.props.user}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'UDC') {
      all = (
        <div
          className="modal fade"
          id="packageModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="packageModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content" id="formContainer">
              <div className="modal-body form-container-holder">
                <PackageForm
                  action="create"
                  buttonValue={this.state.buttonPackage}
                  onSubmit={this.packageSubmit}
                  user={this.props.user}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        {all}
        <div
          className="modal fade"
          id="ticketModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="ticketModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content" id="formContainer">
              <div className="modal-body form-container-holder">
                <TicketForm
                  action="create"
                  buttonValue={this.state.buttonTicket}
                  onSubmit={this.ticketSubmit}
                  user={this.props.user}
                />{' '}
              </div>
            </div>
          </div>
        </div>
        <Plus handleNewItems={this.handleNewItems} newItems={newItems} user={this.props.user} />
      </>
    );
  };

  renderBodyComponents = (list) => list.map((listItem) => {
    const { Title } = listItem;
    const TagName = Components[Title];

    return (
        <div
          className={`h-100 tab-pane fade user-section px-0 ${
            this.props.pathname.includes(Title.toLowerCase()) ? 'show active' : ''
          }`}
          id={`pills-${Title}`}
          role="tabpanel"
          aria-labelledby={`pills-${Title}-tab`}
          key={`user-section-${Title}`}
        >
          <TagName user={this.props.user} store={this.props.store} />
        </div>
    );
  });

  renderHeader = ({ image }, firstName) => (
    <div className="p-3 position-fixed bg-white shadow-sm d-flex d-md-block" id="dashboardHeader">
      <button className="btn btn-white float-left border-0 d-md-none" id="dashboardMenuToggle">
        <span>
          <FontAwesomeIcon icon={faStream} />
        </span>
      </button>
      <div className="flex-grow-1 d-md-none pt-2 text-center">
        <Link className="no-link lead font-weight-bolder" to="/">
          benshada
        </Link>
      </div>
      <div className="user float-right">
        <div className="img-holder img-holder-user float-left">
          <Image type="user" image={image} size={3} />
        </div>
        <p className="pt-5 ml-2 d-none d-md-inline position-relative" style={{ top: '10px' }}>
          Hello, {firstName}
        </p>
      </div>
      <div className="clear"></div>
    </div>
  );

  render() {
    const { user, list } = this.props;
    const name = (user && user.name) || '';
    const firstName = name.includes(' ') ? name.split(' ')[0] : name;

    return (
      <>
        <div
          className="col-12 p-0 col-md-9 offset-md-3 col-lg-10 offset-lg-2 bg-light-benshada position-relative tab-content"
          id="pills-tabContent"
        >
          {this.renderHeader(user, firstName)}
          {this.renderBodyComponents(list)}
        </div>
        {this.productUploadRenderer(user)}
      </>
    );
  }
}

const mapStateToProps = ({
  user, deliveryCompany, ticket, store, order
}) => ({
  deliveryCompany: getDeliveryCompany(user, deliveryCompany),
  tickets: ticket.all,
  users: user.all,
  shops: store.all,
  orders: order.all
});

export default connect(mapStateToProps, {
  userUpdate,
  productAdd,
  deliveryPackagesAdd,
  productsOneSelected,
  ticketAdd,
  ordersMultipleSelected,
  ticketsOneSelected
})(UserBody);
