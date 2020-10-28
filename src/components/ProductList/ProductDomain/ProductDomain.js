/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

// Component imports
import Image from '../../Image/Image.js';
import ProductsBanner from './ProductsBanner.js';
import ProductList from '../ProductList.js';
import ButtonProductOwner from '../ProductDisplay/Buttons/ButtonProductOwner.js';
import ButtonProductBuyer from '../ProductDisplay/Buttons/ButtonProductBuyer.js';
import Review from './Review/Review.js';
import Reviews from './Review/Reviews.js';
import Price from '../ProductDisplay/Price.js';
import HrFr from '../../HrFr/HrFr.js';

export default class ProductDomain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      product: {}
    };
  }

  static propTypes = {
    products: PropTypes.array,
    user: PropTypes.object
  };

  renderActionButtons = () => {
    const { product } = this.state;
    const { user } = this.props;
    const shops = (user && user.shops) || [];
    const { shop, isBatch } = product;

    if (
      shops.map((item) => item && item._id).includes(shop && shop._id)
      || (user && user.type === 'ADMIN')
    ) {
      return <ButtonProductOwner product={product} user={user} />;
    }

    if (isBatch && (user && user.type) === 'UB') {
      return <ButtonProductBuyer product={product} user={user} />;
    }

    if (!isBatch && (user && user.type) === 'UC') {
      return <ButtonProductBuyer product={product} user={user} />;
    }

    return user && user._id === undefined ? (
      <ButtonProductBuyer product={product} user={user} />
    ) : (
      ''
    );
  };

  getProduct = (ID) => this.props.products.filter(({ _id }) => _id === ID)[0];

  getSnapshotBeforeUpdate = (prevProps, prevState) => ({
    shouldRerender: prevState._id !== this.state._id
  });

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    const ID = window.location.pathname.split('/')[2];
    if (snapshot.shouldRerender) {
      this.setState({ _id: ID, product: this.getProduct(ID) });
    }
  };

  componentDidMount = () => {
    const ID = window.location.pathname.split('/')[2];
    this.setState({ _id: ID, product: this.getProduct(ID) });
  };

  render() {
    const { product } = this.state;
    const category = product && product.category;
    const image = product && product.image;
    const name = product && product.name;
    const _id = product && product._id;
    const gender = product && product.gender;
    const discountPercentage = product && product.discountPercentage;
    const shortDescription = product && product.shortDescription;
    const shop = product && product.shop;
    const guarantee = product && product.category;
    const sizes = product && product.sizes;
    const color = product && product.color;
    const mainMaterial = product && product.mainMaterial;
    const reviews = product && product.reviews;
    const inStock = product && product.inStock;
    const price = product && product.price;
    const longDescription = product && product.longDescription;
    const productionCountry = product && product.productionCountry;

    return !product ? <Redirect to="/" /> : (
      <HrFr>
          <ProductsBanner
            headers={[
              { name: 'category', value: category },
              { name: 'q', value: name }
            ]}
          />

          <div className="bg-white my-0 py-0">
            <div className="container">
              <div className="row py-4">
                <div className="col-12 col-md-6 mb-3 mb-md-0 border border-light px-5 py-3 product-gallery">
                  <div className="product-gallery-active-image rounded" style={{ height: '350px', overflow: 'hidden' }}>
                    <Image name={name} image={image} type="product" size={6} id={_id} />
                  </div>
                </div>
                <div className="col-12 col-md-6 p-3">
                  <div className="clear"></div>
                  <h4>{name}</h4>
                  <Review i={0} product={product} />
                  <p>{shortDescription}</p>

                  <div className="row">
                    <div className="col-6 my-1">
                      <strong>Shop</strong>{' '}
                    </div>
                    <div className="col-6 my-1">
                      <Link to={`/stores/${shop && shop._id}`} className="text-primary-benshada">
                        {shop && shop.name}
                      </Link>
                    </div>
                    <div className="col-6 my-1">
                      <strong>Guarantee</strong>{' '}
                    </div>
                    <div className="col-6 my-1">
                      <strong>{guarantee || 0}</strong> days
                    </div>
                    <div className="col-6 my-1">
                      <strong>Availability</strong>{' '}
                    </div>
                    <div className="col-6 my-1">
                      {inStock ? (
                        <strong className="text-success">In Stock</strong>
                      ) : (
                        <strong className="text-danger">Out of Stock</strong>
                      )}
                    </div>
                  </div>
                  <p className="mt-3">{this.renderActionButtons()}</p>
                  <h3 className="float-right">
                    <Price price={price} discount={discountPercentage} />
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="container py-4">
            <div className="row justify-content-between">
              <div className="col-12 col-md-7">
                <div className="row text-uppercase">
                  <div className="col-12 pb-3">
                    <h5>Description</h5>
                    <p>{longDescription}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 pb-3 text-uppercase">
                    <h5>Specifications</h5>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Gender</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{gender}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Sizes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{sizes && sizes[0] && sizes[0].value}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Color</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><span className='py-2 px-5 rounded' style={{ background: color }}></span></td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Main Material</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{mainMaterial}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Weight</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{sizes && sizes[0] && sizes[0].value}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Production Country</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{productionCountry}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="row p-3 shadow-sm">
                <h5>Reviews</h5>
                <Reviews reviews={reviews} />
              </div>
              </div>
            </div>
          </div>

          <div className="container py-4">
            <ProductList
              products={this.props.products}
              type={{ name: 'category', value: category }}
              title="Similar Category"
              count={4}
            />
          </div>
          <div className="container py-4">
            <ProductList
              products={this.props.products}
              type={{ name: 'gender', value: gender }}
              title='Similar Gender'
              count={4}
            />
          </div>
          <div className="container py-4">
            <ProductList
              products={this.props.products}
              type={{ name: 'discountPercentage', value: discountPercentage }}
              title="Similar Discount"
              count={4}
            />
          </div>
      </HrFr>
    );
  }
}
