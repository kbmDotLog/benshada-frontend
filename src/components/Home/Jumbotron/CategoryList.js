// Module Imports
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

// Category imports
import categories from '../../../assets/js/categories.js';

// Start Component
export default class CategoryList extends Component {
  // categories
  renderCats = () => categories.map(({ name, icon }, i) => (
      <div className="row text-center align-items-center flex-fill py-2" key={i}>
        <div className="col">
          <Link to={`/catalog/?a=p&category=${name}`}>
            <FontAwesomeIcon className="fa-3x text-primary-benshada" icon={icon} />
            <p className="font-weight-bold text-uppercase text-secondary">{name}</p>
          </Link>
        </div>
      </div>
  ))

  render = () => (
      <div className="d-none col-lg-2 d-lg-flex flex-column">{this.renderCats()}</div>
  );
}
// End Component
