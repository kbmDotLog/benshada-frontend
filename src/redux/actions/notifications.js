/* eslint-disable no-underscore-dangle */
/** API imports */
import api from 'redux/api/api';

/** Type imports */
import {
  NOTIFICATIONS_ONE_SELECTED,
  NOTIFICATIONS_ALL,
  NOTIFICATION_MARK_AS_READ,
  NOTIFICATION_DELETE
} from 'redux/actions/types/notificationTypes';

/**
 *Select single notification
 * @param {object} notification
 */
export const notificationsOneSelected = (notification) => ({
  type: NOTIFICATIONS_ONE_SELECTED,
  payload: notification
});

/**
 * Fetch all notifications
 */
export const notificationsAll = (notification) => (dispatch, getState) => {
  const uID = getState().user.selected._id;
  const response = dispatch({
    type: NOTIFICATIONS_ALL,
    payload: api.get(`/notifications/${uID}`)
  });

  return notification
    ? response.then(() => dispatch(notificationsOneSelected(notification)))
    : response;
};

/**
 *Mark single notification as read
 * @param {object} notification
 */
export const notificationMarkAsRead = (notification) => (dispatch) => {
  const response = dispatch({
    type: NOTIFICATION_MARK_AS_READ,
    payload: api.post(`/notifications/read/${notification._id}`, notification)
  });

  return response.then(() => dispatch(notificationsAll(notification)));
};

/**
 *Delete single notification
 * @param {object} notification
 */
export const notificationDelete = (notification) => (dispatch) => {
  const response = dispatch({
    type: NOTIFICATION_DELETE,
    payload: api.delete(`/notifications/${notification._id}`)
  });

  return response.then(() => dispatch(notificationsAll(notification)));
};
