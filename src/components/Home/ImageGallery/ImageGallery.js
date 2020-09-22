import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Image from '../../Image/Image.js';

class ImageGallery extends React.Component {
  static propTypes = {
    products: PropTypes.array
  };

  renderImage = () => {
    const productsWithImages = this.props.products.filter(({ image }) => image.length > 0);

    return productsWithImages.length > 0
      ? productsWithImages.map(({ _id, image, name }, i) => (
          <div className="card" key={`gallery-image-${i}`}>
            <Image
              type="product"
              id={_id}
              image={image}
              name={name}
              xtraClass="col-4 col-sm-2 col-lg-1 img-fluid px-0"
            />
          </div>
      ))
      : '';
  };

  render = () => <div className="cards products products-gallery">{this.renderImage()}</div>;
}

const mapStateToProps = ({ product }) => ({ products: product.all });

export default connect(mapStateToProps)(ImageGallery);
