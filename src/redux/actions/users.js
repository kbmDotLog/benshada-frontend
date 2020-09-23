/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
import api from '../api/api.js';
import {
  USER_ONE,
  USERS_ALL,
  USER_UPDATE,
  USER_DELETE,
  USER_CHANGE_PASSWORD
} from './types/userTypes.js';
import { authLogout } from './auth.js';
import { deliveryCompaniesAll } from './deliveryCompanies.js';

export const userOne = (email) => (dispatch) => {
  const response = dispatch({
    type: USER_ONE,
    payload: api.get(`/users/${email}`)
  });

  return response.then(() => dispatch(deliveryCompaniesAll()));
};

export const usersAll = (isAuthed) => (dispatch) => {
  const headers = isAuthed
    ? {
      Authorization: `Bearer ${process.env.REACT_APP_DEF_AUTH}`
    }
    : {};

  // console.log(headers);

  return dispatch({
    type: USERS_ALL,
    payload: api.get('/users', {
      headers
    })
  });
};

export const userUpdate = (email, userData) => (dispatch) => {
  const response = dispatch({
    type: USER_UPDATE,
    payload: api.put(`/users/${email}`, userData)
  });

  return response.then(() => dispatch([userOne(email), usersAll()]));
};

export const userChangePassword = (passwordData) => (dispatch) => {
  const response = dispatch({
    type: USER_CHANGE_PASSWORD,
    payload: api.post('/users/change-password', passwordData)
  });

  return response.then(() => dispatch(authLogout()));
};

export const userDelete = (email) => (dispatch) => {
  const response = dispatch({
    type: USER_DELETE,
    payload: api.delete(`/users/${email}`)
  });

  return response.then(() => dispatch(usersAll()));
};
