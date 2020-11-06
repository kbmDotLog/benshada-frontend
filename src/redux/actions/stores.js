/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/** API imports */
import api from 'redux/api/api';

/** Type imports */
import {
  STORES_ONE,
  STORES_ONE_SELECTED,
  STORES_ALL,
  STORE_UPDATE,
  STORE_DELETE,
  STORES_ADD
} from 'redux/actions/types/storeTypes';

/** Action imports */
import { userUpdate } from 'redux/actions/users';

/**
 * Select single shop
 * @param {object} shop
 */
export const shopsOneSelected = (shop) => ({
  type: STORES_ONE_SELECTED,
  payload: shop
});

/**
 *Fetch single shop
 * @param {string} id
 */
export const shopsOne = (id) => ({
  type: STORES_ONE,
  payload: api.get(`/shops/${id}`)
});

/**
 * Fetch all shops
 */
export const shopsAll = () => ({ type: STORES_ALL, payload: api.get('/shops/') });

/**
 *Add single shop
 * @param {object} shopData
 */
export const shopAdd = (shopData) => (dispatch, getState) => {
  const response = dispatch({
    type: STORES_ADD,
    payload: api.post('/shops', shopData)
  });
  const { email } = getState().user.selected;

  return response
    .then((res) => dispatch([userUpdate(email, { shops: [res.value.data.data._id] }), shopsAll()]));
};

/**
 *Update single shop
 * @param {string} id
 * @param {object} shopData
 */
export const shopUpdate = (id, shopData) => (dispatch) => {
  const response = dispatch({
    type: STORE_UPDATE,
    payload: api.put(`/shops/${id}`, shopData)
  });

  return response.then(() => dispatch([shopsOne(id), shopsAll()]));
};

/**
 * Delete single shop
 * @param {string} id
 */
export const shopDelete = (id) => (dispatch) => {
  const response = dispatch({
    type: STORE_DELETE,
    payload: api.delete(`/shops/${id}`)
  });

  return response
    .then(() => dispatch(shopsAll()));
};
