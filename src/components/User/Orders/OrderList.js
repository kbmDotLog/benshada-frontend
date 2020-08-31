// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component imports
import OrderDisplay from './OrderDisplay/OrderDisplay.js';
import NotFound from '../../NotFound/NotFound.js';

// Start Component
export default class OrderList extends Component {
  static propTypes = {
    orders: PropTypes.array,
    count: PropTypes.number,
    title: PropTypes.string
  };

  renderOrderList = (orders) => (orders.length > 0 ? (
      <>
        <div className="cards orders">
          {orders.slice(0, this.props.count).map((order, key) => (
            <OrderDisplay key={`orderList${key}`} order={order} />
          ))}
        </div>
      </>
  ) : (
      <NotFound type="order" />
  ));

  render = () => <>{this.renderOrderList(this.props.orders)}</>;
}
// End Component
