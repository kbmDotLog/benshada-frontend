// Module imports
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { save, load } from 'redux-localstorage-simple';
import thunk from 'redux-thunk';
import multi from 'redux-multi';

// Root reducer
import reducers from './reducers/rootReducer.js';

// Middleware
const createStoreWithMiddleware = composeWithDevTools(
  applyMiddleware(promiseMiddleware, multi, thunk, save(['auth']))
)(createStore);

// Create store with middleware
const store = createStoreWithMiddleware(reducers, load());

// Export store
export default store;
