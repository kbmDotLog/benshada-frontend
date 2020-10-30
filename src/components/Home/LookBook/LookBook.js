/** Module imports */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Component imports */
import SideNav from 'components/Home/SideNav/SideNav.js';

/**
 * Displays store lookbook
 * @constructor
 * @param {Obj} props
 * @return The UI DOM object
 */
const LookBook = ({
  data, flipped, variant
}) => (
  <section
    className={`products-strata ${
      flipped && 'products-strata-flipped'
    } section position-relative`}
  >
    <article className="d-flex align-items-center">
      <div
        className="d-none d-lg-block bg-secondary-gradient big shadow-sm"
        style={{
          background: `url(${data.bgBig}) no-repeat bottom left/cover`
        }}
      ></div>
      <div>
        <div
          className="small bg-secondary-gradient shadow-sm"
          style={{
            background: `url(${data.bgSmall}) no-repeat bottom left/cover`
          }}
        ></div>
        <div className="small-text-holder px-4 px-lg-0">
          <div className="bg-white p-3 shadow-sm">
            <h5 className="year text-uppercase position-relative">
              NEW
              <br />
              collection
            </h5>
            <h2 className="my-4 my-lg-5">{data.title}</h2>
            <p>
              <Link to={data.to} className="btn btn-primary-benshada">
                Shop Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </article>

    <SideNav
      list={data.list}
      variant={variant}
    />
  </section>
);

/** Component propTypes */
LookBook.propTypes = {
  data: PropTypes.object,
  flipped: PropTypes.bool,
  variant: PropTypes.string
};

/** Export component */
export default LookBook;
