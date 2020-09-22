import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

export default class ProductsBanner extends Component {
  static propTypes = {
    headers: PropTypes.array
  };

  render() {
    const { headers } = this.props;
    return (
      <nav aria-label="breadcrumb" className="bg-warning container-fluid pt-5">
        <ol className="breadcrumb bg-warning py-3 container">
          <li className="breadcrumb-item">
            <Link to="/"> Home </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/catalog/?a=p"> All Products </Link>
          </li>
          {headers === undefined
            ? ''
            : headers.map(({ name, value }, i) => (!value ? '' : (
                <li key={`ProductBanner${i}`} className="text-capitalize breadcrumb-item">
                  {name === 'q' ? value : <Link
                    to={`/catalog/?a=p&${name}=${value}`}
                  >
                    {value}
                  </Link>}
                </li>
            )))}
        </ol>
      </nav>
    );
  }
}
