// API & type imports
import api from '../api/api.js';
import { LOGIN, LOGOUT, REGISTER } from './types/authTypes.js';

// Login action

export const authLogin = (payload) => (dispatch) => {
  const res = dispatch({
    type: LOGIN,
    payload: api.post('/users/login', payload)
  });

  return res;
};

// Register action
export const authRegister = (payload) => (dispatch) => {
  const response = dispatch({
    type: REGISTER,
    payload: api.post('/users/signup', payload)
  });

  return response.then(() => dispatch(
    authLogin({
      email: payload.email,
      password: payload.password
    })
  ));
};

// Logout action
export const authLogout = () => ({
  type: LOGOUT
});
