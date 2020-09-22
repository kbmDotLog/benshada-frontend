import isDeleted from '../helper/isDeleted.js';

const INIT = { all: [], selected: {} };

export default (state = INIT, action) => {
  const responseData = isDeleted(action);

  return ({
    DELIVERY_COMPANIES_ALL_FULFILLED: { ...state, all: responseData },
    DELIVERY_COMPANIES_ONE_FULFILLED: { ...state, selected: responseData },
    DELIVERY_COMPANIES_ONE_SELECTED: { ...state, selected: action.payload },
    LOGOUT: { ...state, selected: {} }
  }[action.type] || state);
};
