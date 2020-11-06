/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/** API imports */
import api from 'redux/api/api';

/** Type imports */
import {
  DELIVERY_PACKAGES_ALL,
  DELIVERY_PACKAGES_ADD,
  DELIVERY_PACKAGES_ONE_SELECTED,
  DELIVERY_PACKAGE_UPDATE,
  DELIVERY_PACKAGE_DELETE
} from 'redux/actions/types/deliveryPackageTypes';

/**
 * Select single delivery package
 * @param {object} deliveryPackage
 */
export const deliveryPackagesOneSelected = (deliveryPackage) => ({
  type: DELIVERY_PACKAGES_ONE_SELECTED,
  payload: deliveryPackage
});

/**
 * Fetch all delivery packages
 */
export const deliveryPackagesAll = () => ({
  type: DELIVERY_PACKAGES_ALL,
  payload: api.get('/delivery-package')
});

/**
 *Add single deliivery package
 * @param {object} deliveryPackage
 */
export const deliveryPackagesAdd = (deliveryPackage) => (dispatch) => {
  const response = dispatch({
    type: DELIVERY_PACKAGES_ADD,
    payload: api.post('/delivery-package', deliveryPackage)
  });

  return response.then(() => dispatch(deliveryPackagesAll()));
};

/**
 *Update single delivery pacakge
 * @param {string} id
 * @param {object} deliveryPackageData
 */
export const deliveryPackageUpdate = (id, deliveryPackageData) => (dispatch) => {
  const response = dispatch({
    type: DELIVERY_PACKAGE_UPDATE,
    payload: api.put(`/delivery-package/${id}`, deliveryPackageData)
  });

  return response.then(() => dispatch(deliveryPackagesAll()));
};

/**
 *Delete single delivery package
 * @param {string} id
 */
export const deliveryPackageDelete = (id) => (dispatch) => {
  const response = dispatch({
    type: DELIVERY_PACKAGE_DELETE,
    payload: api.delete(`/delivery-package/${id}`)
  });

  return response
    .then(() => dispatch(deliveryPackagesAll()));
};
