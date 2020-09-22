// Module imports
import React, { Component } from 'react';

// Component Imports
import CategoryList from './CategoryList.js';
import CategoryCarousel from './CategoryCarousel.js';

// Start Component
export default class Jumbotron extends Component {
  render = () => (
    <div className="jumbotron jumbotron-fluid bg-light-benshada pt-5 pb-0 mb-3">
      <div className="container bg-white shadow-sm">
        <div className="row">
          <CategoryList />
          <CategoryCarousel />
        </div>
      </div>
    </div>
  );
}
// End Component
