/* eslint-disable no-underscore-dangle */
/** API imports */
import api from 'redux/api/api';

/** Type imports */
import {
  ORDERS_ONE,
  ORDERS_MULTIPLE_SELECTED,
  ORDERS_ALL,
  ORDER_UPDATE,
  ORDER_DELETE,
  ORDER_ADD
} from 'redux/actions/types/orderTypes';

/** Action imports */
import { userUpdate } from 'redux/actions/users';
import { productUpdateMultiple, productUpdate } from 'redux/actions/products';
import { notificationsAll } from 'redux/actions/notifications';

/**
 *Select multiple orders
 * @param {[]} orders
 */
export const ordersMultipleSelected = (orders) => ({
  type: ORDERS_MULTIPLE_SELECTED,
  payload: orders
});

/**
 *Fetch single order
 * @param {string} id
 */
export const ordersOne = (id) => ({
  type: ORDERS_ONE,
  payload: api.get(`/orders/${id}`)
});

/**
 * Fetch all orders
 */
export const ordersAll = () => ({
  type: ORDERS_ALL,
  payload: api.get('/orders/')
});

/**
 *Update single order
 * @param {string} id
 * @param {object} orderData
 */
export const orderUpdate = (id, orderData) => (dispatch) => {
  const response = dispatch({
    type: ORDER_UPDATE,
    payload: api.put(`/orders/${id}`, orderData)
  });

  return response.then(() => dispatch([ordersOne(id), ordersAll(), notificationsAll()]));
};

/**
 *Add multiple orders
 * @param {array} orders
 */
export const orderAdd = (orders) => (dispatch, getState) => {
  // Dispatch orders
  const orderRequests = [];
  const productRequests = [];

  for (let i = 0; i < orders.length; i += 1) {
    const order = orders[i];
    const product = order.product._id;
    const quantity = order.product.quantity - order.count;

    orderRequests.push(api.post('/orders', { ...order, product }));
    productRequests.push(
      api.put(`/products/${product}`, { quantity: quantity < 0 ? 0 : quantity })
    );
  }

  const response = dispatch({
    type: ORDER_ADD,
    payload: Promise.all(orderRequests)
  });

  const { email } = getState().user.selected;

  // Update product quantities
  // Fetch all orders
  // Empty user cart
  return response.then(() => dispatch([
    productUpdateMultiple(productRequests),
    ordersAll(),
    userUpdate(email, { cart: [] }),
    ordersMultipleSelected(orders)
  ]));
};

/**
 *Delete single order
 * @param {object} order
 */
export const orderDelete = (order) => (dispatch, getState) => {
  const { _id, product, count } = order;
  const stateProduct = getState().product.all.filter(
    (item) => item._id === product
  )[0];
  const selectedOrders = getState().order.selected.filter(
    (item) => item && item.product && item.product._id !== product
  );
  const quantity = (stateProduct && stateProduct.quantity) + count;

  const response = dispatch({
    type: ORDER_DELETE,
    payload: api.delete(`/orders/${_id}`)
  });

  return response.then(() => dispatch([
    productUpdate(product, { quantity }),
    ordersAll(),
    ordersMultipleSelected(selectedOrders)
  ]));
};
