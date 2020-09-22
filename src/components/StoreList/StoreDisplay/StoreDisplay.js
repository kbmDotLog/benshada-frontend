/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Image from '../../Image/Image.js';
import Rating from '../../Rating/Rating.js';
import Returns from '../../Returns/Returns.js';
import ButtonStoreOwner from './Buttons/ButtonStoreOwner.js';
import ButtonStoreAdmin from './Buttons/ButtonStoreAdmin.js';

class StoreDisplay extends Component {
  static propTypes = {
    store: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    user: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  };

  renderActionButtons = (store) => {
    const { user } = this.props;
    const { _id } = user;
    const owner = store && store.user && store.user._id;

    if (_id === owner) {
      return <ButtonStoreOwner store={store} user={user} />;
    }

    if (user && user.type === 'ADMIN') {
      return <ButtonStoreAdmin store={store} />;
    }
    return false;
  };

  render() {
    const { store } = this.props;
    const {
      _id, name, image, overallRating, returns
    } = store;

    return (
      <div className="card mb-4 product rounded border-0" key={`store${_id}`}>
        <div className="card-body p-0">
          <Image name={name} image={image} type="store" size={6} id={_id} />

          <div className="text-left p-3">
            <div className="d-flex">
              <div className="d-flex flex-grow-1 justify-content-start">
                <Rating rating={overallRating} xtraClass="mr-2" />
                <Returns returns={returns} />
              </div>
              <div className="d-flex flex-grow-1 justify-content-end">{this.renderActionButtons(store)}</div>
            </div>
            <Link to={`/stores/${_id}`}>{name}</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user: user.selected });

export default connect(mapStateToProps)(StoreDisplay);
