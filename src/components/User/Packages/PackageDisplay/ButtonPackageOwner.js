/* eslint-disable no-underscore-dangle */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import $ from 'jquery';
import Modal from 'modal.js';
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
    deliveryPackage: PropTypes.object,
    selectedDeliveryPackage: PropTypes.object,
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
            data-target={`#delivery-package-${_id}-edit`}
            onClick={() => this.props.deliveryPackagesOneSelected(deliveryPackage)}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </span>
          <span
            className="pointer"
            data-toggle="modal"
            data-target={`#delivery-package-${_id}-delete`}
            onClick={() => this.props.deliveryPackagesOneSelected(deliveryPackage)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>

        {/* Modal */}
        <Modal id={`delivery-package-${_id}-edit`}>
          <PackageForm buttonValue={this.state.buttonValue} onSubmit={this.submit} />
        </Modal>

        <Modal
          id={`delivery-package-${_id}-delete`}
          title="Delete Delivery Package"
          callback={() => this.props.deliveryPackageDelete(_id, 'Delivery package deleted successfully')
          }
        >
          Are you sure you want to delete this delivery package?
        </Modal>
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
