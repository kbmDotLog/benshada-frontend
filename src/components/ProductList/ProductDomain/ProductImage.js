// Module imports
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays product page product images
 * @constructor
 * @param {object} props
 * @return {object} The UI DOM object
 */
const ProductImage = ({ image, name }) => (
  <div className="product-image-showcase" role="none">
    <div className="product-image-main" role="banner">
      <div className="img-holder" role="img">
        <img src={image[0]} alt={name} className="img-fluid" />
      </div>
    </div>
    <div className="product-image-gallery d-flex" role="none">
      {image
        .filter((item, i) => i !== 0)
        .map((src) => (
          <div key={src} className="img-holder" role="img">
            <img src={src} alt={name} className="img-fluid" />
          </div>
        ))}
    </div>
  </div>
);

/** Component propTypes */
ProductImage.propTypes = {
  image: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};

/** Export component */
export default ProductImage;
