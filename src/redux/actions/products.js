/** API imports */
import api from 'redux/api/api';

/** Type imports */
import {
  PRODUCTS_ONE,
  PRODUCTS_ONE_SELECTED,
  PRODUCTS_ALL,
  PRODUCT_UPDATE,
  PRODUCT_DELETE,
  PRODUCT_ADD,
  PRODUCT_UPDATE_MULTIPLE
} from 'redux/actions/types/productTypes';

/**
 * Select single product
 * @param {object} product
 */
export const productsOneSelected = (product) => ({
  type: PRODUCTS_ONE_SELECTED,
  payload: product
});

/**
 *Fetch single product
 * @param {string} id
 */
export const productsOne = (id) => ({
  type: PRODUCTS_ONE,
  payload: api.get(`/products/${id}`)
});

/**
 * Fetch allproducts
 */
export const productsAll = () => ({ type: PRODUCTS_ALL, payload: api.get('/products/') });

/**
 *Update single product
 * @param {string} id
 * @param {object} productData
 */
export const productUpdate = (id, productData) => (dispatch) => {
  const response = dispatch({
    type: PRODUCT_UPDATE,
    payload: api.put(`/products/${id}`, productData)
  });

  return response
    .then(() => dispatch([productsOne(id), productsAll()]));
};

/**
 *Update multiple products
 * @param {*} productRequests
 */
export const productUpdateMultiple = (productRequests) => (dispatch) => {
  const response = dispatch({
    type: PRODUCT_UPDATE_MULTIPLE,
    payload: Promise.all(productRequests)
  });

  return response.then(() => dispatch(productsAll()));
};

/**
 *Add single product
 * @param {object} product
 */
export const productAdd = (product) => (dispatch) => {
  const response = dispatch({
    type: PRODUCT_ADD,
    payload: api.post('/products', product, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  });

  return response.then(() => dispatch(productsAll()));
};

/**
 *Delete single product
 * @param {string} id
 */
export const productDelete = (id) => (dispatch) => {
  const response = dispatch({
    type: PRODUCT_DELETE,
    payload: api.delete(`/products/${id}`)
  });

  return response
    .then(() => dispatch(productsAll()));
};
