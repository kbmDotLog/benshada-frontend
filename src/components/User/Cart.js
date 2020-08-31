import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import ProductList from '../ProductList/ProductList.js';
import Price from '../ProductList/ProductDisplay/Price.js';

export default class Cart extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render = () => {
    const { cart } = this.props.user;
    const cartTotal = cart.map(({ price }) => price).reduce((total, price) => total + price, 0);
    const cartTotalDiscount = cart
      .map(
        ({ price, discountPercentage }) => (discountPercentage < 1
          ? price
          : (1 - discountPercentage / 100) * price)
      )
      .reduce((total, price) => total + price, 0);

    return (
      <div>
        <div className="d-flex">
          <h4 className="flex-grow-1">
            Total:{' '}
            <Price
              price={cartTotal}
              discount={((cartTotal - cartTotalDiscount) / cartTotal) * 100}
            />
          </h4>
          {((cartTotal - cartTotalDiscount) / cartTotal) * 100 > 0 ? <Link to="/checkout" className="btn btn-primary pt-4 mb-4">Checkout</Link> : ''}
        </div>
        <ProductList products={_.uniqBy(cart, '_id')} action="cart" />
      </div>
    );
  };
}
