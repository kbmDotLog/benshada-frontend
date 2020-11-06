/** Module imports */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Asset imports */
import categories from 'assets/js/categories';

/**
 * Displays sidenav
 * @constructor
 * @param {object} props
 * @return The UI DOM object
 */
const SideNav = ({ list, variant }) => (
  <div className={`side-nav side-nav-${variant} d-none d-xl-block`}>
    <ul className="v-child">
      {(
        list || categories.filter((item, i) => i !== 0).map(({ name }) => name)
      ).map((item, i) => (
        <li key={`side-nav-list-${i}`}>
          <Link
            to={`/catalog/?a=p&${
              item.length
                ? `category=${item.toLowerCase()}`
                : `discount=${item}`
            }`}
          >
            {item.length ? item : `${item}% & above`}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/** Component propTypes */
SideNav.propTypes = {
  list: PropTypes.array,
  variant: PropTypes.string
};

/** Export component */
export default SideNav;
