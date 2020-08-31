import isDeleted from '../helper/isDeleted.js';

const INIT = { all: [], selected: {} };

export default (state = INIT, action) => {
  const responseData = isDeleted(action);

  return ({
    USER_ONE_FULFILLED: { ...state, all: responseData && responseData.cards },
    CARDS_ONE_SELECTED: { ...state, selected: action.payload }
  }[action.type] || state);
};
