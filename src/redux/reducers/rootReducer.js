// Module imports
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Reducer imports
import authReducer from './authReducer.js';

// Export combined reducers
export default combineReducers({
  auth: authReducer,
  form: formReducer
});
