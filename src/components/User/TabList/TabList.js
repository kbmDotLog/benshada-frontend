// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component imports
import TabBody from './TabBody/TabBody.js';

// Start Component
export default class TabList extends Component {
  static propTypes = {
    content: PropTypes.array,
    list: PropTypes.array
  }

  render = () => this.props.list.map((item, i) => (
      <TabBody
        active={`show ${i === 0 ? 'active' : ''}`}
        name={`analytics-${item}`}
        key={`analytics-${item}`}
      >
        <div className="card-columns">{this.props.content[i]}</div>
      </TabBody>
  ))
}
// End Component
