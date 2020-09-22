import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class FormIcon extends Component {
  static propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  };

  render = () => (this.props.icon && this.props.icon !== undefined && this.props.icon !== null ? (
      <div className="form-icon">
        <FontAwesomeIcon icon={this.props.icon} />
      </div>
  ) : (
    ''
  ));
}
