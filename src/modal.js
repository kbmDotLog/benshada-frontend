// Module imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import $ from 'jquery';

// Asset imports
import 'assets/css/form.css';
import 'assets/css/modal.min.css';
import Loading from 'assets/js/loading';

/**
 * Renders the modal container for modals using React Portals
 * @constructor
 */
export default class Modal extends Component {
  /** Component State */
  state = {
    callbackText: ''
  };

  /** Component propTypes */
  static propTypes = {
    callbackText: PropTypes.string,
    callback: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.elementType, PropTypes.object])
      .isRequired,
    dismissText: PropTypes.string,
    id: PropTypes.string.isRequired,
    title: PropTypes.string
  };

  /**
   * Executes Modal callback and discards modal afterwards
   * @callback {*} callback
   */
  executeCallback(callback) {
    this.setState(
      () => ({ callbackText: <Loading /> }),
      async () => {
        await callback();
        $('.modal-backdrop').remove();
      }
    );
  }

  /**
   * Runs functions after component has mounted
   */
  componentDidMount() {
    this.setState(() => ({ callbackText: this.props.callbackText || 'Delete' }));
  }

  /**
   * Returns Modal UI
   * @return {Obj} The UI DOM object
   */
  render() {
    const {
      callback, children, dismissText, id, title
    } = this.props;

    return ReactDOM.createPortal(
      <div
        className="modal fade"
        id={id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className={`modal-content  ${!callback && 'form-container'}`}>
            {title && (
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            <div className={`modal-body ${!callback && 'form-container-holder'}`}>{children}</div>
            {callback && (
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  {dismissText || 'Cancel'}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => this.executeCallback(callback)}
                >
                  {this.state.callbackText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>,
      document.querySelector('#modal')
    );
  }
}
