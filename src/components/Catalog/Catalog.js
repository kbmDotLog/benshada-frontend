// Module imports
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'query-string';

// Component imports
import HrFr from '../HrFr/HrFr.js';
import ProductList from '../ProductList/ProductList.js';
import Filter from './Filter/Filter.js';

// Asset imports
import '../../assets/css/catalog.css';
import { sortNumAsc, unique } from '../../assets/js/prototypes.js';

class Catalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      a: '',
      category: '',
      discount: 0,
      gender: '',
      price: { min: 0, max: 0 },
      products: [],
      q: '',
      rating: 0,
      size: [],
      stores: {}
    };
  }

  static propTypes = {
    location: PropTypes.object,
    products: PropTypes.array,
    stores: PropTypes.array
  };

  filterProducts = (products) => {
    let rP = products;
    const {
      q, size, discount, rating
    } = this.state;
    const { min, max } = this.state.price;

    if (this.state.category !== '') {
      rP = rP.filter(({ category }) => category === this.state.category);
    }

    if (discount) {
      rP = rP.filter(({ discountPercentage }) => discountPercentage >= Number(discount));
    }

    if (this.state.gender !== '') {
      rP = rP.filter(({ gender }) => gender === this.state.gender);
    }

    if (Number(rating)) {
      rP = rP.filter(({ overallRating }) => overallRating >= Number(rating));
    }

    if (Number(min) > 0) {
      rP = rP.filter(({ price }) => price >= Number(min) && price <= Number(max));
    }

    if (q) {
      rP = rP.filter(({ name }) => (name && name.toLowerCase()).includes(q));
    }

    if (size.length > 0) {
      rP = rP.filter(({ sizes }) => size.every((v) => sizes.map(({ value }) => value).includes(v)));
    }

    return rP;
  };

  filterValue = (target) => {
    const x1 = parseInt(target.max, 2);
    const x2 = parseInt(target.min, 2);

    return (100 / (x1 - x2)) * parseInt(target.value, 2) - (100 / (x1 - x2)) * x2;
  };

  priceFilter1 = (e) => {
    const { target } = e;

    target.value = Math.min(target.value, target.parentNode.childNodes[2].value - 1);

    const value = this.filterValue(target);

    const children = target.parentNode.childNodes[0].childNodes;
    children[0].style.width = `${value}%`;
    children[2].style.left = `${value}%`;
    children[3].style.left = `${value}%`;
    children[5].style.left = `${value}%`;
    children[5].childNodes[0].innerHTML = target.value;

    const price = { min: Number(target.value), max: this.state.price.max };
    this.setState({ price });
    this.setOldOnes('price', price);
  };

  priceFilter2 = (e) => {
    const { target } = e;

    target.value = Math.max(target.value, target.parentNode.childNodes[1].value - -1);
    const value = this.filterValue(target);

    const children = target.parentNode.childNodes[0].childNodes;
    children[1].style.width = `${100 - value}%`;
    children[2].style.right = `${100 - value}%`;
    children[4].style.left = `${value}%`;
    children[6].style.left = `${value}%`;
    children[6].childNodes[0].innerHTML = target.value;

    const price = { min: this.state.price.min, max: Number(target.value) };

    this.setState({ price });
    this.setOldOnes('price', price);
  };

  setOldOnes = (type, newValue) => {
    const { pathname, origin } = window.location;
    const url = new URL(`${origin}${pathname}`);
    const { searchParams } = url;
    const qO = qs.parse(window.location.search);
    const { products } = this.props;
    const initProd = qO.q
      ? products.filter(({ name }) => (name && name.toLowerCase()).includes(qO.q.toLowerCase()))
      : products;

    const prices = unique(sortNumAsc(initProd.map((i) => i && i.price)));
    const initMin = prices[0] || 0;
    const initMax = prices[prices.length - 1] || 0;

    // Reset all params already in qO
    Object.entries(qO).forEach((i) => {
      if (!['min', 'max'].includes(i[0])) {
        this.setState(() => (i[0] === 'size'
          ? {
            [i[0]]: this.state.size.concat(
              (typeof i[1] === 'string' ? i[1] : i[1].join(',')).split(',')
            )
          }
          : { [i[0]]: i[1] }));
      }
      return i[0] === 'size' ? searchParams.append(i[0], i[1]) : searchParams.set(i[0], i[1]);
    });

    // Set new one
    if (type) {
      if (type === 'size') {
        this.setSizes(newValue, searchParams);
      } else if (type === 'price') {
        searchParams.set('min', newValue.min);
        searchParams.set('max', newValue.max);
      } else {
        searchParams.set(type, newValue);
      }
    } else {
      // Set prices
      const newMin = qO.min >= initMin && qO.min < initMax ? qO.min : initMin;
      const newMax = qO.max <= initMax && qO.max > initMin ? qO.max : initMax;

      this.setState({
        price: { min: newMin, max: newMax },
        products: initProd,
        q: qO.q ? qO.q : undefined
      });
      searchParams.set('min', newMin);
      searchParams.set('max', newMax);
    }

    url.search = searchParams.toString();
    const newUrl = `${url.toString()}`;

    return window.history.pushState('', '', newUrl);
  };

  setSizes = (size, searchParams) => {
    searchParams.delete('size');
    size.forEach((i) => searchParams.append('size', i));
  };

  onFilterClick = (value, type) => {
    let newValue = value;
    const sizeArr = this.state.size;

    if (type === 'size') {
      newValue = sizeArr.includes(value) ? sizeArr.filter((i) => i !== value) : [...sizeArr, value];
    }

    this.setOldOnes(type, newValue);
    this.setState({ [type]: newValue });
  };

  getSnapshotBeforeUpdate = (prvP, prvS) => ({
    shouldInitialize: prvS.q !== qs.parse(window.location.search).q
  });

  componentDidUpdate = (prvP, prvS, snapshot) => (snapshot.shouldInitialize ? this.setOldOnes() : '');

  componentDidMount = () => this.setOldOnes();

  render() {
    const { a, q } = qs.parse(window.location.search);
    const {
      category, gender, size, discount, rating, price
    } = this.state;
    const { products } = this.props;
    const initProd = q
      ? products.filter(({ name }) => (name && name.toLowerCase()).includes(q.toLowerCase()))
      : products;
    const prices = unique(sortNumAsc(initProd.map((i) => i && i.price)));

    return !(a === 'p') ? (
      <Redirect to="/" />
    ) : (
      <HrFr>
        <div className="container mt-5 py-5">
          <div className="row">
            <Filter
              category={category}
              discount={discount}
              gender={gender}
              onClick={this.onFilterClick}
              product={{ init: initProd, state: this.filterProducts(initProd) }}
              price={price}
              range1={this.priceFilter1}
              range2={this.priceFilter2}
              rating={rating}
              size={size}
              prices={prices}
            />
            <div className="col-12 col-md">
              <ProductList products={this.filterProducts(initProd)} title="Products" />
            </div>
          </div>
        </div>
      </HrFr>
    );
  }
}

const mapStateToProps = ({ product, store }) => ({ products: product.all, stores: store.all });

export default connect(mapStateToProps)(Catalog);
