const INIT = {
  isSignedIn: false,
  token: null,
  email: null
};

export default (state = INIT, action) => {
  const responseData = action.payload && action.payload.data && action.payload.data.data;

  return ({
    SIGNUP_FULFILLED: INIT,
    LOGIN_FULFILLED: {
      ...state,
      isSignedIn: true,
      token: responseData && responseData.token,
      email: responseData && responseData.email
    },
    LOGOUT: INIT
  }[action.type] || state);
};
