import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import $ from 'jquery';
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
        <span className="pointer ml-2" data-toggle="modal" data-target="#storeDelete">
          <FontAwesomeIcon icon={faTrash} />
        </span>

        {/* Modal */}

        <div
          className="modal fade"
          id="storeDelete"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Store</h5>
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
                    .shopDelete(_id)
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

export default connect(null, { shopDelete })(ButtonStoreAdmin);
