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
    isFlex: PropTypes.bool,
    products: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    type: PropTypes.object,
    count: PropTypes.number,
    title: PropTypes.string,
    action: PropTypes.string
  };

  renderProductList = (products, filterType, filterValue) => {
    const filteredProducts = products.filter((i) => filterList(i, filterType, filterValue));

    return filteredProducts.length > 0 ? (
      <div className={this.props.isFlex ? 'd-flex' : ''}>
        {filteredProducts.slice(0, this.props.count).map((product, key) => (
          <ProductDisplay key={`productList${key}`} product={product} action={this.props.action} />
        ))}
      </div>
    ) : (
      <NotFound type="product" action={this.props.action} />
    );
  };

  render() {
    const { products, type, title } = this.props;
    const filterType = type && type.name;
    const filterValue = type && type.value;

    return (
      <section className="productShowcase mt-4 section">
        <h2 className="d-none">{title}</h2>
        {this.renderProductList(products, filterType, filterValue)}
      </section>
    );
  }
}
// End Component
