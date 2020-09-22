// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Asset imports
import { addComma } from '../../../assets/js/prototypes.js';

export default class FilterPrice extends Component {
  static propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
    prices: PropTypes.array,
    range1: PropTypes.func,
    range2: PropTypes.func
  };

  render() {
    const { prices, min, max } = this.props;
    const initMin = prices[0] || 0;
    const initMax = prices[prices.length - 1] || 0;

    // Calculations
    const rangeLeft = Math.floor((min / initMax) * 100) - 10;
    const rangeRight = Math.floor((max / initMax) * 100) + 4;

    return (
      <div className="col-12 mb-4 text-capitalize">
        <h5>Price</h5>
        <div className="body">
          <div id="slider-distance">
            <div>
              <div id="inverse-left"></div>
              <div id="inverse-right"></div>
              <div
                id="range"
                style={{
                  left: `${rangeLeft}%`,
                  right: `${rangeRight}%`,
                  width: `${rangeRight - rangeLeft}%`
                }}
              ></div>
              <span
                className="thumb"
                style={{
                  left: `${rangeLeft}%`
                }}
              ></span>
              <span className="thumb" style={{ left: `${rangeRight}%` }}></span>
              <div
                className="sign"
                style={{
                  left: `${rangeLeft}%`
                }}
              >
                <span id="value">{Math.floor(min)}</span>
              </div>
              <div className="sign" style={{ left: `${rangeRight}%` }}>
                <span id="value">{Math.floor(max)}</span>
              </div>
            </div>
            <input
              id="rangeMin"
              type="range"
              tabIndex="0"
              value={Math.floor(min)}
              max={Math.floor(initMax)}
              min={Math.floor(initMin)}
              step="100"
              onChange={(e) => this.props.range1(e)}
            />

            <input
              type="range"
              tabIndex="0"
              value={Math.floor(max)}
              max={Math.floor(initMax)}
              min={Math.floor(initMin)}
              step="100"
              onChange={(e) => this.props.range2(e)}
            />
          </div>
          <div className="mt-3">
            <span className="float-left">₦{addComma(min)}</span>
            <span className="float-right">₦{addComma(max)}</span>
          </div>
        </div>{' '}
      </div>
    );
  }
}
