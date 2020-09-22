import isDeleted from '../helper/isDeleted.js';

const INIT = { all: [], selected: {} };

export default (state = INIT, action) => {
  const responseData = isDeleted(action);

  return ({
    USERS_ALL_FULFILLED: { ...state, all: responseData },
    USER_ONE_FULFILLED: { ...state, selected: responseData },
    LOGOUT: { ...state, selected: {} }
  }[action.type] || state);
};
