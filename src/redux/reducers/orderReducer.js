import isDeleted from '../helper/isDeleted.js';

const INIT = { all: [], selected: [] };

export default (state = INIT, action) => {
  const responseData = isDeleted(action);

  return (
    {
      ORDERS_ALL_FULFILLED: { ...state, all: responseData },
      ORDERS_ONE_FULFILLED: { ...state, selected: [responseData] },
      ORDERS_MULTIPLE_SELECTED: { ...state, selected: action.payload },
      LOGOUT: { ...state, selected: [] }
    }[action.type] || state
  );
};
