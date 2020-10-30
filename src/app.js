// Module Imports
import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Component Imports
import Home from './components/Home/Home.js';
import Catalog from './components/Catalog/Catalog.js';
import Login from './components/Auth/Login/Login.js';
import Logout from './components/Auth/Logout/Logout.js';
import Register from './components/Auth/Register/Register.js';
import User from './components/User/User.js';
import Onboarding from './components/Onboarding/Onboarding.js';
import Checkout from './components/Checkout/Checkout.js';
import ProductDomain from './components/ProductList/ProductDomain/ProductDomain.js';
import StoreDomain from './components/StoreList/StoreDomain/StoreDomain.js';

// Asset imports
import './assets/css/app.css';

// Action imports
import { ordersAll } from './redux/actions/orders.js';
import { productsAll } from './redux/actions/products.js';
import { shopsAll } from './redux/actions/stores.js';
import { testimonialsAll } from './redux/actions/testimonials.js';
import { subscriptionsAll } from './redux/actions/subscriptions.js';
import { usersAll, userOne } from './redux/actions/users.js';
import { notificationsAll } from './redux/actions/notifications.js';
import { transactionsAll } from './redux/actions/transactions.js';
import { ticketsAll } from './redux/actions/tickets.js';
import { deliveryCompaniesAll } from './redux/actions/deliveryCompanies.js';
import { deliveryPackagesAll } from './redux/actions/deliveryPackages.js';

// Start Component
class App extends React.Component {
  static propTypes = {
    deliveryCompaniesAll: PropTypes.func,
    email: PropTypes.string,
    isSignedIn: PropTypes.bool,
    loading: PropTypes.bool,
    notificationsAll: PropTypes.func,
    orders: PropTypes.array,
    ordersAll: PropTypes.func,
    products: PropTypes.array,
    productsAll: PropTypes.func,
    shopsAll: PropTypes.func,
    stores: PropTypes.array,
    subscriptionsAll: PropTypes.func,
    testimonials: PropTypes.array,
    testimonialsAll: PropTypes.func,
    ticketsAll: PropTypes.func,
    transactionsAll: PropTypes.func,
    user: PropTypes.object,
    users: PropTypes.array,
    userOne: PropTypes.func,
    usersAll: PropTypes.func
  };

  componentDidMount = () => {
    this.props.productsAll();
    this.props.shopsAll();
    this.props.testimonialsAll();

    if (this.props.isSignedIn) {
      const { email } = this.props;

      this.props.ordersAll();
      this.props.notificationsAll();
      this.props.transactionsAll();
      this.props.ticketsAll();

      this.props
        .userOne(email)
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
        .finally(() => this.setState(this.INIT));
    } else {
      this.props.usersAll(true);
      this.props.deliveryCompaniesAll(true);
      this.props.subscriptionsAll(true);
    }
  };

  render = () => {
    const {
      isSignedIn,
      loading,
      products,
      stores,
      testimonials,
      user,
      users,
      orders
    } = this.props;

    return loading ? (
      <div className="d-flex justify-content-center align-items-center text-center text-white bg-primary-benshada h-100">
        <div>
          <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    ) : (
      <>
        <div id="app" className="h-100">
          <Router basename="/">
            <Switch>
              <Route path="/catalog" component={Catalog} />
              <Route
                path="/"
                component={(component) => (
                  <Home
                    {...component}
                    isSignedIn={isSignedIn}
                    products={products}
                    stores={stores}
                    orders={orders}
                    testimonials={testimonials}
                    user={user}
                  />
                )}
                exact
              />
              <Route
                path="/checkout"
                component={(component) => (
                  <Checkout {...component} user={user} />
                )}
              />
              <Route path="/login" component={Login} exact />
              <Route path="/logout" component={Logout} exact />
              <Route
                path="/onboarding"
                component={(component) => (
                  <Onboarding {...component} user={user} />
                )}
                exact
              />
              <Route path="/products" render={() => <ProductDomain />} />
              <Route
                path="/register"
                component={(component) => (
                  <Register {...component} users={users} />
                )}
                exact
              />
              <Route
                path="/stores"
                component={(component) => (
                  <StoreDomain
                    {...component}
                    user={user}
                    products={products}
                    stores={stores}
                    orders={orders}
                  />
                )}
              />
              <Route
                path="/user"
                component={(component) => <User {...component} user={user} />}
              />
            </Switch>
          </Router>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  };
}
// End Component

const mapStateToProps = ({
  auth,
  user,
  product,
  store,
  testimonial,
  loading,
  order
}) => ({
  isSignedIn: auth && auth.isSignedIn,
  loading: loading && loading.pending,
  orders: order.all,
  user: user.selected,
  users: user.all,
  products: product.all,
  stores: store.all,
  testimonials: testimonial.all,
  email: auth && auth.email
});

// Export component as React-functional-Component
export default connect(mapStateToProps, {
  deliveryCompaniesAll,
  deliveryPackagesAll,
  notificationsAll,
  ordersAll,
  productsAll,
  shopsAll,
  testimonialsAll,
  subscriptionsAll,
  userOne,
  usersAll,
  ticketsAll,
  transactionsAll
})(App);
