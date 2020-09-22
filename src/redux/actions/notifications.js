/* eslint-disable no-underscore-dangle */
import api from '../api/api.js';
import {
  NOTIFICATIONS_ONE_SELECTED,
  NOTIFICATIONS_ALL,
  NOTIFICATION_MARK_AS_READ,
  NOTIFICATION_DELETE
} from './types/notificationTypes.js';

export const notificationsAll = () => (dispatch, getState) => {
  const uID = getState().user.selected._id;
  return dispatch({
    type: NOTIFICATIONS_ALL,
    payload: api.get(`/notifications/${uID}`)
  });
};

export const notificationsOneSelected = (payload) => ({
  type: NOTIFICATIONS_ONE_SELECTED,
  payload
});

export const notificationMarkAsRead = (notification) => (dispatch, getState) => {
  const response = dispatch({
    type: NOTIFICATION_MARK_AS_READ,
    payload: api.post(`/notifications/read/${notification._id}`, notification)
  });

  return response
    .then(() => dispatch(notificationsAll(getState().user.selected._id)))
    .then(() => dispatch(notificationsOneSelected(notification)));
};

export const notificationDelete = (notification) => (dispatch, getState) => {
  const response = dispatch({
    type: NOTIFICATION_DELETE,
    payload: api.delete(`/notifications/${notification._id}`)
  });

  return response
    .then(() => dispatch(notificationsAll(getState().user.selected._id)))
    .then(() => dispatch(notificationsOneSelected(notification)));
};
