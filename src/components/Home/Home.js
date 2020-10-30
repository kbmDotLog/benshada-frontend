/* eslint-disable no-underscore-dangle */
/** Module imports */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uniqBy, orderBy } from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/** Component imports */
import Jumbotron from 'components/Home/Jumbotron/Jumbotron';
import ProductList from 'components/ProductList/ProductList';
import HrFr from 'components/HrFr/HrFr';
import LookBook from 'components/Home/LookBook/LookBook';
import HowItWorks from 'components/Home/HowItWorks/HowItWorks';

/** Asset imports */
import 'assets/css/home.min.css';
import { randNum } from 'assets/js/prototypes';
import categories from 'assets/js/categories';

/**
 * Displays Home
 * @constructor
 */
class Home extends Component {
  /** Component propTypes */
  static propTypes = {
    isSignedIn: PropTypes.bool,
    orders: PropTypes.array,
    products: PropTypes.array,
    stores: PropTypes.array
  };

  /**
   * @param {Obj} product
   * @return {number} No of sales for a particular product
   */
  getSales = ({ _id }) => this.props.orders.filter(
    ({ product, status }) => product === _id && status === 'paid'
  ).length;

  /**
   * @param {[Obj]} stores
   * @param {[Obj]} products
   * @return {[Obj]} Products for store lookbook
   */
  getStoreLookBook = (stores, products) => {
    // Store needs to have at least 2 products
    const storeWithProducts = stores.filter((item) => item.products.length > 1);

    const productIDs = products.map(({ _id }) => _id);
    const storeWithProductsVerified = storeWithProducts
      .map((i) => ({
        _id: i._id,
        products: i.products.filter(({ _id }) => productIDs.includes(_id))
      }))
      .filter((i) => i.products.length > 0);
    const storeWithProductsAndSales = orderBy(
      storeWithProductsVerified.map((item) => ({
        _id: item._id,
        products: item.products,
        sales: item.products
          .map((i) => ({ ...i, sales: this.getSales(i) }))
          .reduce((a, b) => ({ sales: a.sales + b.sales })).sales
      })),
      ['sales'],
      ['desc']
    );

    const product1 = products.filter(
      ({ _id }) => _id === storeWithProductsAndSales[0].products[0]._id
    )[0];
    const product2 = products.filter(
      ({ _id }) => _id === storeWithProductsAndSales[0].products[1]._id
    )[0];

    return {
      title: 'Featured Shops',
      bgSmall: product1 && product1.image[0],
      bgBig: product2 && product2.image[0],
      to: `/stores/${
        storeWithProductsAndSales[0] && storeWithProductsAndSales[0]._id
      }`
    };
  };

  /**
   * @param {[Obj]} products
   * @return {[Obj]} Products for gender lookbook
   */
  getGenderLookBook = (products) => {
    const genderTitles = [
      { title: 'Men', gender: 'male' },
      { title: 'Women', gender: 'female' }
    ];
    const randomGender = genderTitles[randNum(1)];
    const productsByGender = products.filter(
      ({ gender }) => gender === randomGender.gender
    );

    const randBg = () => {
      const product = productsByGender[randNum(productsByGender.length - 1)];
      return product && product.image;
    };

    return {
      title: `${randomGender.title}'s Wear`,
      bgSmall: randBg(),
      bgBig: randBg(),
      to: `/catalog?a=p&gender=${randomGender.gender}`
    };
  };

  /**
   * @param {[Obj]} products
   * @return {[Obj]} Products for discount lookbook
   */
  getDiscountLookBook = (products) => {
    const discountedProductsWithSales = products.filter(
      ({ discountPercentage }) => discountPercentage > 0
    );

    const discountedProductsOrdered = orderBy(
      discountedProductsWithSales,
      ['discountPercentage', 'sales'],
      ['desc', 'desc']
    );

    const list = orderBy(
      uniqBy(discountedProductsOrdered, 'discountPercentage'),
      ['discountPercentage'],
      ['desc']
    )
      .slice(0, 3)
      .map(({ discountPercentage }) => discountPercentage);

    return {
      title: 'Discounted Products',
      bgSmall:
        discountedProductsOrdered[1] && discountedProductsOrdered[1].image,
      bgBig: discountedProductsOrdered[0] && discountedProductsOrdered[0].image,
      to: '/catalog?a=p&discount=1',
      list
    };
  };

  /**
   * Renders category divs
   * @param {[Obj]} cats
   * @param {[Obj]} products
   */
  renderCategories = (cats, products) => cats.map(({ name }, i) => {
    const product = products.find((prod) => prod.category === name);
    const image = ((product && product.image) || [])[0];

    return (
        <article
          key={`home-category-${i}`}
          className={`shadow-sm category bg-secondary-gradient ${
            i > 1 && 'd-none d-xl-block'
          }`}
        >
          <div
            style={{
              background: image && `url(${image}) no-repeat bottom left/cover`
            }}
            className="category-image bg-secondary-gradient"
          ></div>
          <div className="v-parent bg-secondary-gradient">
            <hgroup className="v-child">
              <h4 className="no-flip text-secondary">
                <Link to={`/catalog?a=p&category=${name}`}>{name}</Link>
              </h4>
              <h4 className="flip year">New collection</h4>
            </hgroup>
          </div>
        </article>
    );
  });

  /**
   * Displays Home UI
   * @return {Obj} The UI DOM object
   */
  render = () => {
    const { products, stores, isSignedIn } = this.props;
    const productsPlusSales = products.map((item) => ({
      ...item,
      sales: this.getSales(item)
    }));
    const productsWithImages = productsPlusSales.filter(
      ({ image }) => (image || []).length > 0
    );
    const productsBySales = orderBy(productsWithImages, ['sales'], ['desc']) || [];

    return (
      <HrFr>
        <Jumbotron
          isSignedIn={isSignedIn}
          title="2020"
          subTitle={
            <span>
              Latest
              <br />
              Collection
            </span>
          }
        />
        <ProductList
          isFlex={true}
          products={products}
          count={12}
          title="Recently Added"
        />

        <LookBook
          data={this.getStoreLookBook(stores, productsBySales)}
          variant="right"
        />

        <ProductList
          isFlex={true}
          products={productsBySales}
          count={12}
          title="Products By Sales"
        />

        <LookBook
          data={this.getGenderLookBook(productsBySales)}
          flipped={true}
          variant="left"
        />

        <section className="section" id="categories">
          <h2 className="d-none">categories</h2>
          {this.renderCategories(categories, productsBySales)}
        </section>

        <LookBook
          data={this.getDiscountLookBook(productsBySales)}
          variant="right"
        />
        <HowItWorks />
      </HrFr>
    );
  };
}

/**
 * Component mapStateToProps
 * @param {Obj} state
 * @return {Obj} Extra component props
 */
const mapStateToProps = ({
  auth, order, product, store
}) => ({
  isSignedIn: auth.isSigned,
  orders: order.all,
  products: product.all,
  stores: store.all
});

/** Export component */
export default connect(mapStateToProps)(Home);
