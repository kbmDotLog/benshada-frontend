import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default class Rating extends Component {
  static propTypes = {
    rating: PropTypes.number,
    xtraClass: PropTypes.string
  };

  render = () => (
    <span className={this.props.xtraClass}>
      <FontAwesomeIcon icon={faStar} className="mr-1" />
      {this.props.rating}
    </span>
  );
}
