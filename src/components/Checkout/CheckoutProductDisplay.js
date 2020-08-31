// Module Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component imports
import Image from '../Image/Image.js';
import Price from '../ProductList/ProductDisplay/Price.js';

export default class CheckoutProductDisplay extends Component {
  static propTypes = {
    order: PropTypes.object
  };

  renderCost = (name, price, key) => (
    <div key={key} className="d-flex pt-2 font-weight-bold">
      <h5 className="text-left flex-grow-1 text-capitalize">{name}</h5>
      <div className="text-right flex-grow-1">
        <Price price={price} />
      </div>
    </div>
  );

  render = () => {
    const { product, count, totalPrice } = this.props.order;
    const {
      _id, image, name, color, price, discountPercentage
    } = product;
    const productDiscountedPrice = Math.round((1 - discountPercentage / 100) * price * count);

    const arr = [
      { name: 'delivery cost', price: totalPrice - productDiscountedPrice },
      { name: 'subtotal', price: totalPrice }
    ];

    return (
      <div className="p-3 border border-secondary border-left-0 border-top-0 border-right-0">
        <div className="d-flex">
          <div className="flex-grow-1 d-flex">
            <Image type="product" id={_id} image={image} xtraClass="mr-2" />
            <div>
              <span>{name}</span>
              <br />
              <div
                style={{
                  backgroundColor: color,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  marginTop: '5px'
                }}
              ></div>
            </div>
          </div>
          <div className="align-self-center">
            <p>X {count}</p>
            <Price price={price * count} discount={discountPercentage} />
          </div>
        </div>
        {arr.map((item, i) => this.renderCost(item.name, item.price, `cost-${i}`))}
      </div>
    );
  };
}
