import React, { Component } from 'react';
import draw from './vis.js';

export default class BarChart extends Component {
  componentDidMount() {
    draw(this.props);
  }

  componentDidUpdate() {
    draw(this.props);
  }

  render = () => <div className="vis-barchart" />
}
