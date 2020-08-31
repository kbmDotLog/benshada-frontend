// Module imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Component imports
import Reviews from './Reviews.js';
import Stars from '../../ProductDisplay/Stars.js';

class Review extends Component {
  static propTypes = {
    orders: PropTypes.array,
    className: PropTypes.string,
    product: PropTypes.object
  }

  renderProductReview = (reviews) => {
    const { orders } = this.props;
    const orderedProductIds = [];

    orders.forEach(({ products }) => products.forEach(({ _id }) => {
      orderedProductIds.push(_id);
    }));

    return <Reviews reviews={reviews} />;
  };

  render() {
    const { product, className } = this.props;
    const { overallRating } = product;

    return (
      <p className={`${className}`}>
        <Stars count={overallRating} />
      </p>
    );
  }
}

const mapStateToProps = ({ auth, order }) => ({
  isSignedIn: auth.isSignedIn,
  orders: order.all
});

export default connect(mapStateToProps, {})(Review);
