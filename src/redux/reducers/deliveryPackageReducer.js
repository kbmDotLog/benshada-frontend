import isDeleted from '../helper/isDeleted.js';

const INIT = { all: [], selected: {} };

export default (state = INIT, action) => {
  const responseData = isDeleted(action);

  return ({
    DELIVERY_PACKAGES_ALL_FULFILLED: { ...state, all: responseData },
    DELIVERY_PACKAGES_ONE_FULFILLED: { ...state, selected: responseData },
    DELIVERY_PACKAGES_ONE_SELECTED: { ...state, selected: action.payload },
    LOGOUT: { ...state, selected: {} }
  }[action.type] || state);
};
