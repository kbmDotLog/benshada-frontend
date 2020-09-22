import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import $ from 'jquery';
import { shopUpdate, shopsOneSelected } from '../../../../redux/actions/stores.js';
import StoreForm from '../StoreForm.js';
import Loading from '../../../../assets/js/loading.js';

class ButtonStoreOwner extends React.Component {
  INIT = {
    buttonValue: 'Update Store'
  };

  constructor(props) {
    super(props);
    this.state = this.INIT;
  }

  static propTypes = {
    store: PropTypes.object,
    user: PropTypes.object,
    shopsOneSelected: PropTypes.func,
    shopUpdate: PropTypes.func
  };

  submit = ({
    _id, name, description, address, state, CACNumber, phone
  }) => {
    this.setState({
      buttonValue: <Loading />
    });

    const store = {
      name,
      description,
      address,
      state,
      CACNumber,
      phone
    };

    if (CACNumber) {
      store.isRegisteredBusiness = true;
    }

    Object.keys(store).forEach((key) => {
      if (store[key] === undefined) {
        delete store[key];
      }
    });

    this.props
      .shopUpdate(_id, store)
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

  render = () => (
    <>
      <span className="pointer ml-2" data-toggle="modal" data-target="#storeEdit">
        <FontAwesomeIcon
          icon={faPencilAlt}
          onClick={() => this.props.shopsOneSelected(this.props.store)}
        />
      </span>

      {/* Modal */}
      <div
        className="modal fade"
        id="storeEdit"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content" id="formContainer">
            <div className="modal-body form-container-holder">
              <StoreForm buttonValue={this.state.buttonValue} onSubmit={this.submit} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default connect(null, { shopUpdate, shopsOneSelected })(ButtonStoreOwner);
