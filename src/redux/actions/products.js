import { toast } from 'react-toastify';
import api from '../api/api.js';
import {
  PRODUCTS_ONE,
  PRODUCTS_ONE_SELECTED,
  PRODUCTS_ALL,
  PRODUCT_UPDATE,
  PRODUCT_DELETE,
  PRODUCT_ADD,
  PRODUCT_UPDATE_MULTIPLE
} from './types/productTypes.js';

export const productsAll = () => ({ type: PRODUCTS_ALL, payload: api.get('/products/') });

export const productsOne = (id) => ({
  type: PRODUCTS_ONE,
  payload: api.get(`/products/${id}`)
});

export const productsOneSelected = (payload) => ({
  type: PRODUCTS_ONE_SELECTED,
  payload
});

export const productUpdate = (id, productData, message) => (dispatch) => {
  const response = dispatch({
    type: PRODUCT_UPDATE,
    payload: api.put(`/products/${id}`, productData)
  });

  return response
    .then(() => dispatch([productsOne(id), productsAll()]))
    .then(() => (message ? toast.success(message) : ''))
    .catch((err) => toast.error(
      (err && err.response && err.response.data && err.response.data.message)
          || (err
            && err.response
            && err.response.data
            && err.response.data.message
            && err.response.data.message.name)
          || (err && err.response && err.response.statusText)
          || 'Network error'
    ));
};

export const productUpdateMultiple = (productRequests) => (dispatch) => {
  const response = dispatch({
    type: PRODUCT_UPDATE_MULTIPLE,
    payload: Promise.all(productRequests)
  });

  return response.then(() => dispatch(productsAll()));
};

export const productAdd = (data) => (dispatch) => {
  const response = dispatch({
    type: PRODUCT_ADD,
    payload: api.post('/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  });

  return response.then(() => dispatch(productsAll()));
};

export const productDelete = (id, message) => (dispatch) => {
  const response = dispatch({
    type: PRODUCT_DELETE,
    payload: api.delete(`/products/${id}`)
  });

  return response
    .then(() => dispatch(productsAll()))
    .then(() => (message ? toast.success(message) : ''))
    .catch((err) => toast.error(
      (err && err.response && err.response.data && err.response.data.message)
          || (err
            && err.response
            && err.response.data
            && err.response.data.message
            && err.response.data.message.name)
          || (err && err.response && err.response.statusText)
          || 'Network error'
    ));
};
