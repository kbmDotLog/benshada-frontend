// Module imports
import React from 'react';

// Component imports
import PropTypes from 'prop-types';
import Jumbotron from './Jumbotron/Jumbotron.js';
import GenderList from './GenderList/GenderList.js';
import ProductSpec from '../ProductSpec/ProductSpec.js';

// Asset imports
import categories from '../../assets/js/categories.js';
import { randNum } from '../../assets/js/prototypes.js';
import genders from '../../assets/js/genders.js';
import ProductList from '../ProductList/ProductList.js';
import StoreList from '../StoreList/StoreList.js';
import TestimonialList from './TestimonialList/TestimonialList.js';
import HowItWorks from './HowItWorks/HowItWorks.js';
import ImageGallery from './ImageGallery/ImageGallery.js';
import HrFr from '../HrFr/HrFr.js';

// Start Component
class Home extends React.Component {
  static propTypes = {
    isSignedIn: PropTypes.bool,
    products: PropTypes.array,
    stores: PropTypes.array,
    testimonials: PropTypes.array,
    user: PropTypes.object
  };

  render = () => {
    const {
      isSignedIn, user, products, stores, testimonials
    } = this.props;
    const categoriesRandomNumber = randNum(3);
    const genderRandomNumber = randNum(2);
    let category = null;
    let gender = null;

    if (isSignedIn) {
      category = {
        title: user && user.categories && user.categories[0],
        icon:
          categories.filter(
            ({ name }) => name.toLowerCase() === category && category.title.toLowerCase()
          )[0]
          && categories.filter(
            ({ name }) => name.toLowerCase() === category && category.title.toLowerCase()
          )[0].icon
      };

      gender = {
        title: user && user.gender,
        icon:
          genders.filter(
            ({ name }) => name.toLowerCase() === gender && gender.title.toLowerCase()
          )[0]
          && genders.filter(
            ({ name }) => name.toLowerCase() === gender && gender.title.toLowerCase()
          )[0].icon
      };
    }

    category = {
      title: categories[categoriesRandomNumber] && categories[categoriesRandomNumber].name,
      icon: categories[categoriesRandomNumber] && categories[categoriesRandomNumber].icon
    };

    gender = {
      title: genders[genderRandomNumber] && genders[genderRandomNumber].name,
      icon: genders[genderRandomNumber] && genders[genderRandomNumber].icon
    };

    return (
      <HrFr>
        <Jumbotron />
        <GenderList />
        <ProductSpec
          title={category.title}
          type={{
            name: 'category',
            value: category.title
          }}
          icon={category.icon}
        />
        <ProductSpec
          title={gender.title}
          type={{
            name: 'gender',
            value: gender.title
          }}
          icon={gender.icon}
        />
        <div className="container my-4">
          <div className="row">
            <div className="col-12 bg-white my-4 py-3">
              <ProductList products={products || []} count={12} title="Recently Added" />
            </div>
            <div className="col-12 flex-grow-1 bg-white my-4 py-3">
              {!isSignedIn ? (
                ''
              ) : (
                <StoreList
                  stores={stores || []}
                  type={{ name: 'state', value: user && user.state }}
                  count={12}
                  title="Stores Around You"
                />
              )}
            </div>
            <div className="col-12 flex-grow-1 bg-white my-4 py-3">
              <ProductList
                products={products || []}
                count={12}
                type={{ name: 'discountPercentage', value: 0 }}
                title="Discounted"
              />
            </div>
            <div className="col-12 flex-grow-1 bg-white my-4 py-3">
              <StoreList
                stores={stores || []}
                type={{ name: 'isRegisteredBusiness', value: true }}
                count={12}
                title="Registered Stores"
              />
            </div>
          </div>
        </div>
        <TestimonialList title="Customer Testimonies" count={3} testimonials={testimonials} />
        <HowItWorks />
        <ImageGallery />
      </HrFr>
    );
  };
}
// End Component

// Export component as React-functional-Component
export default Home;
