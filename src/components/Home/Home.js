/* eslint-disable no-underscore-dangle */
// Module imports
import React from 'react';
import PropTypes from 'prop-types';
import { uniqBy, orderBy } from 'lodash';

// Component imports
import { randNum } from 'assets/js/prototypes.js';
import categories from 'assets/js/categories.js';
import { Link } from 'react-router-dom';
import Jumbotron from './Jumbotron/Jumbotron.js';
import ProductList from '../ProductList/ProductList.js';
import HrFr from '../HrFr/HrFr.js';
import Lookbook from './LookBook/LookBook.js';

// Asset imports
import '../../assets/css/home.min.css';
import HowItWorks from './HowItWorks/HowItWorks.js';

// Start Component
class Home extends React.Component {
  static propTypes = {
    isSignedIn: PropTypes.bool,
    orders: PropTypes.array,
    products: PropTypes.array,
    stores: PropTypes.array
  };

  getSales = ({ _id }) => this.props.orders.filter(({ product, status }) => product === _id && status === 'paid').length;

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
      to: `/stores/${storeWithProductsAndSales[0] && storeWithProductsAndSales[0]._id}`
    };
  };

  getGenderLookBook = (products) => {
    const genderTitles = [
      { title: 'Men', gender: 'male' },
      { title: 'Women', gender: 'female' }
    ];
    const randomGender = genderTitles[randNum(1)];
    const productsByGender = products.filter(({ gender }) => gender === randomGender.gender);

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
      bgSmall: discountedProductsOrdered[1] && discountedProductsOrdered[1].image,
      bgBig: discountedProductsOrdered[0] && discountedProductsOrdered[0].image,
      to: '/catalog?a=p&discount=1',
      list
    };
  };

  renderCategories = (cats, products) => cats.map(({ name }, i) => {
    const product = products.filter((prod) => prod.category === name)[0];
    const image = ((product && product.image) || [])[0];

    return (
        <article
          key={`home-category-${i}`}
          className={`shadow-sm category bg-secondary-gradient ${i > 1 ? 'd-none d-xl-block' : ''}`}
        >
          <div
            style={{ background: image ? `url(${image}) no-repeat bottom left/cover` : '' }}
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

  render = () => {
    const { products, stores, isSignedIn } = this.props;
    const productsPlusSales = products.map((item) => ({
      ...item,
      sales: this.getSales(item)
    }));
    const productsWithImages = productsPlusSales.filter(({ image }) => (image || []).length > 0);
    const productsBySales = orderBy(productsWithImages, ['sales'], ['desc']) || [];

    return (
      <HrFr>
        <Jumbotron isSignedIn={isSignedIn} />
        <section className="productShowcase mt-4 section">
          <h2 className="d-none">Recent Products</h2>
          <ProductList isFlex={true} products={products} count={12} title="Recently Added" />
        </section>

        <Lookbook data={this.getStoreLookBook(stores, productsBySales)} variant="right" />

        <section className="productShowcase mt-4 section">
          <h2 className="d-none">Products By Sales</h2>
          <ProductList isFlex={true} products={productsBySales} count={12} title="Recently Added" />
        </section>

        <Lookbook data={this.getGenderLookBook(productsBySales)} flipped={true} variant="left" />

        <section className="section" id="categories">
          <h2 className="d-none">categories</h2>
          {this.renderCategories(categories, productsBySales)}
        </section>

        <Lookbook data={this.getDiscountLookBook(productsBySales)} variant="right" />
        <HowItWorks />
      </HrFr>
    );
  };
}
// End Component

// Export component as React-functional-Component
export default Home;
