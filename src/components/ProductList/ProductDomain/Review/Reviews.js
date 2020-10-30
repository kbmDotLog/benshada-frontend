/** Module imports */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

/** Asset imports */
import 'assets/css/review.min.css';

/**
 * Displays product rreviews
 * @constructor
 * @param {Obj} param0
 * @return {Obj} Returns the UI DOM object
 */
const Reviews = ({ reviews }) => (reviews || []) && (
    <article>
      <h3>Reviews</h3>
      <div className="d-flex flex-wrap justify-content-between mb-5">
        {reviews.map((review, i) => (
          <div key={`review-${i}`} className="product-review shadow-sm">
            <header className="d-flex mb-2 align-items-center justify-content-between">
              <div className="product-review-info d-flex align-items-center">
                <div className="img-holder rounded-circle mr-2">
                  <img src="#" alt="" className="img-fluid" />
                </div>
                <hgroup>
                  <h5>{review.user}</h5>
                  {/* <h6>Seller</h6> */}
                </hgroup>
              </div>
              <div>
                <span className="mr-3" role="contentinfo">
                  <FontAwesomeIcon
                    className="text-primary-benshada mr-2"
                    icon={faStar}
                  />{' '}
                  {review.rating}
                </span>
              </div>
            </header>
            <footer>
              <p>{review.description}</p>
            </footer>
          </div>
        ))}
      </div>
    </article>
);

/** Component propTypes */
Reviews.propTypes = {
  reviews: PropTypes.array.isRequired
};

/** Export component */
export default Reviews;
