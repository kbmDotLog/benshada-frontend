/* eslint-disable no-underscore-dangle */
import { VerifyTransaction } from 'react-flutterwave-rave';
import { toast } from 'react-toastify';
import api from '../api/api.js';
import {
  TRANSACTIONS_ALL,
  TRANSACTION_UPDATE,
  TRANSACTION_DELETE,
  TRANSACTIONS_ONE,
  TRANSACTIONS_ONE_SELECTED,
  TRANSACTION_ADD
} from './types/transactionTypes.js';
import { orderUpdate } from './orders.js';

export const transactionsAll = () => ({
  type: TRANSACTIONS_ALL,
  payload: api.get('/transactions/')
});

export const transactionAdd = (data) => (dispatch, getState) => {
  const { order, transactionData } = data;
  const transactions = getState().transaction.all;

  if (transactions.filter(({ trxnRef }) => trxnRef === transactionData.trxnRef).length > 0) {
    return toast.warn('Transaction already exists');
  }

  const response = dispatch({
    type: TRANSACTION_ADD,
    payload: api.post('/transactions', transactionData)
  });

  return response.then(() => dispatch([orderUpdate(order._id, { status: 'paid' }), transactionsAll()]));
};

export const transactionVerify = (response, order, transactionData) => (dispatch) => {
  const res = VerifyTransaction({
    live: false,
    txref: response.tx.txRef,
    SECKEY: process.env.REACT_APP_RAVE_TEST_SECKEY
  });

  return res
    .then(() => dispatch(transactionAdd({ order, transactionData })))
    .catch(() => dispatch(transactionAdd({ order, transactionData })));
};

export const transactionsOne = (id) => ({
  type: TRANSACTIONS_ONE,
  payload: api.get(`/transactions/${id}`)
});

export const transactionUpdate = (id, transactionData) => (dispatch) => {
  const response = dispatch({
    type: TRANSACTION_UPDATE,
    payload: api.put(`/transactions/${id}`, transactionData)
  });

  return response.then(() => dispatch([transactionsOne(id), transactionsAll()]));
};

export const transactionDelete = (id) => (dispatch) => {
  const response = dispatch({
    type: TRANSACTION_DELETE,
    payload: api.delete(`/transactions/${id}`)
  });

  return response.then(() => dispatch(transactionsAll()));
};

export const transactionsOneSelected = (payload) => ({
  type: TRANSACTIONS_ONE_SELECTED,
  payload
});
