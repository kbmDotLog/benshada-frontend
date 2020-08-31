// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component imports
import NumberCardDisplay from './NumberCardDisplay.js';

// Start Component
export default class NumberCardList extends Component {
  static propTypes = {
    list: PropTypes.array
  };

  render = () => this.props.list.map(({ isNaira, title, value }, i) => (
      <NumberCardDisplay
        isNaira={isNaira}
        title={title}
        value={value}
        key={`number-card-display${i}`}
      />
  ));
}
// End Component
