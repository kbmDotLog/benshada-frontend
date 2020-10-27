// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

// Component imports
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Plus from '../Plus/Plus.js';

// Action imports
import { testimonialsOneSelected, testimonialDelete } from '../../redux/actions/testimonials.js';
// import Loading from '../../assets/js/loading.js';
// import discardModal from '../../assets/js/discardModal.js';

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
    // selectedTestimonial: PropTypes.object,
    // testimonialDelete: PropTypes.func,
    testimonialsOneSelected: PropTypes.func,
    user: PropTypes.object
  };

  handleNewItems = () => this.props.testimonialsOneSelected({});

  render() {
    return (
      <>
        <div>
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
