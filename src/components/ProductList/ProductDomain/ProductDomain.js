/* eslint-disable no-underscore-dangle */
/**  Module imports */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

/**  Component imports */
import ProductBanner from './ProductBanner.js';
import ProductList from '../ProductList.js';
import Reviews from './Review/Reviews.js';
import HrFr from '../../HrFr/HrFr.js';
import ProductHouse from './ProductHouse.js';

/**  Asset imports */
import 'assets/css/domain.min.css';

/**
 * Displays single product page
 * @constructor
 */
class ProductDomain extends Component {
  /** Component state */
  state = {
    product: {},
    productExists: false,
    productID: ''
  };

  /** Component propTypes */
  static propTypes = {
    location: PropTypes.object,
    products: PropTypes.array,
    user: PropTypes.object
  };

  /**
   * Fetches product based on ID
   * @param {string} productID Desired product ID
   * @param {object} products List of products
   * @return {object} The desired product
   */
  fetchProduct = (productID, products) => this.setState(
    () => ({ productID }),
    () => {
      const product = products.find(({ _id }) => _id === productID);
      this.setState(
        () => ({ productExists: product && true, product }),
        () => !this.state.productExists && <Redirect to="/" />
      );
    }
  );

  /**
   * Gets component snapshot before update
   * @param {object} prevProps
   * @param {object} prevState
   * @return {object} Snapshot
   */
  getSnapshotBeforeUpdate = (prevProps, prevState) => ({
    shouldFetchProduct: prevState.productID !== this.state.productID
  });

  /**
   * Runs after component updates
   * @param {object} prevProps
   * @param {object} prevState
   * @param {object} snapshot
   */
  componentDidUpdate = (prevProps, prevState, snapshot) => snapshot.shouldFetchProduct
    && this.fetchProduct(
      this.props.location.pathname.split('/')[2],
      this.props.products
    );

  /**
   * Runs after the component has been mounted
   */
  componentDidMount = () => this.fetchProduct(
    this.props.location.pathname.split('/')[2],
    this.props.products
  );

  /**
   * Returns ProductDomain UI
   * @return {object} the UI DOM object
   */
  render() {
    const { product, productExists } = this.state;
    const { products } = this.props;

    return (
      <HrFr>
        {productExists && (
          <>
            <section id="productDomain" className="section">
              <h1 className="d-none">Product Domain</h1>
              <ProductBanner product={product} />
              <ProductHouse product={product} />
              <Reviews reviews={product.reviews} />
            </section>

            <section className="productShowcase section">
              <ProductList
                title="Other Products From This Seller"
                isFlex={true}
                products={products.filter((item) => {
                  const id = product.shop && product.shop._id;
                  return item.shop && item.shop._id === id;
                })}
                count={12}
              />
            </section>
            <section className="productShowcase section">
              <ProductList
                title="Related Products"
                isFlex={true}
                products={products.filter(
                  (item) => item.discountPercentage === product.discountPercentage
                    || item.price === product.price
                    || item.category === product.category
                    || item.gender === product.gender
                )}
                count={12}
              />
            </section>
          </>
        )}
      </HrFr>
    );
  }
}

/**
 * Maps Redux store state to component props
 * @param {object} state
 * @return {object} Extra component props
 */
const mapStateToProps = ({ product, user }) => ({
  products: product.all,
  user: user.selected
});

/** Export component */
export default connect(mapStateToProps)(ProductDomain);
