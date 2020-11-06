/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/** API imports */
import api from 'redux/api/api';

/** Type imports */
import {
  DELIVERY_COMPANIES_ALL,
  DELIVERY_COMPANIES_ADD,
  DELIVERY_COMPANIES_ONE_SELECTED,
  DELIVERY_COMPANY_UPDATE,
  DELIVERY_COMPANY_DELETE
} from 'redux/actions/types/deliveryCompanyTypes';

/** Action imports */
import { deliveryPackagesAll } from 'redux/actions/deliveryPackages';

/**
 *Select single delivery company
 * @param {object} deliveryCompany
 */
export const deliveryCompaniesOneSelected = (deliveryCompany) => ({
  type: DELIVERY_COMPANIES_ONE_SELECTED,
  payload: deliveryCompany
});

/**
 *Fetch all delivery companies
 */
export const deliveryCompaniesAll = () => (dispatch) => {
  const response = dispatch({
    type: DELIVERY_COMPANIES_ALL,
    payload: api.get('/delivery-company/')
  });

  return response.then(() => dispatch([deliveryPackagesAll()]));
};

/**
 *Add single delivery company
 * @param {object} deliveryCompany
 */
export const deliveryCompaniesAdd = (deliveryCompany) => (dispatch) => {
  const response = dispatch({
    type: DELIVERY_COMPANIES_ADD,
    payload: api.post('/delivery-company', deliveryCompany)
  });

  return response.then(() => dispatch(deliveryCompaniesAll()));
};

/**
 *Update single delivery company
 * @param {string} id
 * @param {object} deliveryCompanyData
 */
export const deliveryCompanyUpdate = (id, deliveryCompanyData) => (dispatch) => {
  const response = dispatch({
    type: DELIVERY_COMPANY_UPDATE,
    payload: api.put(`/delivery-company/${id}`, deliveryCompanyData)
  });

  return response.then(() => dispatch(deliveryCompaniesAll()));
};

/**
 * Delete single delivery company
 * @param {string} id
 */
export const deliveryCompanyDelete = (id) => (dispatch) => {
  const response = dispatch({
    type: DELIVERY_COMPANY_DELETE,
    payload: api.delete(`/delivery-company/${id}`)
  });

  return response.then(() => dispatch(deliveryCompaniesAll()));
};
