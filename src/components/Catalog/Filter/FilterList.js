// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Component imports
import Stars from '../../ProductList/ProductDisplay/Stars.js';

// Asset imports
import categories from '../../../assets/js/categories.js';
import genders from '../../../assets/js/genders.js';
import { filterList } from '../../../assets/js/filter.js';
import { toSplittedString } from '../../../assets/js/prototypes.js';

export default class FilterList extends Component {
  static propTypes = {
    active: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.number]),
    list: PropTypes.array,
    onClick: PropTypes.func,
    products: PropTypes.array,
    type: PropTypes.string
  };

  getActive = (item, type) => {
    let active = '';

    if (type !== 'size') {
      active = item === this.props.active
        || item === Number(this.props.active)
        || (item && item.name) === this.props.active
        ? 'filter-active'
        : '';
    }
    return active;
  };

  renderDisplay = (array, products, type) => array.map((item, i) => (
      <li
        className={`nav-link text-capitalize ${
          type === 'size' ? 'px-0 py-1' : 'filter'
        } ${this.getActive(item, type)}`}
        onClick={() => (type === 'size'
          ? ''
          : this.props.onClick(
            (['category', 'gender'].includes(type) ? item && item.name : item),
            type
          ))
        }
        key={`render${type}${i}`}
      >
        {{
          discount: <>{item}% off or More</>,
          rating: (
            <>
              <Stars count={Number(item)} /> & Up
            </>
          ),
          size: (
            <div key={`render${type}${i}`}>
              <div className="form-check">
                <label
                  className="form-check-label text-uppercase text-truncate"
                  style={{ width: '30%' }}
                  id={`product-${type}-${i}`}
                >
                  <input
                    className="form-check-input pointer"
                    type="checkbox"
                    value={item}
                    checked={(type === 'size' ? this.props.active : '').includes(item)}
                    id={`product-${type}-${i}`}
                    onChange={() => this.props.onClick(item, type)}
                  />
                  {item}
                </label>
              </div>
            </div>
          )
        }[type] || (
          <>
            <FontAwesomeIcon icon={item.icon} className="mr-2" />
            {item.name}{' '}
            {type === 'gender' ? '' : <span className="badge badge-primary bg-warning float-right mt-1">
              {
                products
                  .filter((product) => filterList(product, type, item.name)).length
              }
            </span>}
          </>
        )}
      </li>
  ));

  render = () => {
    const { type, products, list } = this.props;
    const array = { gender: genders, category: categories }[type] || list;

    return array.length < 1 ? (
      ''
    ) : (
      <div className="col-12 mb-4 text-capitalize">
        <h5>{toSplittedString(type)}</h5>
        <nav className="nav flex-column">{this.renderDisplay(array, products, type)}</nav>
      </div>
    );
  };
}
