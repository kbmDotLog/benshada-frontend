// Module imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Component imports
import Sidenav from '../SideNav/SideNav.js';

export default class Lookbook extends Component {
  static propTypes = {
    data: PropTypes.object,
    flipped: PropTypes.bool,
    list: PropTypes.array,
    variant: PropTypes.string
  };

  render = () => (
    <section
      className={`products-strata ${
        this.props.flipped && 'products-strata-flipped'
      } section position-relative`}
    >
      <h2 className="d-none">Featured Shops base on paid ads</h2>

      <article className="d-flex align-items-center">
        <div
          className="d-none d-lg-block bg-secondary-gradient big shadow-sm"
          style={{
            background: `url(${this.props.data.bgBig}) no-repeat bottom left/cover`
          }}
        ></div>
        <div>
          <div
            className="small bg-secondary-gradient shadow-sm"
            style={{
              background: `url(${this.props.data.bgSmall}) no-repeat bottom left/cover`
            }}
          ></div>
          <div className="small-text-holder px-4 px-lg-0">
            <div className="bg-white p-3 shadow-sm">
              <h5 className="year text-uppercase position-relative">
                NEW
                <br />
                collection
              </h5>
              <h2 className="my-4 my-lg-5">{this.props.data.title}</h2>
              <p>
                <Link to={this.props.data.to} className="btn btn-primary-benshada">
                  See More
                </Link>
              </p>
            </div>
          </div>
        </div>
      </article>

      <Sidenav list={this.props.data.list || ['Accessories', 'Bags', 'Shoes']} variant={this.props.variant} />
    </section>
  );
}
