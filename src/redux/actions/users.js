/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */

/** API imports */
import api from 'redux/api/api';

/** Type imports */
import {
  USER_ONE,
  USERS_ALL,
  USER_UPDATE,
  USER_DELETE,
  USER_CHANGE_PASSWORD
} from 'redux/actions/types/userTypes';

/** Action imports */
import { deliveryCompaniesAll } from 'redux/actions/deliveryCompanies';
import { ticketsAll } from 'redux/actions/tickets';
import { notificationsAll } from 'redux/actions/notifications';
import { subscriptionsAll } from 'redux/actions/subscriptions';
import { shopsOne } from 'redux/actions/stores';

/**
 * Fetch all users
 */
export const usersAll = () => ({
  type: USERS_ALL,
  payload: api.get('/users')
});

/**
 * Fetch single user
 * @param {string} email
 */
export const userOne = (email) => (dispatch) => {
  const response = dispatch({
    type: USER_ONE,
    payload: api.get(`/users/${email}`)
  });

  return response.then((res) => {
    const actions = [
      usersAll(),
      deliveryCompaniesAll(),
      ticketsAll(),
      notificationsAll(),
      subscriptionsAll()
    ];

    const shopID = res.value.data.data.shops
      && res.value.data.data.shops[0]
      && res.value.data.data.shops[0]._id;

    const completeActions = shopID ? [...actions, shopsOne(shopID)] : actions;

    return dispatch(completeActions);
  });
};

/**
 * Update single user
 * @param {string} email
 * @param {object} userData
 */
export const userUpdate = (email, userData) => (dispatch) => {
  const response = dispatch({
    type: USER_UPDATE,
    payload: api.put(`/users/${email}`, userData)
  });

  return response.then(() => dispatch([userOne(email), usersAll()]));
};

/**
 *Change single user password
 * @param {object} passwordData
 */
export const userChangePassword = (passwordData) => ({
  type: USER_CHANGE_PASSWORD,
  payload: api.post('/users/change-password', passwordData)
});

/**
 * Delete single user
 * @param {string} email
 */
export const userDelete = (email) => (dispatch) => {
  const response = dispatch({
    type: USER_DELETE,
    payload: api.delete(`/users/${email}`)
  });

  return response.then(() => dispatch(usersAll()));
};
