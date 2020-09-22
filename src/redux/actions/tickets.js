import api from '../api/api.js';
import {
  TICKETS_ALL,
  TICKET_UPDATE,
  TICKET_DELETE,
  TICKETS_ONE,
  TICKETS_ONE_SELECTED,
  TICKET_ADD
} from './types/ticketTypes.js';

export const ticketsAll = () => ({ type: TICKETS_ALL, payload: api.get('/tickets/') });

export const ticketAdd = (data) => (dispatch) => {
  const response = dispatch({
    type: TICKET_ADD,
    payload: api.post('/tickets', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  });

  return response.then(() => dispatch(ticketsAll()));
};

export const ticketsOne = (id) => ({
  type: TICKETS_ONE,
  payload: api.get(`/tickets/${id}`)
});

export const ticketUpdate = (id, ticketData) => (dispatch) => {
  const response = dispatch({
    type: TICKET_UPDATE,
    payload: api.put(`/tickets/${id}`, ticketData)
  });

  return response.then(() => dispatch([ticketsOne(id), ticketsAll()]));
};

export const ticketDelete = (id) => (dispatch) => {
  const response = dispatch({
    type: TICKET_DELETE,
    payload: api.delete(`/tickets/${id}`)
  });

  return response.then(() => dispatch(ticketsAll()));
};

export const ticketsOneSelected = (payload) => ({
  type: TICKETS_ONE_SELECTED,
  payload
});
