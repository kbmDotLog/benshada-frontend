/** API imports */
import api from 'redux/api/api';

/** Type imports */
import {
  TICKETS_ALL,
  TICKET_UPDATE,
  TICKET_DELETE,
  TICKETS_ONE,
  TICKETS_ONE_SELECTED,
  TICKET_ADD
} from 'redux/actions/types/ticketTypes';

/**
 *Select single ticket
 * @param {object} ticket
 */
export const ticketsOneSelected = (ticket) => ({
  type: TICKETS_ONE_SELECTED,
  payload: ticket
});

/**
 *Fetch single ticket
 * @param {string} id
 */
export const ticketsOne = (id) => ({
  type: TICKETS_ONE,
  payload: api.get(`/tickets/${id}`)
});

/**
 * Fetch all tickets
 */
export const ticketsAll = () => ({
  type: TICKETS_ALL,
  payload: api.get('/tickets/')
});

/**
 *Add single ticket
 * @param {object} ticket
 */
export const ticketAdd = (ticket) => (dispatch) => {
  const response = dispatch({
    type: TICKET_ADD,
    payload: api.post('/tickets', ticket, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  });

  return response
    .then(() => dispatch(ticketsAll()));
};

/**
 *Update single ticket
 * @param {string} id
 * @param {object} ticketData
 */
export const ticketUpdate = (id, ticketData) => (dispatch) => {
  const response = dispatch({
    type: TICKET_UPDATE,
    payload: api.put(`/tickets/${id}`, ticketData)
  });

  return response
    .then(() => dispatch([ticketsOne(id), ticketsAll()]));
};

/**
 *Delete single ticket
 * @param {string} id
 */
export const ticketDelete = (id) => (dispatch) => {
  const response = dispatch({
    type: TICKET_DELETE,
    payload: api.delete(`/tickets/${id}`)
  });

  return response
    .then(() => dispatch(ticketsAll()));
};
