/** API imports */
import api from 'redux/api/api';

/** Type imports */
import {
  SUBSCRIPTIONS_ALL,
  SUBSCRIPTION_ADD,
  SUBSCRIPTION_REMOVE
} from 'redux/actions/types/subscriptionTypes';

/**
 * Fetch all subscriptions
 */
export const subscriptionsAll = () => ({
  type: SUBSCRIPTIONS_ALL,
  payload: api.get('/subscriptions')
});

/**
 *Add single subscription
 * @param {object} userData
 */
export const subscriptionAdd = (userData) => (dispatch) => {
  const response = dispatch({
    type: SUBSCRIPTION_ADD,
    payload: api.post('/subscriptions', userData)
  });

  return response.then(() => dispatch(subscriptionsAll()));
};

/**
 *Remove single subscription
 * @param {object} userData
 */
export const subscriptionRemove = (userData) => (dispatch) => {
  const response = dispatch({
    type: SUBSCRIPTION_REMOVE,
    payload: api.delete(`/subscriptions/${userData.email}`, userData)
  });

  return response.then(() => dispatch(subscriptionsAll()));
};
