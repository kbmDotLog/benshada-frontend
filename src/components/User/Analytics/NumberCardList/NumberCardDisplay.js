// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NumberCardDisplay extends Component {
  static propTypes = {
    isNaira: PropTypes.bool,
    title: PropTypes.string,
    value: PropTypes.number
  };

  render = () => (
    <div className="card shadow-sm">
      <div className="card-body">
        <p className="card-title text-uppercase">{this.props.title}</p>
        <h1 className="display-4 text-center">
          {this.props.isNaira ? <span>&#x20A6;</span> : ''}
          {this.props.value}
        </h1>
      </div>
    </div>
  );
}
