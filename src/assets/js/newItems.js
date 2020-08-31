// Module imports
import { faTicketAlt, faBox, faTruckMoving } from '@fortawesome/free-solid-svg-icons';
// import { faCreditCard } from '@fortawesome/free-regular-svg-icons';

// Export
export default [
  { name: 'product', icon: faBox, users: ['UA', 'UB'] },
  // { name: 'card', icon: faCreditCard, users: ['UA', 'UB', 'UC', 'UDC'] },
  { name: 'ticket', icon: faTicketAlt, users: ['UA', 'UB', 'UC', 'UDC'] },
  { name: 'package', icon: faTruckMoving, users: ['UDC'] }
];
