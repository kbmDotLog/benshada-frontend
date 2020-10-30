// Modue imports
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 *  Displays product page banner
 * @constructor
 * @param {Obj} props - Component props
 * @return {Obj} The UI DOM object
 */
const ProductBanner = ({ product }) => {
  const { category, gender, name } = product;

  return (
    <article className="text-uppercase">
      <h2 className="d-none">Navigation</h2>
      <nav className="px-0 d-none d-lg-block" aria-label="breadcrumb">
        <ol className="breadcrumb px-0 bg-white">
          <li className="breadcrumb-item">
            <Link to="/catalog/?a=p">Catalog</Link>
          </li>
          {(category || gender) && (
            <li className="breadcrumb-item">
              <Link
                to={`/catalog/?a=p&${
                  category
                    ? `category=${category.toLowerCase()}`
                    : `gender=${gender.toLowerCase()}`
                }`}
              >
                {category || gender}
              </Link>
            </li>
          )}
          <li className="breadcrumb-item active" aria-current="page">
            {name}
          </li>
        </ol>
      </nav>
    </article>
  );
};

/** Component propTypes */
ProductBanner.propTypes = {
  product: PropTypes.object.isRequired
};

/** Export component */
export default ProductBanner;
