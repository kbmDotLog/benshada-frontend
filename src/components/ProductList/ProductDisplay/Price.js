/** Module imports */
import React from 'react';
import PropTypes from 'prop-types';

/** Asset imports */
import { addComma } from 'assets/js/prototypes.js';

/**
 * Displays Product Price
 * @constructor
 */
class Price extends React.Component {
  /** Component propTypes */
  static propTypes = {
    price: PropTypes.number,
    discount: PropTypes.number
  };

  /**
   * Returns Price UI
   * @return {Obj} The UI DOM object
   */
  render() {
    const { price, discount } = this.props;

    return (
      <>
        <strong className="mr-2">&#8358; {addComma(price)}</strong>
        {discount > 0 && (
          <span className="product-discount" role="contentinfo">
            &#8358; {addComma(price * (1 - discount / 100))}
          </span>
        )}
      </>
    );
  }
}

/** Export component */
export default Price;
