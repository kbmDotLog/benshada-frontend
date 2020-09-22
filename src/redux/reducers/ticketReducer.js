import isDeleted from '../helper/isDeleted.js';

const INIT = { all: [], selected: {} };

export default (state = INIT, action) => {
  const responseData = isDeleted(action);

  return (
    {
      TICKETS_ALL_FULFILLED: { ...state, all: responseData },
      TICKETS_ONE_FULFILLED: { ...state, selected: responseData },
      TICKETS_ONE_SELECTED: { ...state, selected: action.payload },
      LOGOUT: { ...state, selected: {} }
    }[action.type] || state
  );
};
