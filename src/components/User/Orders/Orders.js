/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OrderList from './OrderList.js';

class Orders extends Component {
  static propTypes = {
    orders: PropTypes.array,
    user: PropTypes.object
  };

  render = () => {
    const { user, orders } = this.props;

    const userOrders = orders.filter(
      (order) => (order.user && order.user._id === user._id)
        || (
          (user && user.shops && user.shops[0] && user.shops[0].products.map(({ _id }) => _id))
          || []
        ).includes(order && order.product)
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 py-3">
            <h4 className="flex-grow-1">Orders</h4>
            <div className="row">
              <OrderList orders={userOrders} />
            </div>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = ({ order }) => ({ orders: order.all });

export default connect(mapStateToProps)(Orders);
