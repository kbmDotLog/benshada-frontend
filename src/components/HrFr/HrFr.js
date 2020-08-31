// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

// Component imports
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Plus from '../Plus/Plus.js';
import TestimonialForm from '../Home/TestimonialList/TestimonialDisplay/TestimonialForm.js';

// Action imports
import { testimonialsOneSelected, testimonialDelete } from '../../redux/actions/testimonials.js';
import Loading from '../../assets/js/loading.js';
import discardModal from '../../assets/js/discardModal.js';

// Start Component
class HrFr extends Component {
  INIT = {
    plusButtonIcon: 'plus',
    btnDelete: 'Delete'
  };

  constructor(props) {
    super(props);

    this.state = this.INIT;
  }

  static propTypes = {
    children: PropTypes.any,
    selectedTestimonial: PropTypes.object,
    testimonialDelete: PropTypes.func,
    testimonialsOneSelected: PropTypes.func,
    user: PropTypes.object
  };

  handleNewItems = () => this.props.testimonialsOneSelected({});

  render() {
    return (
      <>
        <div className="bg-light-benshada">
          <Header />
          <div className="" style={{ minHeight: '69vh' }}>
            {this.props.children}
          </div>
          <Plus
            handleNewItems={this.handleNewItems}
            user={this.props.user}
            newItems={[
              {
                name: 'testimonial',
                icon: faBullhorn,
                users: ['UA', 'UB', 'UC', 'UDC', 'user', 'a', 'b', 'c']
              }
            ]}
          />
          <Footer />
        </div>
        <div>
          <div
            className="modal fade"
            id="testimonialModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modelTitleId"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content" id="formContainer">
                <div className="modal-body form-container-holder">
                  <TestimonialForm />
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="testimonialDeleteModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modelTitleId"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete testimonial</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">Are you sure you want to delete this testimonial?</div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      this.setState({ btnDelete: <Loading /> });
                      this.props
                        .testimonialDelete(this.props.selectedTestimonial)
                        .then(() => discardModal());
                    }}
                  >
                    {this.state.btnDelete}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
// End Component

const mapStateToProps = ({ user, testimonial }) => ({
  user: user.selected,
  selectedTestimonial: testimonial.selected
});

export default connect(mapStateToProps, { testimonialsOneSelected, testimonialDelete })(HrFr);
