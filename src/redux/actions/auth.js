/* eslint-disable import/no-cycle */
/** API imports */
import api from 'redux/api/api';

/** Type imports */
import { LOGIN, LOGOUT, SIGNUP } from 'redux/actions/types/authTypes';

/** Action imports */
import { userOne } from 'redux/actions/users';
import { productsAll } from 'redux/actions/products';
import { shopsAll } from 'redux/actions/stores';
import { testimonialsAll } from 'redux/actions/testimonials';
import { transactionsAll } from 'redux/actions/transactions';
import { ordersAll } from 'redux/actions/orders';

export const loadOut = () => (dispatch, getState) => {
  const { isSignedIn, email } = getState().auth;

  const actions = [productsAll, shopsAll, testimonialsAll, transactionsAll];

  const completeActions = isSignedIn ? [...actions, ordersAll] : actions;

  if (isSignedIn) {
    const response = dispatch(userOne(email));

    return response.then(() => dispatch(completeActions));
  }

  const response = dispatch(actions);
  return response;
};

/**
 *Login single user
 * @param {object} payload
 */
export const authLogin = (payload) => (dispatch) => {
  const res = dispatch({
    type: LOGIN,
    payload: api.post('/users/login', payload)
  });

  // return res.then(() => dispatch([userOne(payload.email), ordersAll()]));

  return res.then(() => dispatch(loadOut()));
};

/**
 *register single user
 * @param {object} payload
 */
export const authSignup = (payload) => (dispatch) => {
  const response = dispatch({
    type: SIGNUP,
    payload: api.post('/users/signup', payload)
  });

  return response.then(() => dispatch(
    authLogin({
      email: payload.email,
      password: payload.password
    })
  ));
};

/**
 * Logout single user
 */
export const authLogout = () => ({
  type: LOGOUT
});
