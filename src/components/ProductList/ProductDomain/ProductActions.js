// Module imports
import React from 'react';
import PropTypes from 'prop-types';

// Component imports
import Price from 'components/ProductList/ProductDisplay/Price';
import ButtonProductBuyer from 'components/ProductList/ProductDisplay/Buttons/ButtonProductBuyer';
import ButtonProductOwner from 'components/ProductList/ProductDisplay/Buttons/ButtonProductOwner';
import ProductSales from 'components/ProductList/ProductDisplay/ProductSales';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUndo } from '@fortawesome/free-solid-svg-icons';

/**
 * Displays action users can take on the product on the Product page
 * @constructor
 * @param {object} props
 * @return {object} The UI DOM object
 */
const ProductActions = ({ product, user, shops }) => {
  const {
    discountPercentage,
    isBatch,
    price,
    quantity,
    returns,
    overallRating,
    shop
  } = product;

  return (
    <div className="product-actions">
      <div className="d-lg-flex align-items-center justify-content-between">
        <h4 className="product-price mb-lg-0">
          <Price price={price} discount={discountPercentage} />
        </h4>
      </div>

      {quantity < 1 && (
        <p className="my-2 my-lg-0 mr-lg-3 text-uppercase text-danger font-weight-bold">
          Out of stock
        </p>
      )}

      {isBatch && (
        <p className="my-2 my-lg-0 mr-lg-3 text-uppercase text-danger font-weight-bold">
          <span
            className="badge badge-secondary text-white font-weight-bold"
            role="contentinfo"
          >
            batch
          </span>
        </p>
      )}

      <p className="my-2 my-lg-0 mr-lg-3">
        <ButtonProductBuyer isBatch={isBatch} product={product} user={user} />
        <ButtonProductOwner
          shops={shops}
          shop={shop}
          product={product}
          user={user}
        />
      </p>
      <p className="my-2 my-lg-0 mr-lg-3">
        <span className="mr-3" role="contentinfo">
          <FontAwesomeIcon icon={faStar} className="text-primary-benshada" />
          {overallRating}
        </span>
        <span className="mr-3" role="contentinfo">
          <FontAwesomeIcon icon={faUndo} className="text-danger" /> {returns}
        </span>
        <ProductSales prod={product} />
      </p>
    </div>
  );
};

/** Component propTypes */
ProductActions.propTypes = {
  product: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  shops: PropTypes.array.isRequired
};

/** Component mapStateToProps */
const mapStateToProps = ({ store, user }) => ({
  shops: store.all,
  user: user.selected
});

/** Export Component */
export default connect(mapStateToProps)(ProductActions);
