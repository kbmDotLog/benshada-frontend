/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProductList from '../../ProductList/ProductList.js';

class Products extends Component {
  static propTypes = {
    products: PropTypes.array,
    store: PropTypes.object,
    user: PropTypes.object
  };

  render = () => {
    const items = this.props.products.filter(
      ({ shop }) => shop && shop._id === this.props.store._id
    ) || [];

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 py-3">
            <ProductList products={items} count={12} title="Your Products" />
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = ({ product }) => ({ products: product.all });

export default connect(mapStateToProps)(Products);
