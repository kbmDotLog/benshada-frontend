// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component imports
import ProductDisplay from './ProductDisplay/ProductDisplay.js';
import NotFound from '../NotFound/NotFound.js';
import { filterList } from '../../assets/js/filter.js';

// Start Component
export default class ProductList extends Component {
  static propTypes = {
    products: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    type: PropTypes.object,
    count: PropTypes.number,
    title: PropTypes.string,
    action: PropTypes.string
  };

  renderProductList = (products, filterType, filterValue) => {
    const filteredProducts = products
      .filter((product) => filterList(product, filterType, filterValue));

    return filteredProducts.length > 0 ? (
      <>
        <div className="cards products">
          {filteredProducts.slice(0, this.props.count).map((product, key) => (
            <ProductDisplay
              key={`productList${key}`}
              product={product}
              action={this.props.action}
            />
          ))}
        </div>
      </>
    ) : (
      <NotFound type="product" action={this.props.action} />
    );
  };

  render() {
    const { products, type, title } = this.props;
    const filterType = type && type.name;
    const filterValue = type && type.value;

    return (
      <>
        <h4 className="text-capitalize">{title}</h4>
        {this.renderProductList(products, filterType, filterValue)}
      </>
    );
  }
}
// End Component
