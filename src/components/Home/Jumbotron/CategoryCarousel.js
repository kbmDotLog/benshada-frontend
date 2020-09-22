// Module imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Asset Imports
import banner1 from '../../../assets/img/jumbotron/benshadawebbanners01.jpg';
import banner2 from '../../../assets/img/jumbotron/benshadawebbanners02.jpg';
import banner3 from '../../../assets/img/jumbotron/benshadawebbanners03.jpg';
import banner4 from '../../../assets/img/jumbotron/benshadawebbanners04.jpg';

// Start Component
export default class CategoryCarousel extends Component {
  // Render Banners
  renderBanners = () => [
    { src: banner1, to: 'bags' },
    { src: banner2, to: 'shoes' },
    { src: banner3, to: 'clothes' },
    { src: banner4, to: 'accessories' }
  ].map(({ src, to }, i) => (
      <div
        className={`carousel-item ${i === 0 ? 'active' : ''}`}
        key={i}
        style={{ height: '60vh' }}
      >
        <Link
          to={`/catalog/?a=p&category=${to}`} className="h-100 d-block"
        >
          <img
            alt=""
            src={src}
            className="img-fluid w-100 h-100"
          />
        </Link>
      </div>
  ));

  render() {
    return (
      <div className="col-12 col-lg mb-0">
        <div className="row">
          <div id="carouselExampleIndicators" className="carousel slide w-100" data-ride="carousel">
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              ></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            </ol>
            <div className="carousel-inner">{this.renderBanners()}</div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
// End COmponent
