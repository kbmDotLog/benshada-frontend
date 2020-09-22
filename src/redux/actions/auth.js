/* eslint-disable import/no-cycle */
import api from '../api/api.js';
import { LOGIN, LOGOUT, SIGNUP } from './types/authTypes.js';
import { userOne, usersAll } from './users.js';
import { shopsAll } from './stores.js';
import { notificationsAll } from './notifications.js';

export const authLogin = (payload) => (dispatch) => {
  const res = dispatch({
    type: LOGIN,
    payload: api.post('/users/login', payload)
  });

  return res.then(() => dispatch([
    userOne(payload.email),
    usersAll(),
    shopsAll(),
    notificationsAll()]));
};

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

export const authLogout = () => ({
  type: LOGOUT
});
