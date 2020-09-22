// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component imports
import StoreDisplay from './StoreDisplay/StoreDisplay.js';
import NotFound from '../NotFound/NotFound.js';
import { filterList } from '../../assets/js/filter.js';

// Start Component
export default class StoreList extends Component {
  static propTypes = {
    stores: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    type: PropTypes.object,
    count: PropTypes.number,
    title: PropTypes.string
  };

  renderStoreList = (stores, filterType, filterValue) => {
    const filteredStores = stores.filter(
      (store) => filterList(store, filterType, filterValue)
    );

    return filteredStores.length > 0 ? (
      <>
        <div className="cards stores">
          {filteredStores.slice(0, this.props.count).map((store, key) => (
            <StoreDisplay key={`storeList${key}`} store={store} />
          ))}
        </div>
      </>
    ) : (
      <NotFound type="store" />
    );
  };

  render() {
    const { stores, type, title } = this.props;

    return (
      <>
        <h4 className="text-capitalize">{title}</h4>
        {this.renderStoreList(stores, type && type.name, type && type.value)}
      </>
    );
  }
}
// End Component
