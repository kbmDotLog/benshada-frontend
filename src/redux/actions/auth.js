// API & type imports
import api from 'redux/api/api';
import { LOGIN, LOGOUT, REGISTER } from 'redux/actions/types/authTypes';

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
