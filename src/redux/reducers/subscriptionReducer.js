import isDeleted from '../helper/isDeleted.js';

const INIT = { all: [] };

export default (state = INIT, action) => {
  const responseData = isDeleted(action);

  return ({
    SUBSCRIPTIONS_ALL_FULFILLED: { ...state, all: responseData },
    LOGOUT: INIT
  }[action.type] || state);
};
