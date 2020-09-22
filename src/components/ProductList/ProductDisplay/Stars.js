import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';

export default class Stars extends Component {
  static propTypes = {
    count: PropTypes.number
  }

  render() {
    const { count } = this.props;
    const response = ['', '', '', '', ''];
    let i = 0;

    while (i < count) {
      response[i] = i;

      i += 1;
    }
    return response.map((j, key) => (j === '' ? (
        <FontAwesomeIcon className="text-ash mr-1" icon={faStar} key={`star${key}`} />
    ) : (
        <FontAwesomeIcon className="text-primary-benshada mr-1" icon={faStar} key={`star${key}`} />
    )));
  }
}
