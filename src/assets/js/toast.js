/** Module imports */
import { toast } from 'react-toastify';

/**
 * Resolve action creator success
 * @param {*} payload
 */
export const resolveSuccess = (payload) => toast.success(payload && payload.data.message);

/**
 *Reslve action creator error
 * @param {*} payload
 */
export const resolveError = (payload) => {
  const { response } = payload;
  const statusText = response && response.statusText;
  const message = response && response.data && response.data.message;
  const messageName = message && message.name;

  toast.error(messageName ?? message ?? statusText ?? 'Network error');
};
