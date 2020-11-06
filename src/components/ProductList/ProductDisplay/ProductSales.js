// Module imports
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

/**
 * Displays number of sales for a product
 * @constructor
 * @param {object} props
 * @return The UI DOM object
 */
const ProductSales = ({ prod, orders }) => {
  const getSales = ({ _id }) => orders.filter(({ product, status }) => product === _id && status === 'paid')
    .length;

  return (
    <span role="contentinfo">
      <FontAwesomeIcon icon={faCheck} className="text-success" />{' '}
      {getSales(prod)}
    </span>
  );
};

/** Component propTypes */
ProductSales.propTypes = {
  prod: PropTypes.object.isRequired,
  orders: PropTypes.array
};

/**
 * Maps redux state to props
 * @param {object} state
 * @return
 */
const mapStateToProps = ({ order }) => ({ orders: order.all });

/** Export component */
export default connect(mapStateToProps)(ProductSales);
