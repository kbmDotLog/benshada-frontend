/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
import api from '../api/api.js';
import {
  DELIVERY_COMPANIES_ALL,
  DELIVERY_COMPANIES_ADD,
  DELIVERY_COMPANIES_ONE_SELECTED,
  DELIVERY_COMPANY_UPDATE,
  DELIVERY_COMPANY_DELETE
} from './types/deliveryCompanyTypes.js';
import { deliveryPackagesAll } from './deliveryPackages.js';

export const deliveryCompaniesOneSelected = (payload) => ({
  type: DELIVERY_COMPANIES_ONE_SELECTED,
  payload
});

export const deliveryCompaniesAll = (isAuthed) => (dispatch, getState) => {
  const headers = isAuthed
    ? {
      Authorization: `Bearer ${process.env.REACT_APP_DEF_AUTH}`
    }
    : {};

  const response = dispatch({
    type: DELIVERY_COMPANIES_ALL,
    payload: api.get('/delivery-company/', { headers })
  });

  return response.then(() => dispatch(deliveryPackagesAll(!getState().auth.isSigned)));
};

export const deliveryCompaniesAdd = (deliveryCompanyData) => (dispatch) => {
  const response = dispatch({
    type: DELIVERY_COMPANIES_ADD,
    payload: api.post('/delivery-company', deliveryCompanyData)
  });

  return response.then(() => dispatch(deliveryCompaniesAll()));
};

export const deliveryCompanyUpdate = (id, deliveryCompanyData) => (dispatch) => {
  const response = dispatch({
    type: DELIVERY_COMPANY_UPDATE,
    payload: api.put(`/delivery-company/${id}`, deliveryCompanyData)
  });

  return response.then(() => dispatch(deliveryCompaniesAll()));
};

export const deliveryCompanyDelete = (id) => (dispatch) => {
  const response = dispatch({
    type: DELIVERY_COMPANY_DELETE,
    payload: api.delete(`/delivery-company/${id}`)
  });

  return response.then(() => dispatch(deliveryCompaniesAll()));
};
