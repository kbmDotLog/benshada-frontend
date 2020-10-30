/** Module imports */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Component imports */
import SideNav from 'components/Home/SideNav/SideNav.js';

/** Asset imports */
import categories from 'assets/js/categories.js';
import 'assets/css/jumbo.min.css';

/**
 * Displays Jumbotron
 * @param {Obj} props
 * @return The UI DOM object
 */
const Jumbotron = ({
  description,
  isSignedIn,
  storeProducts,
  subTitle,
  title
}) => {
  /**
   * Renders action button to create shop
   */
  const renderCreateShop = () => !isSignedIn && (
      <p>
        <Link to="/register" className="btn btn-primary-benshada py-4 w-100">
          Create Your Shop
        </Link>
      </p>
  );

  /**
   * Lists Jumbo images
   */
  const listJumboImages = () => (description
    ? storeProducts.splice(0, 4).map(({ image, _id }, i) => (
          <Link
            to={`/products/${_id}`}
            className={`carousel-item bg-secondary-gradient h-100 ${
              i === 0 && 'active'
            }`}
            key={_id}
            style={{
              background: `url(${image[0]}) no-repeat bottom left/cover`
            }}
          ></Link>
    ))
    : categories.map(({ name }, i) => (
          <Link
            to={`/catalog?a=p&category=${name}`}
            className={`carousel-item bg-secondary-gradient h-100 ${
              i === 0 && 'active'
            }`}
            key={name}
          ></Link>
    )));

  /** Address for shop now button */
  const shopNowAddress = description
    ? { hash: '#shopProductShowcase' }
    : '/catalog?a=p';

  return (
    <>
      <section
        id="jumbo"
        className={`jumbo ${!description && 'jumbo-home'} position-relative`}
      >
        <h2 className="d-none">Jumbo</h2>
        <article className="jumbotron jumbotron-fluid bg-white py-0 h-100">
          <div className="container-fluid h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12 col-xl p-4 d-none d-xl-block">
                <div className="intro">
                  <h4 className="year text-uppercase position-relative">
                    {title}
                  </h4>
                  <hgroup className="my-4 my-xl-5 pl-xl-5">
                    <h4 className="display-4">{subTitle}</h4>
                    {description && <h6>{description}</h6>}
                  </hgroup>
                  <p className="lead">
                    <Link
                      to={shopNowAddress}
                      className="btn btn-primary d-xl-none rounded-0"
                      role="button"
                    >
                      Shop Now
                    </Link>

                    <Link
                      className="btn btn-primary d-none d-xl-inline-block rounded-0"
                      to={shopNowAddress}
                      role="button"
                    >
                      Shop Now
                    </Link>
                  </p>
                </div>
              </div>
              <div
                id="carouselId"
                className="col-12 col-xl-9 px-0 carousel slide h-100"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  {Array.from('link').map((str, i) => (
                    <li
                      data-target="#carouselId"
                      data-slide-to={i}
                      className={i === 0 && 'active'}
                      key={`link-${str}`}
                    ></li>
                  ))}
                </ol>
                <div className="carousel-inner h-100" role="listbox">
                  {listJumboImages(description, storeProducts)}
                </div>
                <a
                  className="carousel-control-prev v-child"
                  href="#carouselId"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next v-child"
                  href="#carouselId"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </article>
        <SideNav list={['Accessories', 'Bags', 'Shoes']} />
      </section>
      {renderCreateShop(isSignedIn)}
    </>
  );
};

/**
 * Component propTypes
 */
Jumbotron.propTypes = {
  description: PropTypes.bool,
  isSignedIn: PropTypes.bool.isRequired,
  storeProducts: PropTypes.array,
  subTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

/** Export component */
export default Jumbotron;
