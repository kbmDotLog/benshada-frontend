// Module imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Component Imports
import Sidenav from '../SideNav/SideNav.js';

// Asset imports
import '../../../assets/css/jumbo.min.css';

// Start Component
export default class Jumbotron extends Component {
  static propTypes = {
    isSignedIn: PropTypes.bool
  }

  renderCreateShop = (isSignedIn) => (!isSignedIn ? (
      <p>
        <Link to="/register" className="btn btn-primary-benshada py-4 w-100">
          Create Your Shop
        </Link>
      </p>
  ) : (
    ''
  ));

  render = () => (
    <>
      <section id="jumbo" className="jumbo jumbo-home position-relative rounded-0">
        <h2 className="d-none">Jumbo</h2>
        <article className="jumbotron jumbotron-fluid bg-white py-0 h-100">
          <div className="container-fluid h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12 col-xl p-4 d-none d-xl-block">
                <div className="intro">
                  <h4 className="year text-uppercase position-relative">2020</h4>
                  <hgroup className="my-4 my-xl-5 pl-xl-5">
                    <h4 className="display-4">
                      Latest
                      <br />
                      Collection
                    </h4>
                    <h6 className="d-none">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor quia
                      laudantium culpa quam totam voluptas facere repudiandae nemo itaque libero
                      numquam sit deserunt alias, doloribus inventore quod pariatur eveniet at!
                    </h6>
                  </hgroup>
                  <p className="lead">
                    <Link
                      to="/catalog/?a=p"
                      className="btn btn-primary d-xl-none rounded-0"
                      role="button"
                    >
                      See More
                    </Link>

                    <Link
                      className="btn btn-primary d-none d-xl-inline-block rounded-0"
                      to="/catalog/?a=p"
                      role="button"
                    >
                      See More
                    </Link>
                  </p>
                </div>
              </div>
              <div
                id="carouselId"
                className="col-12 col-xl-9 px-0 carousel slide h-100"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li data-target="#carouselId" data-slide-to="0" className="active"></li>
                  <li data-target="#carouselId" data-slide-to="1"></li>
                  <li data-target="#carouselId" data-slide-to="2"></li>
                  <li data-target="#carouselId" data-slide-to="3"></li>
                </ol>
                <div className="carousel-inner h-100" role="listbox">
                  <Link
                    to="/catalog?a=p&category=accessories"
                    className="carousel-item bg-secondary-gradient h-100 active"
                  ></Link>
                  <Link
                    to="/catalog?a=p&category=bags"
                    className="carousel-item bg-secondary-gradient h-100"
                  ></Link>
                  <Link
                    to="/catalog?a=p&category=clothes"
                    className="carousel-item bg-secondary-gradient h-100"
                  ></Link>
                  <Link
                    to="/catalog?a=p&category=shoes"
                    className="carousel-item bg-secondary-gradient h-100"
                  ></Link>
                </div>
                <a
                  className="carousel-control-prev v-child"
                  href="#carouselId"
                  role="button"
                  data-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next v-child"
                  href="#carouselId"
                  role="button"
                  data-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </article>
        <Sidenav list={['Accessories', 'Bags', 'Shoes']} />
      </section>
      {this.renderCreateShop(this.props.isSignedIn)}
    </>
  );
}
// End Component
