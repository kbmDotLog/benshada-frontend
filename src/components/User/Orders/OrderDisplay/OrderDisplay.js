/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Component imports
import Image from '../../../Image/Image.js';
import ButtonOrderOwner from './Buttons/ButtonOrderOwner.js';

class OrderDisplay extends Component {
  static propTypes = {
    order: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    products: PropTypes.array,
    user: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  };

  renderActionButtons = (order) => {
    const { status } = order;
    const { user } = this.props;

    if (
      (order.user && order.user._id === user._id)
      || (user && user.shops[0].products.map(({ _id }) => _id).includes(order && order.product))
      || (user && user.type === 'ADMIN')
    ) {
      return <ButtonOrderOwner user={user} order={order} />;
    }

    return <p>{status}</p>;
  };

  render() {
    const { order, products, user } = this.props;
    const productID = order.product;
    const prod = products.filter(({ _id }) => _id === productID)[0];
    const name = prod && prod.name;
    const d = new Date(order && order.createdAt);

    return (
      <div className="card mb-4 rounded shadow-sm border-0">
        <div
          className={`card-body d-flex p-0 ${
            order.user && order.user._id === user._id ? 'bg-dark text-white' : ''
          }`}
        >
          <Image
            name={name}
            image={prod && prod.image}
            type="product"
            size={6}
            id={prod && prod._id}
          />
          <div className="flex-grow-1 p-2">
            <div className="d-flex">
              <div className="flex-grow-1">
                <p className="lead text-truncate">{name}</p>
                <p className="text-truncate">{d.toDateString()}</p>
              </div>
            </div>
            <div className="text-right pt-3">{this.renderActionButtons(order)}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, product }) => ({ user: user.selected, products: product.all });

export default connect(mapStateToProps)(OrderDisplay);
