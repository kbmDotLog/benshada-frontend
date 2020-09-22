import React from 'react';
import { Link } from 'react-router-dom';
import ContainerDimensions from 'react-container-dimensions';

import PropTypes from 'prop-types';
import '../../assets/css/misc.css';
import Image from '../Image/Image.js';

export default class NotFound extends React.Component {
  static propTypes = {
    action: PropTypes.string,
    type: PropTypes.string
  };

  renderHelper = () => ({
    product: window.location.href.includes('user') && !['saved', 'cart'].includes(this.props.action) ? (
      ''
    ) : (
      <Link
        to="/catalog/?a=p"
        className="btn rounded-pill btn-primary text-white text-capitalize"
      >
        Shop All {this.props.type}s
      </Link>
    )
    // store: (
    //   <Link
    //     to={`/${this.props.type}s`}
    //     className="btn rounded-pill btn-primary text-white text-capitalize"
    //   >
    //     Shop All {this.props.type}s
    //   </Link>
    // )
  }[this.props.type])

  render = () => (
    <ContainerDimensions>
      {({ height, width }) => (
        <div className="text-center pt-4 pb-4 v-align" style={{ height: height * 0.8, width }}>
          <Image type={this.props.type} size={6} />
          <p className="mb-2 lead">No {this.props.type === 'package' ? 'delivery ' : ''}{this.props.type}s found</p>
          {this.renderHelper()}
        </div>
      )}
    </ContainerDimensions>
  );
}
