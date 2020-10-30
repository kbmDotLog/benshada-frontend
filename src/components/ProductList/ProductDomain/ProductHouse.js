// Import modules
import React from 'react';
import PropTypes from 'prop-types';

// Component imports
import ProductImage from './ProductImage.js';
import ProductInfo from './ProductInfo.js';
import ProductParams from './ProductParams.js';
import ProductActions from './ProductActions.js';
import ProductShopType from '../ProductDisplay/ProductShopType.js';

/**
 * Displays product details on Product page
 * @constructor
 * @param {Obj} props
 * @return {Obj} The UI DOM object
 */
const ProductHouse = ({ product }) => {
  const {
    category,
    color,
    gender,
    image,
    longDescription,
    shortDescription,
    name,
    sizes,
    shop,
    weight,
    productionCountry,
    mainMaterial
  } = product;

  return (
    <article className="product-house">
      <ProductImage image={image} name={name} />
      <div className="p-4" role="contentinfo">
        <ProductInfo
          category={category}
          gender={gender}
          name={name}
          shop={shop}
        />
        <ProductParams color={color} sizes={sizes} />
        <ProductActions product={product} />
        <div className="product-description my-4">
          <p>{longDescription || shortDescription}</p>
        </div>
        <div
          className="product-params d-lg-flex justify-content-between"
          role="contentinfo"
        >
          <div className="product-weight" role="contentinfo">
            <h6 className="title">Weight</h6>
            <ul className="d-flex params-list">
              <li>{weight}</li>
            </ul>
          </div>
          <div className="product-country" role="contentinfo">
            <h6 className="title">Made In</h6>
            <ul className="d-flex params-list">
              <li>{productionCountry}</li>
            </ul>
          </div>
          <div className="product-country" role="contentinfo">
            <h6 className="title">Seller Type</h6>
            <ul className="d-flex params-list">
              <li>
                <ProductShopType product={product} />
              </li>
            </ul>
          </div>
          <div className="product-country" role="contentinfo">
            <h6 className="title">Main Material</h6>
            <ul className="d-flex params-list">
              <li>{mainMaterial}</li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
};

/** Component propTypes */
ProductHouse.propTypes = {
  product: PropTypes.object.isRequired
};

/** Export component */
export default ProductHouse;
