/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

// Component imports
import ProductList from '../../ProductList/ProductList.js';
import HrFr from '../../HrFr/HrFr.js';
import Image from '../../Image/Image.js';

export default class StoreDomain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      store: {}
    };
  }

  static propTypes = {
    orders: PropTypes.array,
    products: PropTypes.array,
    stores: PropTypes.array,
    user: PropTypes.object
  };

  getStore = (ID) => this.props.stores.filter(({ _id }) => _id === ID)[0];

  getSnapshotBeforeUpdate = (prvP, prvS) => ({
    shouldRerender: prvS._id !== this.state._id
  });

  componentDidUpdate = (prvP, prvS, snapshot) => {
    const ID = window.location.pathname.split('/')[2];
    if (snapshot.shouldRerender) {
      this.setState({ _id: ID, store: this.getStore(ID) });
    }
  };

  componentDidMount = () => {
    const ID = window.location.pathname.split('/')[2];
    this.setState({ _id: ID, store: this.getStore(ID) });
  };

  render() {
    const { store } = this.state;
    const { products, orders } = this.props;
    const _id = store && store._id;
    const name = store && store.name;
    const createdAt = store && store.createdAt;
    const description = store && store.description;
    const image = store && store.image;
    const sP = products.filter((p) => p.shop && p.shop._id === _id);
    const sO = orders.filter((o) => sP.map((p) => p && p._id).includes(o && o.product));

    return !store ? <Redirect to="/" /> : (
      <HrFr>
        <div className="container bg-white shadow-sm pt-5 mt-5">
          <div className="row">
            <div style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
              <Image name={name} image={image} type="store" size={6} id={_id} />
            </div>
            <div className="col">
              <hgroup>
                <Link to={`/stores?name=${name}`}>
                  <h2 className="mb-0">{name}</h2>
                </Link>
                <div className="clear"></div>
              </hgroup>
              <p className="pb-0">{description}</p>
              <div className="row mb-3">
                {/* <div className="col">
                    <i className="fas fa-map-marker-alt text-primary"></i> No 24
                    Fresh Lane Lagos Nigeria
                  </div>
                  <div className="col">
                    <i className="fas fa-phone text-primary"></i>
                    <a href="tel:+2348165972229"> +234 816 597 2229</a>
                  </div> */}
                <div className="col">
                  <i className="fas fa-calendar text-primary"></i> Date opened:{' '}
                  <span>{new Date(createdAt).toDateString()}</span>
                </div>
              </div>
              {/* <div className="row text-primary">
                  <div className="col">
                    <i className="fas fa-share-alt mr-4"></i>
                    <i className="fab fa-twitter mr-4"></i>
                    <i className="fab fa-facebook-f mr-4"></i>
                    <button className="btn btn-primary float-right">
                      Follow
                    </button>
                    <button className="btn btn-primary float-right mr-3">
                      Message
                    </button>
                    <div className="clear"></div>
                  </div>
                </div> */}
            </div>
          </div>
        </div>
        {/* <div className="container p-4 my-4 bg-white shadow-sm">
            <div className="row">
              <div className="col">
                <img
                  src="./img/jumbotron/benshadawebbanners01.jpg"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div> */}
        <div className="container p-4 my-4 bg-white shadow-sm">
          <div className="row">
            <div className="col">
              <h4>Store Stats</h4>
              <div className="card-columns no-restrict">
                {/* <div className="card shadow-sm">
                    <div className="card-body">
                      <p className="card-title">Followers</p>
                      <h1 className="display-4 text-primary text-center">4k</h1>
                    </div>
                  </div>
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <p className="card-title">Following</p>
                      <h1 className="display-4 text-primary text-center">
                        1,561
                      </h1>
                    </div>
                  </div>
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <p className="card-title">Visits</p>
                      <h1 className="display-4 text-primary text-center">13</h1>
                    </div>
                  </div>
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <p className="card-title">Months Active</p>
                      <h1 className="display-4 text-primary text-center">
                        4
                      </h1>
                    </div>
                  </div> */}
                <div className="card shadow-sm">
                  <div className="card-body">
                    <p className="card-title">Sales</p>
                    <h1 className="display-4 text-primary text-center">
                      {sO.filter(({ status }) => status === 'paid').length}
                    </h1>
                  </div>
                </div>
                {/* <div className="card shadow-sm">
                    <div className="card-body">
                      <p className="card-title">Ratings</p>
                      <h1 className="text-primary text-center">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                      </h1>
                    </div>
                  </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="container py-4">
          <ProductList
            products={sP}
            type={{ name: 'discountPercentage', value: 0 }}
            title={`Discounts from ${name}`}
            count={4}
          />
        </div>
        <div className="container py-4">
          <ProductList products={sP} title={`More Products from ${name}`} count={4} />
        </div>
      </HrFr>
    );
  }
}
