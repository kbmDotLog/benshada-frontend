import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import NotFound from '../../../NotFound/NotFound.js';

export default class Reviews extends Component {
  static propTypes = {
    reviews: PropTypes.array
  }

  render() {
    const reviews = this.props.reviews || [];
    return reviews.length < 1 ? (
      <NotFound type="review" />
    ) : (
      <div className="card-columns products my-2">
        {reviews.map((review, i) => (
          <div className="card shadow-sm text-left" key={`review${i}`}>
            <div className="card-header bg-white d-flex">
              <img
                src="../"
                alt="Review"
                className="img-fluid rounded-circle border border-light"
                width="40"
                height="40"
              />
              <p className="flex-grow-1 mx-3 pt-3">{review && review.user}</p>
              <p className="pt-3">
                <FontAwesomeIcon className="text-primary-benshada mr-2" icon={faStar} /> <span>{review.rating}</span>
              </p>
            </div>
            <div className="card-body">
              <p>{review.description}</p>
              <small className="float-right">{new Date(review.createdAt).toDateString()}</small>
              <div className="clear"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
