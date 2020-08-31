// Module improts
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// Start Component
export default class Plus extends Component {
  INIT = {
    plusButtonIcon: 'plus',
    newItemsClass: 'hidden'
  };

  constructor(props) {
    super(props);

    this.state = this.INIT;
  }

  static propTypes = {
    handleNewItems: PropTypes.func,
    newItems: PropTypes.array,
    user: PropTypes.object
  };

  handleNewItems = (name) => {
    this.setState({
      plusButtonIcon: this.state.plusButtonIcon === 'plus' ? 'times' : 'plus',
      newItemsClass: this.state.newItemsClass === 'hidden' ? '' : 'hidden'
    });

    this.props.handleNewItems(name);
  };

  render = () => (
    <>
      <div className={`shadow ${this.state.newItemsClass}`} id="newItems">
        {this.props.newItems
          .filter(({ users }) => users.includes(this.props.user && this.props.user.type))
          .map(({ icon, name }, i) => (
            <div
              key={`newItem-${i}`}
              data-toggle="modal"
              data-target={`#${name}Modal`}
              className={`pointer ${i === 0 ? '' : 'border border-top-secondary'}`}
              onClick={() => this.handleNewItems(name)}
            >
              <div data-toggle="tooltip" title={name}>
                <FontAwesomeIcon icon={icon} />
              </div>
            </div>
          ))}
      </div>
      <div
        className="btn btn-primary rounded-circle shadow-sm"
        id="addProductButton"
        onClick={this.handleNewItems}
      >
        <FontAwesomeIcon icon={this.state.plusButtonIcon === 'plus' ? faPlus : faTimes} />
      </div>
    </>
  );
}
// End Component
