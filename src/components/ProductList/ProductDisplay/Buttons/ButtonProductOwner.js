/* eslint-disable no-underscore-dangle */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import $ from 'jquery';
import {
  productDelete,
  productUpdate,
  productsOneSelected
} from '../../../../redux/actions/products.js';
import ProductForm from '../ProductForm.js';
import Loading from '../../../../assets/js/loading.js';

class ButtonProductOwner extends React.Component {
  INIT = {
    buttonValue: 'Update Product'
  };

  constructor(props) {
    super(props);
    this.state = this.INIT;
  }

  static propTypes = {
    action: PropTypes.string,
    product: PropTypes.object,
    selectedProduct: PropTypes.object,
    user: PropTypes.object,
    productDelete: PropTypes.func,
    productsOneSelected: PropTypes.func,
    productUpdate: PropTypes.func
  };

  submit = (product) => {
    this.setState({
      buttonValue: (
        <Loading />
      )
    });

    const _id = product.get('_id');

    this.props
      .productUpdate(_id, product)
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
        $('.modal-backdrop').remove();
      });
  };

  render = () => {
    const { product, selectedProduct } = this.props;
    const { _id, name } = selectedProduct;

    return (
      <>
        <span className="pointer ml-2" data-toggle="modal" data-target="#productEdit">
          <FontAwesomeIcon
            icon={faPencilAlt}
            onClick={() => this.props.productsOneSelected(product)}
          />
        </span>
        <span className="pointer ml-2" data-toggle="modal" data-target="#productDelete">
          <FontAwesomeIcon icon={faTrash} onClick={() => this.props.productsOneSelected(product)} />
        </span>

        {/* Modal */}
        <div
          className="modal fade"
          id="productEdit"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content" id="formContainer">
              <div className="modal-body form-container-holder">
                <ProductForm buttonValue={this.state.buttonValue} onSubmit={this.submit} />
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="productDelete"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Product</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete <strong>{name}</strong>?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => this.props
                    .productDelete(_id)
                    .then((response) => toast.success(
                      (response
                            && response.value
                            && response.value.data
                            && response.value.data.message)
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
                      $('.modal-backdrop').remove();
                    })
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = ({ product }) => ({ selectedProduct: product.selected });

export default connect(mapStateToProps, { productDelete, productUpdate, productsOneSelected })(
  ButtonProductOwner
);
