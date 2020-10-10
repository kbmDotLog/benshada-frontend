// Module imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Sidenav extends Component {
  static propTypes = {
    list: PropTypes.array,
    variant: PropTypes.string
  };

  render = () => (
    <div className={`side-nav side-nav-${this.props.variant} d-none d-xl-block`}>
      <ul className="v-child">
        {this.props.list.map((item, i) => (
          <li key={`side-nav-list-${i}`}>
            <Link
              to={`/catalog/?a=p&${
                item.length ? `category=${item.toLowerCase()}` : `discount=${item}`
              }`}
            >
              {item.length ? item : `${item}% & above`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
