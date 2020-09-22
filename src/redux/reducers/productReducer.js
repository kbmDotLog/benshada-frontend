import isDeleted from '../helper/isDeleted.js';

const INIT = { all: [], selected: {} };

export default (state = INIT, action) => {
  let responseData = isDeleted(action);

  responseData = Array.isArray(responseData)
    ? responseData.map((response) => ({
      ...response,
      sizes: ((response && response.sizes) || []).map((size) => ({ label: size, value: size }))
    }))
    : {
      ...responseData,
      sizes: ((responseData && responseData.sizes) || []).map((size) => ({
        label: size,
        value: size
      }))
    };

  return (
    {
      PRODUCTS_ALL_FULFILLED: { ...state, all: responseData },
      PRODUCTS_ONE_FULFILLED: { ...state, selected: responseData },
      PRODUCTS_ONE_SELECTED: { ...state, selected: action.payload },
      LOGOUT: { ...state, selected: {} }
    }[action.type] || state
  );
};
