/* eslint-disable no-underscore-dangle */
// Module imports
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';

// Component imports
import Modal from 'modal.js';
import ProductForm from '../ProductForm.js';

// Asset imports
import Loading from '../../../../assets/js/loading.js';

// Action imports
import {
  productDelete,
  productUpdate,
  productsOneSelected
} from '../../../../redux/actions/products.js';

class ButtonProductOwner extends React.Component {
  INIT = {
    buttonValue: 'Update Product'
  };

  constructor(props) {
    super(props);
    this.state = this.INIT;
  }

  static propTypes = {
    product: PropTypes.object,
    selectedProduct: PropTypes.object,
    productDelete: PropTypes.func,
    productsOneSelected: PropTypes.func,
    productUpdate: PropTypes.func
  };

  submit = (product) => {
    this.setState({
      buttonValue: <Loading />
    });

    const _id = product.get('_id');

    this.props.productUpdate(_id, product, 'Product updated successfully').finally(() => {
      this.setState(this.INIT);
      $('.modal-backdrop').remove();
    });
  };

  render = () => {
    const { product, selectedProduct } = this.props;
    const { _id, name } = selectedProduct;

    return (
      <>
        <button
          className="btn bg-white text-secondary rounded-circle pointer"
          data-toggle="modal"
          data-target={`#product-${product && product._id}-edit`}
        >
          <FontAwesomeIcon
            icon={faPencilAlt}
            onClick={() => this.props.productsOneSelected(product)}
          />
        </button>
        <button
          className="btn bg-white text-danger rounded-circle pointer"
          data-toggle="modal"
          data-target={`#product-${product && product._id}-delete`}
        >
          <FontAwesomeIcon icon={faTrash} onClick={() => this.props.productsOneSelected(product)} />
        </button>

        {/* Modal */}
        <Modal id={`product-${product && product._id}-edit`}>
          <ProductForm buttonValue={this.state.buttonValue} onSubmit={this.submit} />
        </Modal>
        <Modal
          id={`product-${product && product._id}-delete`}
          title="Delete Product"
          callback={() => this.props.productDelete(_id, 'Product deleted successfully')}
        >
          Are you sure you want to delete <strong>{name}</strong>?
        </Modal>
      </>
    );
  };
}

const mapStateToProps = ({ product }) => ({ selectedProduct: product.selected });

export default connect(mapStateToProps, { productDelete, productUpdate, productsOneSelected })(
  ButtonProductOwner
);
