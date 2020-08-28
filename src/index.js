// Module imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';

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
if (process.env.NODE_ENV === 'production') {
  serviceWorker.unregister();
}
