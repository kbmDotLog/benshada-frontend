/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
import { toast } from 'react-toastify';
import api from '../api/api.js';
import {
  DELIVERY_PACKAGES_ALL,
  DELIVERY_PACKAGES_ADD,
  DELIVERY_PACKAGES_ONE_SELECTED,
  DELIVERY_PACKAGE_UPDATE,
  DELIVERY_PACKAGE_DELETE
} from './types/deliveryPackageTypes.js';

export const deliveryPackagesOneSelected = (payload) => ({
  type: DELIVERY_PACKAGES_ONE_SELECTED,
  payload
});

export const deliveryPackagesAll = (isAuthed) => (dispatch, getState) => {
  const headers = isAuthed && !getState().auth.isSignedIn
    ? {
      Authorization: `Bearer ${process.env.REACT_APP_DEF_AUTH}`
    }
    : {};

  return {
    type: DELIVERY_PACKAGES_ALL,
    payload: api.get('/delivery-package', { headers })
  };
};

export const deliveryPackagesAdd = (deliveryPackageData) => (dispatch) => {
  const response = dispatch({
    type: DELIVERY_PACKAGES_ADD,
    payload: api.post('/delivery-package', deliveryPackageData)
  });

  return response.then(() => dispatch(deliveryPackagesAll()));
};

export const deliveryPackageUpdate = (id, deliveryPackageData) => (dispatch) => {
  const response = dispatch({
    type: DELIVERY_PACKAGE_UPDATE,
    payload: api.put(`/delivery-package/${id}`, deliveryPackageData)
  });

  return response.then(() => dispatch(deliveryPackagesAll()));
};

export const deliveryPackageDelete = (id, message) => (dispatch) => {
  const response = dispatch({
    type: DELIVERY_PACKAGE_DELETE,
    payload: api.delete(`/delivery-package/${id}`)
  });

  return response
    .then(() => dispatch(deliveryPackagesAll()))
    .then(() => message && toast.success(message))
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
