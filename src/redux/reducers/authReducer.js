// Declare Store Auth object
const INIT = {
  isSignedIn: false,
  token: null,
  email: null
};

// Export Store Auth object
export default (state = INIT, action) => {
  const responseData = action.payload
  && action.payload.data
  && action.payload.data.data;

  return (
    {
      LOGIN_FULFILLED: {
        ...state,
        isSignedIn: true,
        token: responseData && responseData.token,
        email: responseData && responseData.email
      },
      LOGOUT: INIT
    }[action.type] || state
  );
};
