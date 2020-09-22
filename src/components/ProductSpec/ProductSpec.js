// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

// Component imports
import ProductList from '../ProductList/ProductList.js';

// Asset imports
import { randNum } from '../../assets/js/prototypes.js';

// Start Component
class ProductSpec extends Component {
  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.any,
    type: PropTypes.object,
    products: PropTypes.array
  };

  render = () => {
    const reversed = randNum(1);
    const {
      title, icon, products, type
    } = this.props;

    const typeName = type && type.name;
    const typeValue = type && type.value;

    return (
      <div className="container my-4 bg-white">
        <div className={`row bg-warning ${reversed ? 'flex-row-reverse' : ''}  h-100 align-items-center`}>
          <div className="col-12 col-md-3 p-4">
            <h5 className="text-capitalize">{title}</h5>
            <p>
              Make your selection from our latest arrivals and top deals in this category to add to your cart. <br />{' '}
              Some of these products are discounted also.
            </p>

            <Link to={`/catalog/?a=p&${typeName}=${typeValue}`}>
              <button className="btn btn-outline-danger rounded-pill mt-3">Shop Now</button>
            </Link>
            <div className="text-right">
              <FontAwesomeIcon icon={icon} className="fa-3x" />
            </div>
          </div>
          <div className="col flex-grow-1 bg-white py-4 product-spec">
            <ProductList products={products || []} type={type} count={6} />
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = ({ product }) => ({ products: product.all });

export default connect(mapStateToProps)(ProductSpec);
