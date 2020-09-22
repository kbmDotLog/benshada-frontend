/* eslint-disable no-underscore-dangle */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import $ from 'jquery';
import {
  deliveryPackageDelete,
  deliveryPackageUpdate,
  deliveryPackagesOneSelected
} from '../../../../redux/actions/deliveryPackages.js';
import PackageForm from '../PackageForm.js';
import Loading from '../../../../assets/js/loading.js';

class ButtonPackageOwner extends React.Component {
  INIT = {
    buttonValue: 'Update Package'
  };

  constructor(props) {
    super(props);
    this.state = this.INIT;
  }

  static propTypes = {
    action: PropTypes.string,
    deliveryPackage: PropTypes.object,
    selectedDeliveryPackage: PropTypes.object,
    user: PropTypes.object,
    deliveryPackageDelete: PropTypes.func,
    deliveryPackagesOneSelected: PropTypes.func,
    deliveryPackageUpdate: PropTypes.func
  };

  submit = (deliveryPackage) => {
    this.setState({
      buttonValue: <Loading />
    });

    const { _id } = deliveryPackage;

    this.props
      .deliveryPackageUpdate(_id, deliveryPackage)
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
    const { deliveryPackage, selectedDeliveryPackage } = this.props;
    const { _id } = selectedDeliveryPackage;

    return (
      <>
        <div className="d-flex">
          <span
            className="pointer mr-3"
            data-toggle="modal"
            data-target="#deliveryPackageEdit"
            onClick={() => this.props.deliveryPackagesOneSelected(deliveryPackage)}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </span>
          <span
            className="pointer"
            data-toggle="modal"
            data-target="#deliveryPackageDelete"
            onClick={() => this.props.deliveryPackagesOneSelected(deliveryPackage)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>

        {/* Modal */}
        <div
          className="modal fade"
          id="deliveryPackageEdit"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content" id="formContainer">
              <div className="modal-body form-container-holder">
                <PackageForm buttonValue={this.state.buttonValue} onSubmit={this.submit} />
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="deliveryPackageDelete"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Delivery Package</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this delivery package?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => this.props
                    .deliveryPackageDelete(_id)
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

const mapStateToProps = ({ deliveryPackage }) => ({
  selectedDeliveryPackage: deliveryPackage.selected
});

export default connect(mapStateToProps, {
  deliveryPackageDelete,
  deliveryPackageUpdate,
  deliveryPackagesOneSelected
})(ButtonPackageOwner);
