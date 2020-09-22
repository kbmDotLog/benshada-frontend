/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Image from '../../../Image/Image.js';
import ButtonTestimonialOwner from './Buttons/ButtonTestimonialOwner.js';
import ButtonTestimonialAdmin from './Buttons/ButtonTestimonialAdmin.js';

class TestimonialDisplay extends Component {
  static propTypes = {
    authUser: PropTypes.object,
    testimonial: PropTypes.object
  };

  renderActionButtons = (testimonial) => {
    if (this.props.authUser._id === testimonial.user._id) {
      return <ButtonTestimonialOwner testimonial={testimonial} />;
    }

    if (this.props.authUser && this.props.authUser.type === 'ADMIN') {
      return <ButtonTestimonialAdmin testimonial={testimonial} />;
    }
    return false;
  };

  render = () => {
    const { user, testimony } = this.props.testimonial;

    return (
      <div className="card shadow-sm my-3">
        <div className="card-header text-left bg-white">
          <Image size={1} type="user" xtraClass="d-inline-block mr-2 text-dark" />
          <span className="text-capitalize">{user && user.name}</span>
          {this.renderActionButtons(this.props.testimonial)}
        </div>
        <div className="card-body">
          <p>{testimony}</p>
        </div>
      </div>
    );
  };
}

const mapStateToProps = ({ user }) => ({ authUser: user.selected });

export default connect(mapStateToProps)(TestimonialDisplay);
