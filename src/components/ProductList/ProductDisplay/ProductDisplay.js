/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ContainerDimensions from 'react-container-dimensions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Price from './Price.js';
import Image from '../../Image/Image.js';
import Rating from '../../Rating/Rating.js';
import Returns from '../../Returns/Returns.js';
import ButtonProductBuyer from './Buttons/ButtonProductBuyer.js';
import ButtonProductOwner from './Buttons/ButtonProductOwner.js';
import { userUpdate } from '../../../redux/actions/users.js';

class ProductDisplay extends Component {
  static propTypes = {
    action: PropTypes.string,
    product: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    user: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    userUpdate: PropTypes.func
  };

  renderActionButtons = (product) => {
    const { user } = this.props;
    const shops = (user && user.shops) || [];
    const { shop, isBatch } = product;

    if (
      shops.map((item) => item && item._id).includes(shop && shop._id)
      || (user && user.type === 'ADMIN')
    ) {
      return <ButtonProductOwner product={product} user={user} />;
    }

    if (isBatch && (user && user.type) === 'UB') {
      return <ButtonProductBuyer product={product} user={user} />;
    }

    if (!isBatch && (user && user.type) === 'UC') {
      return <ButtonProductBuyer product={product} user={user} />;
    }

    return user && user._id === undefined ? (
      <ButtonProductBuyer product={product} user={user} />
    ) : (
      ''
    );
  };

  helperCartCount = (cart, product, type) => {
    if (
      type === 'increase'
      && product.quantity > cart.filter(({ _id }) => _id === product.id).length
    ) { return [...cart, product]; }

    for (let i = 0; i < cart.length; i += 1) {
      const element = cart[i];

      if (element._id === product._id) {
        cart.splice(i, 1);
        break;
      }
    }

    return cart;
  };

  updateCartCount = (user, product, type, initCount, count) => {
    const { cart } = user;
    const email = user && user.email;
    let newCart = [];

    if (initCount) {
      for (let i = 0; i < Number(count); i += 1) {
        if (product.quantity > cart.filter(({ _id }) => _id === product.id).length) {
          newCart.push(product);
        }
      }
    } else {
      newCart = this.helperCartCount(cart, product, type);
    }

    this.props
      .userUpdate(email, { cart: newCart })
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
      .finally(() => {});
  };

  render() {
    const { product, user, action } = this.props;
    const {
      _id, name, image, price, discountPercentage, overallRating, returns, quantity
    } = product;
    const cart = (user && user.cart) || [];
    const cartCount = cart.filter((item) => item._id === _id).length;

    return (
      <div className="card mb-4 product rounded border-0" key={`product${_id}`}>
        <div className="card-body p-0">
          <Image name={name} image={image} type="product" size={6} id={_id} />

          {action === 'cart' ? (
            <div className="cart-count cart-count-user">
              <ContainerDimensions>
                {({ height, width }) => (
                  <span className="" style={{ top: `-${height / 2}px`, left: `-${width / 2}px` }}>
                    {cartCount}
                  </span>
                )}
              </ContainerDimensions>
            </div>
          ) : (
            ''
          )}

          <div className="text-left p-3">
            <div className="d-flex">
              <div className="d-flex flex-grow-1 justify-content-start">
                <Rating rating={overallRating} xtraClass="mr-2" />
                <Returns returns={returns} />
              </div>
              <div className="d-flex flex-grow-1 justify-content-end">
                {this.renderActionButtons(product)}
              </div>
            </div>
            <Link to={`/products/${_id}`}>{name}</Link>

            <p className="">
              {quantity > 0 ? <Price price={price} discount={discountPercentage} /> : <span className="bg-danger text-white px-2 py-1 d-inline-block rounded mt-1">Sold out</span>}
            </p>
          </div>
          {action === 'cart' ? (
            <div className="float-right text-right p-3">
              <p className="">
                <FontAwesomeIcon
                  icon={faMinusCircle}
                  onClick={() => this.updateCartCount(user, product, 'decrease')}
                  className="text-primary-benshada pointer"
                />
                <input
                  className="p-2 mx-1 d-inline w-25 border-0 bg-light-benshada text-center"
                  type="text"
                  onChange={
                    (e) => this
                      .updateCartCount(
                        user, product, null, cartCount, e.target.value
                      )
                  }
                  defaultValue={cartCount}
                />
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  onClick={() => this.updateCartCount(user, product, 'increase')}
                  className="text-primary-benshada pointer"
                />
              </p>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user: user.selected });

export default connect(mapStateToProps, { userUpdate })(ProductDisplay);
