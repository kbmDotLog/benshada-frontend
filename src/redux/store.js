import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { save, load } from 'redux-localstorage-simple';
import thunk from 'redux-thunk';
import multi from 'redux-multi';
import reducers from './reducers/rootReducer.js';

const createStoreWithMiddleware = composeWithDevTools(
  applyMiddleware(promiseMiddleware, multi, thunk, save(['auth', 'user', 'product', 'store']))
)(createStore);

const store = createStoreWithMiddleware(reducers, load());

export default store;
