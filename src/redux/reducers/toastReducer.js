/** Asset imports */
import { resolveError, resolveSuccess } from 'assets/js/toast';

/**
 * Initial toastReducer state
 */
const INIT = { fulfilled: [], rejected: [] };

/** */
export default (state = INIT, action) => {
  const { type, payload } = action;
  const { fulfilled, rejected } = state;

  if (type.endsWith('REJECTED')) {
    resolveError(payload);
    return { ...state, rejected: [...rejected, type.replace('_REJECTED', '')] };
  }

  if (type.endsWith('FULFILLED')) {
    resolveSuccess(payload);
    return { ...state, fulfilled: [...fulfilled, type.replace('_FULFILLED', '')] };
  }

  return { ...state };
};
