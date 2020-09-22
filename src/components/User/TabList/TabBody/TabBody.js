// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Start Component
export default class TabBody extends Component {
  static propTypes = {
    active: PropTypes.string,
    name: PropTypes.string,
    children: PropTypes.element
  };

  render() {
    return (
      <div
        className={`tab-pane fade ${this.props.active} py-3`}
        id={this.props.name}
        role="tabpanel"
        aria-labelledby={`${this.props.name}-tab`}
      >
        {this.props.children}
      </div>
    );
  }
}
// End Component
