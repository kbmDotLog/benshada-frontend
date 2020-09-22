import React, { Component } from 'react';

import PropTypes from 'prop-types';
import TestimonialDisplay from './TestimonialDisplay/TestimonialDisplay.js';

export default class TestimonialList extends Component {
  static propTypes = {
    testimonials: PropTypes.array,
    title: PropTypes.string,
    count: PropTypes.number
  };

  renderTestimonies = (testimonials) => testimonials
    .slice(0, this.props.count)
    .map((testimonial, i) => (
        <TestimonialDisplay testimonial={testimonial} key={`testimonial${i}`} />
    ));

  render() {
    const { testimonials, title } = this.props;

    return (
      <div className="container my-4">
        <h4 className="text-center text-capitalize">{title}</h4>
        <div className="cards testimonials">{this.renderTestimonies(testimonials)}</div>
      </div>
    );
  }
}
