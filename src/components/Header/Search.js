/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

// Component imports
import { connect } from 'react-redux';
import Price from '../ProductList/ProductDisplay/Price.js';
import Image from '../Image/Image.js';

// Asset imports
import { filterContent } from '../../assets/js/filter.js';
import searchAnimate from '../../assets/js/searchAnimate.js';

// ActionCreator imports
import { productsAll } from '../../redux/actions/products.js';
import { shopsAll } from '../../redux/actions/stores.js';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      relatedStores: null,
      relatedProducts: null,
      totalResults: 0
    };
  }

  static propTypes = {
    products: PropTypes.array,
    stores: PropTypes.array,
    productsAll: PropTypes.func,
    shopsAll: PropTypes.func
  };

  search = (value) => {
    this.setState({ value });

    if (value !== '') {
      $('#searchDropDown').show();

      this.setState({
        relatedStores: null,
        relatedProducts: null
      });

      const { stores, products } = this.props;
      const relatedStoresInit = stores.filter(
        ({ name }) => name.toLowerCase().indexOf(value.toLowerCase()) >= 0
      );
      const relatedStores = relatedStoresInit.slice(0, 3);
      const relatedProductsInit = filterContent(
        products.filter(
          ({ name }) => name.toLowerCase().indexOf(value.toLowerCase()) >= 0
        )
      );
      const relatedProducts = relatedProductsInit.slice(0, 3);

      this.setState({
        relatedProducts,
        relatedStores,
        totalResults: relatedProductsInit.length
      });
    } else {
      $('#searchDropDown').hide();
    }
  };

  searchLoading = (value) => (
      <div className="text-center">
        <h2>
          <FontAwesomeIcon icon={faSpinner} className="fa-pulse" />
        </h2>
        <p>
          Searching for <strong> {value}</strong>
        </p>
      </div>
  )

  renderResult = (related, type) => (related < 1 ? (
      <div className="px-4 py-2">No {type} found</div>
  ) : (
    related.map((item, i) => (
        <li className="" key={`related${type}${i}`}>
          <Link to={`/${type}s/${item && item._id}`} className="d-block px-4 py-2 border border-white">
            <div className="row align-items-center h-100">
              <div className="mr-2 p-0 text-center" style={{ width: '60px' }}>
                <Image
                  name={item && item.name}
                  image={item && item.image}
                  id={item && item._id}
                  type={type}
                  size={2} />
              </div>
              <div className="flex-grow-1 text-secondary">
                <div>{item && item.name}</div>
                <div className="">
                  <Price price={item && item.price} discount={item && item.discountPercentage} />
                </div>
              </div>
            </div>
          </Link>
        </li>
    ))
  ));

  searchFound = (value) => (
    <>
      {/* <li className="dropdown-header text-uppercase">
        <small className="font-weight-bold">stores</small>
      </li>
      {this.renderResult(this.state.relatedStores, 'store')}

      <li className="dropdown-divider"></li> */}

      <li className="dropdown-header text-uppercase">
        <small className="font-weight-bold">products</small>
      </li>

      {this.renderResult(this.state.relatedProducts, 'product')}

      {this.state.totalResults > 0 ? (
        <li className="text-center text-primary-benshada text-uppercase my-2">
          <Link to={`/catalog/?a=p&q=${value}`} className="p-2">
            see all results ({this.state.totalResults})
          </Link>
        </li>
      ) : (
        ''
      )}
    </>
  );

  searchRenderHelper(value) {
    return this.state.relatedProducts === null
      ? this.searchLoading(value)
      : this.searchFound(value);
  }

  // Animation for search component
  componentDidMount = () => searchAnimate();

  render() {
    return (
      <form className="form-inline flex-grow-1 mb-2 mb-md-0">
        <div className="input-group flex-grow-1">
          <div className="dropdown flex-grow-1">
            <input
              className="form-control  w-100 border-top-0 border-right-0 border-left-0 rounded-0 search-bar invisible dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={this.state.value}
              onChange={(e) => this.search(e.target.value)}
              onReset={() => this.search('')}
              autoCorrect="true"
            />

            <ul className="dropdown-menu w-100" id="searchDropDown">
              {this.searchRenderHelper(this.state.value)}
            </ul>
          </div>

          <div className="input-group-append">
            <span className="input-group-text bg-white border-0" id="basic-addon2">
              <FontAwesomeIcon className="text-primary-benshada pointer" id="showSearchBar" title="Search" icon={faSearch} />
            </span>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ product, store }) => ({
  products: product.all,
  stores: store.all
});

export default connect(mapStateToProps, { shopsAll, productsAll })(Search);
