import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'modal.js';
import { shopDelete } from '../../../../redux/actions/stores.js';

class ButtonStoreAdmin extends React.Component {
  static propTypes = {
    store: PropTypes.object,
    shopDelete: PropTypes.func
  };

  render = () => {
    const { name, _id } = this.props.store;
    return (
      <>
        <span className="pointer ml-2" data-toggle="modal" data-target={`#store-${_id}-delete`}>
          <FontAwesomeIcon icon={faTrash} />
        </span>

        {/* Modal */}
        <Modal
          id={`store-${_id}-delete`}
          title="Delete Store"
          callback={() => this.props.shopDelete(_id, 'Shop deleted successfully ')}
        >
          Are you sure you want to delete <strong>{name}</strong>?
        </Modal>
      </>
    );
  };
}

export default connect(null, { shopDelete })(ButtonStoreAdmin);
