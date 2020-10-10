import React from 'react';
import PropTypes from 'prop-types';
import { addComma } from '../../../assets/js/prototypes.js';

class Price extends React.Component {
  static propTypes = {
    price: PropTypes.number,
    discount: PropTypes.number
  };

  render = () => {
    const productPrice = this.props.price;

    if (productPrice === undefined) return false;

    return this.props.discount > 0 ? (
      <>
        <strong className="mr-2">&#8358; {addComma(productPrice)}</strong>
        <span className="product-discount" role="contentinfo">
          &#8358; {addComma(productPrice * (1 - this.props.discount / 100))}
        </span>
      </>
    ) : (
      <strong className="mr-2">&#8358; {addComma(productPrice)}</strong>
    );
  };
}

export default Price;
