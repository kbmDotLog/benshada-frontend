/** Module imports */
import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/** Component imports */
import Home from 'components/Home/Home';
import Catalog from 'components/Catalog/Catalog';
import Login from 'components/Auth/Login/Login';
import Logout from 'components/Auth/Logout/Logout';
import Register from 'components/Auth/Register/Register';
import User from 'components/User/User';
import Onboarding from 'components/Onboarding/Onboarding';
import Checkout from 'components/Checkout/Checkout';
import ProductDomain from 'components/ProductList/ProductDomain/ProductDomain';
import StoreDomain from 'components/StoreList/StoreDomain/StoreDomain';

/** Asset imports */
import 'assets/css/app.css';

/** Action impports */
import { loadOut } from 'redux/actions/auth';

/**
 * Displays the entire app
 * @constructor
 */
class App extends React.Component {
  /** Component propTypes */
  static propTypes = {
    loadOut: PropTypes.func
  };

  /**
   * Runs after component has mounted
   */
  componentDidMount = () => this.props.loadOut();

  /**
   * Returns App UI
   * @return {object} The UI DOM object
   */
  render = () => (
    <>
      <div id="app" className="h-100">
        <Router basename="/">
          <Switch>
            <Route path="/catalog" component={Catalog} />
            <Route path="/" component={Home} exact />
            <Route path="/checkout" component={Checkout} />
            <Route path="/login" component={Login} exact />
            <Route path="/logout" component={Logout} exact />
            <Route path="/onboarding" component={Onboarding} exact />
            <Route path="/products" component={ProductDomain} />
            <Route path="/register" component={Register} exact />
            <Route path="/stores" component={StoreDomain} />
            <Route path="/user" component={User} />
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
}

/** Export component */
export default connect(null, {
  loadOut
})(App);
