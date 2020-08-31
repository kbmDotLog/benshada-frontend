// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component imports
import FilterList from './FilterList.js';

// Asset imports
import { unique, sortNumAsc } from '../../../assets/js/prototypes.js';
import { filterJargon } from '../../../assets/js/filter.js';
import '../../../assets/css/slider.css';
import FilterPrice from './FilterPrice.js';

export default class Filter extends Component {
  static propTypes = {
    category: PropTypes.string,
    discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gender: PropTypes.string,
    onClick: PropTypes.func,
    price: PropTypes.object,
    prices: PropTypes.array,
    product: PropTypes.object,
    range1: PropTypes.func,
    range2: PropTypes.func,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.array
  };

  render() {
    const {
      product, category, gender, size, discount, rating, price, prices
    } = this.props;
    const ratings = filterJargon(
      unique(product.init.map(({ overallRating }) => Math.floor(overallRating)) || [])
    );
    const discounts = filterJargon(
      sortNumAsc(
        unique(
          product.init.map(({ discountPercentage }) => Math.floor(discountPercentage / 10) * 10)
            || []
        )
      )
    );
    const sizes = unique(
      product.init
        .map((item) => item && item.sizes)
        .filter((item) => item.length > 0)
        .reduce((a, b) => [...a, ...b], [])
        .map((item) => item && item.value)
    );

    return (
      <div className="col-12 col-md-3 col-xl-2 py-4">
        <div className="row">
          <FilterList
            onClick={this.props.onClick}
            active={category}
            products={product.init}
            type="category"
          />
          <FilterList
            onClick={this.props.onClick}
            active={gender}
            products={product.state}
            type="gender"
          />
          <FilterList
            onClick={this.props.onClick}
            active={size}
            products={product.init}
            type="size"
            list={sizes}
          />
          <FilterPrice
            min={Number(price.min)}
            max={Number(price.max)}
            prices={prices}
            range1={this.props.range1}
            range2={this.props.range2}
          />
          <FilterList
            onClick={this.props.onClick}
            active={discount}
            products={product.init}
            type="discount"
            list={discounts}
          />
          <FilterList
            onClick={this.props.onClick}
            active={rating}
            products={product.init}
            type="rating"
            list={ratings}
          />
        </div>
      </div>
    );
  }
}
