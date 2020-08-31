import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { testimonialsOneSelected } from '../../../../../redux/actions/testimonials.js';

class ButtonTestimonialOwner extends React.Component {
  static propTypes = {
    testimonial: PropTypes.object,
    testimonialsOneSelected: PropTypes.func
  };

  render = () => (
    <>
      <span className="pointer" data-toggle="modal" data-target="#testimonialModal">
        <FontAwesomeIcon
          icon={faPencilAlt}
          onClick={() => this.props.testimonialsOneSelected(this.props.testimonial)}
        />
      </span>
      <span className="pointer ml-2" data-toggle="modal" data-target="#testimonialDeleteModal">
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => this.props.testimonialsOneSelected(this.props.testimonial)}
        />
      </span>
    </>
  );
}

export default connect(null, { testimonialsOneSelected })(
  ButtonTestimonialOwner
);
