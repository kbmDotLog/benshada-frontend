/* eslint-disable no-underscore-dangle */
// Module imports
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Displays product page product info
 * @constructor
 * @param {Obj} props
 * @return {Obj} The UI DOM object
 */
const ProductInfo = ({
  category, gender, name, shop
}) => (
  <div className="product-info mb-lg-4" role="heading">
    <h4 className="product-info-child text-capitalize text-truncate">{name}</h4>
    <nav className="product-info-child text-uppercase" aria-label="breadcrumb">
      <ol className="breadcrumb p-0 m-0 bg-white">
        {shop && (
          <li className="breadcrumb-item text-truncate">
            <Link to={`/stores/${shop._id}`}>{shop.name}</Link>
          </li>
        )}
        {category && (
          <li className="breadcrumb-item">
            <Link to={`/catalog/?a=p&category=${category}`}>{category}</Link>
          </li>
        )}
        {gender && (
          <li className="breadcrumb-item">
            <Link to={`/catalog/?a=p&gender=${gender}`}>{gender}</Link>
          </li>
        )}
      </ol>
    </nav>
  </div>
);

/** Component propTypes */
ProductInfo.propTypes = {
  category: PropTypes.string,
  gender: PropTypes.string,
  name: PropTypes.string.isRequired,
  shop: PropTypes.object.isRequired
};

/** Export component */
export default ProductInfo;
