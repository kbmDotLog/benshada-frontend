// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Displays product page initial product params
 * @constructor
 */
class ProductParams extends Component {
  /** Component State */
  state = {
    activeColor: '',
    activeSize: ''
  };

  /** Component  propTypes */
  static propTypes = {
    color: PropTypes.string.isRequired,
    sizes: PropTypes.array.isRequired
  };

  /**
   * Returns ProductParams UI
   * @return {Obj} The UI DOM object
   */
  render() {
    const { color, sizes } = this.props;
    const { activeColor, activeSize } = this.state;

    return (
      <div className="product-params" role="contentinfo">
        <div className="product-size" role="contentinfo">
          <h6 className="title">Select Size</h6>
          <ul className="d-flex params-list">
            {sizes
              && sizes.map(({ value }) => (
                <li
                  className={activeSize === value && 'active'}
                  key={value}
                  onClick={() => this.setState(() => ({ activeSize: value }))}
                >
                  {value}
                </li>
              ))}
          </ul>
        </div>
        <div className="product-color" role="contentinfo">
          <h6 className="title">Product Color</h6>
          <ul className="d-flex params-list">
            {color
              && color
                .split(',')
                .map((background) => (
                  <li
                    className={
                      activeColor === background
                      && 'border border-secondary shadow-sm'
                    }
                    key={background}
                    style={{ background }}
                    onClick={() => this.setState(() => ({ activeColor: background }))
                    }
                  ></li>
                ))}
          </ul>
        </div>
        {/* <div className="product-quantity" role="contentinfo">
      <h6 className="title">Quantity</h6>
      <ul className="d-flex params-list">
        <li>-</li>
        <li>1</li>
        <li>+</li>
      </ul>
    </div> */}
      </div>
    );
  }
}

/** Export component */
export default ProductParams;
