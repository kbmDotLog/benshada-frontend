/* eslint-disable no-underscore-dangle */
/** Module imports */
import { VerifyTransaction } from 'react-flutterwave-rave';
import { toast } from 'react-toastify';

/** API imports */
import api from 'redux/api/api';

/** Type imports */
import {
  TRANSACTIONS_ALL,
  TRANSACTION_UPDATE,
  TRANSACTION_DELETE,
  TRANSACTIONS_ONE,
  TRANSACTIONS_ONE_SELECTED,
  TRANSACTION_ADD
} from 'redux/actions/types/transactionTypes';

/** Action imports */
import { orderUpdate } from 'redux/actions/orders';

/**
 * Select single transaction
 * @param {object} transaction
 */
export const transactionsOneSelected = (transaction) => ({
  type: TRANSACTIONS_ONE_SELECTED,
  payload: transaction
});

/**
 *Fetch single transaction
 * @param {string} id
 */
export const transactionsOne = (id) => ({
  type: TRANSACTIONS_ONE,
  payload: api.get(`/transactions/${id}`)
});

/**
 * Fetch all transaction
 */
export const transactionsAll = () => ({
  type: TRANSACTIONS_ALL,
  payload: api.get('/transactions/')
});

/**
 *Add single transaction
 * @param {object} transaction
 */
export const transactionAdd = (transaction) => (dispatch, getState) => {
  const { order, transactionData } = transaction;
  const transactions = getState().transaction.all;

  if (
    transactions.filter(({ trxnRef }) => trxnRef === transactionData.trxnRef)
      .length > 0
  ) {
    return toast.warn('Transaction already exists');
  }

  const response = dispatch({
    type: TRANSACTION_ADD,
    payload: api.post('/transactions', transactionData)
  });

  return response
    .then(() => dispatch([orderUpdate(order._id, { status: 'paid' }), transactionsAll()]));
};

/**
 * Verify single transaction
 * @param {object} response
 * @param {object} order
 * @param {object} transactionData
 */
export const transactionVerify = (response, order, transactionData) => (
  dispatch
) => {
  const resp = VerifyTransaction({
    live: false,
    txref: response.tx.txRef,
    SECKEY: process.env.REACT_APP_RAVE_TEST_SECKEY
  });

  return resp
    .then(() => dispatch(transactionAdd({ order, transactionData })));
};

/**
 *Update single transaction
 * @param {string} id
 * @param {object} transactionData
 */
export const transactionUpdate = (id, transactionData) => (dispatch) => {
  const response = dispatch({
    type: TRANSACTION_UPDATE,
    payload: api.put(`/transactions/${id}`, transactionData)
  });

  return response
    .then(() => dispatch([transactionsOne(id), transactionsAll()]));
};

/**
 *Delete single transaction
 * @param {string} id
 */
export const transactionDelete = (id) => (dispatch) => {
  const response = dispatch({
    type: TRANSACTION_DELETE,
    payload: api.delete(`/transactions/${id}`)
  });

  return response
    .then(() => dispatch(transactionsAll()));
};
