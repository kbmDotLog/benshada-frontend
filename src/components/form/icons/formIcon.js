// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class FormIcon extends Component {
  static propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  };

  render = () => (this.props.icon ? (
      <div className="form-icon">
        <FontAwesomeIcon icon={this.props.icon} />
      </div>
  ) : (
    ''
  ));
}
