/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

// Component imports
import FormField from '../../../form/formField.js';

// Asset imports
import { testimonialValidate as validate } from '../../../../assets/js/validate.js';
import '../../../../assets/css/form.css';
import Loading from '../../../../assets/js/loading.js';

// Action imports
import { testimonialUpdate, testimonialAdd } from '../../../../redux/actions/testimonials.js';
import discardModal from '../../../../assets/js/discardModal.js';

// Start Component
class TestimonialForm extends Component {
  INIT = {
    animationClass: 'animate__zoomIn',
    buttonValue: null
  };

  constructor(props) {
    super(props);

    this.state = this.INIT;
  }

  static propTypes = {
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    handleSubmit: PropTypes.func,
    testimonial: PropTypes.object,
    testimonialAdd: PropTypes.func,
    testimonialUpdate: PropTypes.func,
    initialValues: PropTypes.object,
    initialize: PropTypes.func,
    user: PropTypes.object
  };

  submit = (testimonialData) => {
    const { testimonial, user } = this.props;
    const testimonialID = testimonial && testimonial._id;
    const userID = user && user._id;

    this.setState({
      buttonValue: <Loading />
    });

    const res = testimonialID
      ? this.props.testimonialUpdate(testimonialID, {
        testimony: testimonialData && testimonialData.testimony
      })
      : this.props.testimonialAdd({ ...testimonialData, user: userID });

    return res
      .then((response) => toast.success(
        (response && response.value && response.value.data && response.value.data.message)
            || (response && response.statusText)
            || 'Success'
      ))
      .catch((err) => toast.error(
        (err && err.response && err.response.data && err.response.data.message)
            || (err
              && err.response
              && err.response.data
              && err.response.data.message
              && err.response.data.message.name)
            || (err && err.response && err.response.statusText)
            || 'Network error'
      ))
      .finally(() => {
        this.setState(this.INIT);

        discardModal();
      });
  };

  componentWillUnmount() {
    this.setState({ animationClass: 'animate__slideOutLeft' });
  }

  getSnapshotBeforeUpdate = (prvP) => ({
    shouldInitialize:
      (prvP.testimonial && prvP.testimonial._id)
      !== (this.props.testimonial && this.props.testimonial._id)
  });

  componentDidUpdate = (prvP, prvS, snapshot) => (snapshot.shouldInitialize
    ? (this.props.initialize(this.props.testimonial),
    this.setState({
      buttonValue: this.props.testimonial && this.props.testimonial._id ? 'Update' : 'Submit'
    }))
    : '');

  componentDidMount = () => this.setState({ buttonValue: 'Submit' });

  render() {
    const { animationClass, buttonValue } = this.state;
    const { _id } = this.props.testimonial;

    return (
      <form
        onSubmit={this.props.handleSubmit(this.submit)}
        className={`animate__animated ${animationClass} m-0`}
        autoComplete="off"
      >
        <h2 className="mb-0">{_id ? 'Edit' : 'New'} testimonial</h2>
        <p>
          Make changes to your testimonial
          <FontAwesomeIcon icon={faUserEdit} className="ml-2" />
        </p>
        <div className="form-row">
          <Field
            action="testimonial"
            name="testimony"
            type="textarea"
            component={FormField}
            label="Testimony"
            className="col-12"
            placeholder="e.g Benshada's place meets all my fashion needs"
          />
        </div>

        <div className="button-group">
          <button className="btn btn-primary" type="submit">
            {buttonValue}
          </button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">
            Done
          </button>
        </div>
      </form>
    );
  }
}
// End Component

const warn = () => ({});

const mapStateToProps = ({ testimonial, user }) => ({
  testimonial: testimonial.selected,
  user: user.selected
});

export default reduxForm({
  form: 'testimonialForm',
  validate,
  warn
})(connect(mapStateToProps, { testimonialUpdate, testimonialAdd })(TestimonialForm));
