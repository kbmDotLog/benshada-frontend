import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons';

export default class Returns extends Component {
  static propTypes = {
    returns: PropTypes.number
  };

  render = () => (
    <span>
      <FontAwesomeIcon icon={faUndoAlt} className="mr-1" />
      {this.props.returns}
    </span>
  );
}
