import api from '../api/api.js';
import {
  SUBSCRIPTIONS_ALL,
  SUBSCRIPTION_ADD,
  SUBSCRIPTION_REMOVE
} from './types/subscriptionTypes.js';

export const subscriptionsAll = (isAuthed) => () => {
  const headers = isAuthed
    ? {
      Authorization: `Bearer ${process.env.REACT_APP_DEF_AUTH}`
    }
    : {};

  console.log('Running subscriptions with these headers...', headers);

  return {
    type: SUBSCRIPTIONS_ALL,
    payload: api.get('/subscriptions', {
      headers
    })
  };
};

export const subscriptionAdd = (userData) => (dispatch) => {
  const response = dispatch({
    type: SUBSCRIPTION_ADD,
    payload: api.post('/subscriptions', userData)
  });

  return response.then(() => dispatch(subscriptionsAll()));
};

export const subscriptionRemove = (userData) => (dispatch) => {
  const response = dispatch({
    type: SUBSCRIPTION_REMOVE,
    payload: api.delete(`/subscriptions/${userData.email}`, userData)
  });

  return response.then(() => dispatch(subscriptionsAll()));
};
