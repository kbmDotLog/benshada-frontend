/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faStar, faUndo } from '@fortawesome/free-solid-svg-icons';

// Component imports
import ifSeller from 'assets/js/ifSeller.js';
import Price from './Price.js';
// import Rating from '../../Rating/Rating.js';
// import Returns from '../../Returns/Returns.js';
import ButtonProductBuyer from './Buttons/ButtonProductBuyer.js';
import ButtonProductOwner from './Buttons/ButtonProductOwner.js';

// Asset imports
import 'assets/css/product.min.css';

class ProductDisplay extends Component {
  static propTypes = {
    product: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    stores: PropTypes.array,
    orders: PropTypes.array,
    user: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    users: PropTypes.array
  };

  renderActionButtons = (product) => {
    const { user } = this.props;
    const shops = (user && user.shops) || [];
    const { shop, isBatch } = product;

    if (
      shops.map((item) => item && item._id).includes(shop && shop._id)
      || (user && user.type === 'ADMIN')
    ) {
      return <ButtonProductOwner product={product} user={user} />;
    }

    if (
      (isBatch && (user && user.type) === 'UB')
      || (!isBatch && (user && user.type) === 'UC')
      || (user && user._id === undefined)
    ) {
      return <ButtonProductBuyer product={product} user={user} />;
    }

    return false;
  };

  shopType = ({ shop }) => {
    const { users, stores } = this.props;
    const shopID = shop && shop._id;
    const shopFull = stores.filter(({ _id }) => _id === shopID)[0];
    const shopOwner = shopFull && shopFull.user;
    const shopOwnerID = shopOwner && shopOwner._id;
    const shopOwnerFull = users.filter(({ _id }) => _id === shopOwnerID)[0];
    const shopOwnerType = shopOwnerFull && shopOwnerFull.type;

    return ifSeller(shopOwnerType)[1];
  };

  getSales = ({ _id }, orders) => orders.filter(({ product, status }) => product === _id && status === 'paid').length;

  render() {
    const { product } = this.props;
    const {
      _id,
      name,
      image,
      price,
      discountPercentage,
      overallRating,
      returns,
      quantity,
      longDescription
    } = product;

    const imgHolderStyle = (image && image.length) > 0
      ? {
        background: `url(${image[0]}) no-repeat bottom left/cover`
      }
      : {};
    const shopType = this.shopType(product);

    return (
      <>
        {/* <div className="card mb-4 product rounded border-0" key={`product${_id}`}>
      <div className="card-body p-0">
        <div className="text-left p-3">
          <div className="d-flex">
            <div className="d-flex flex-grow-1 justify-content-start">
              <Rating rating={overallRating} xtraClass="mr-2" />
              <Returns returns={returns} />
            </div>
          </div>
        </div>
      </div>
    </div> */}
        <article className="product shadow">
          <div className="img-holder position-relative text-center" style={imgHolderStyle}>
            <div className="product-actions position-absolute p-3">
              {this.renderActionButtons(product)}
            </div>
            <div className="img-holder-cover bg-secondary-gradient position-absolute w-100 h-100 v-parent ">
              <p className="v-child p-3 px-5 h-50 d-none d-lg-block product-description text-white">
                {longDescription}
              </p>
            </div>
          </div>
          <div className="position-relative mb-3 product-info py-2 px-3">
            <div className="product-type">
              <span
                className={`badge badge-${
                  shopType === 'Manufacturer' ? 'primary-benshada' : 'primary'
                } text-white font-weight-bold`}
                role="contentinfo"
              >
                {shopType}
              </span>
            </div>
            <Link to={`/products/${_id}`} className="name text-capitalize text-truncate">
              {name}
            </Link>
            <h4 className="product-price">
              <Price price={price} discount={discountPercentage} />
            </h4>
            <div className="product-actions justify-content-start">
              <span className="mr-3" role="contentinfo">
                <FontAwesomeIcon icon={faStar} className="text-primary-benshada" /> {overallRating}
              </span>
              <span className="mr-3" role="contentinfo">
                <FontAwesomeIcon icon={faUndo} className="text-danger" /> {returns}
              </span>
              <span role="contentinfo">
                <FontAwesomeIcon icon={faCheck} className="text-success" />{' '}
                {this.getSales(product, this.props.orders)}
              </span>
            </div>
            <p
              className={`text-${
                quantity > 0 ? 'success' : 'danger'
              } text-uppercase mt-2 font-weight-bold`}
            >
              {quantity > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
        </article>
      </>
    );
  }
}

const mapStateToProps = ({ user, store, order }) => ({
  user: user.selected,
  stores: store.all,
  orders: order.all,
  users: user.all
});

export default connect(mapStateToProps)(ProductDisplay);
