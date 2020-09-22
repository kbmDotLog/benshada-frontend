// Module imports
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Action Imports
import { testimonialsOneSelected } from '../../../../../redux/actions/testimonials.js';

// Start Component
class ButtonTestimonialAdmin extends React.Component {
  static propTypes = {
    testimonial: PropTypes.object,
    testimonialsOneSelected: PropTypes.func
  };

  render = () => (
      <span className="pointer ml-2" data-toggle="modal" data-target="#testimonialDeleteModal">
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => this.props.testimonialsOneSelected(this.props.testimonial)}
        />
      </span>
  );
}
// End Component

export default connect(null, { testimonialsOneSelected })(ButtonTestimonialAdmin);
