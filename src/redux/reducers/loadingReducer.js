const getActionName = (actionType) => (typeof actionType !== 'string' ? null : actionType.split('_').slice(0, -1).join('_'));

const INIT = {
  pending: false
};

export default (state = INIT, action) => {
  const { type } = action;
  const actionName = getActionName(type);

  if (!actionName) {
    return {
      ...state
    };
  }

  if (type.endsWith('_PENDING')) {
    return {
      ...state,
      pending: true
    };
  }

  return INIT;
};
