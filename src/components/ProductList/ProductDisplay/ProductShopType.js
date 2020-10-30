/* eslint-disable no-underscore-dangle */
// Module imports
import React from 'react';
import PropTypes from 'prop-types';

// Asset imports
import ifSeller from 'assets/js/ifSeller';
import { connect } from 'react-redux';

/**
 * Displays What type of shop user is buying from
 * @constructor
 * @param {Obj} props
 * @return {Obj} The UI DOM object
 */

const ProductShopType = ({ product, users, stores }) => {
  const getShopType = ({ shop }) => {
    const shopID = shop && shop._id;
    const shopFull = stores.filter(({ _id }) => _id === shopID)[0];
    const shopOwner = shopFull && shopFull.user;
    const shopOwnerID = shopOwner && shopOwner._id;
    const shopOwnerFull = users.filter(({ _id }) => _id === shopOwnerID)[0];
    const shopOwnerType = shopOwnerFull && shopOwnerFull.type;

    return ifSeller(shopOwnerType)[1];
  };

  const shopType = getShopType(product);

  return (
    <span
      className={`badge badge-${
        shopType === 'Manufacturer' ? 'primary-benshada' : 'primary'
      } text-white font-weight-bold`}
      role="contentinfo"
    >
      {shopType}
    </span>
  );
};

/** Component propTypes */
ProductShopType.propTypes = {
  product: PropTypes.object,
  stores: PropTypes.array,
  users: PropTypes.array
};

/** Component mapStateToProps */
const mapStateToProps = ({ user, store }) => ({
  users: user.all,
  stores: store.all
});

/** Export component */
export default connect(mapStateToProps)(ProductShopType);
