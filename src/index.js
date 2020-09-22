// Module imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Import jQuery, BootStrap && popperJS
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'popper.js/dist/popper.min';

// Redux store
import store from 'redux/store';

// Service worker
import * as serviceWorker from 'serviceWorker';

// App component
import App from 'app';

// DOM render
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

// Load service worker only in production environment
if (!window.location.host.includes('localhost')) {
  serviceWorker.register();
}
