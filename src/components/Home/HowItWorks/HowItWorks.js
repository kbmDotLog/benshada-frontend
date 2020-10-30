/** Module impports */
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import {
  faAtom,
  faBullhorn,
  faHandHolding,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

/**
 * Displays How It Works
 * @constructor
 * @return The UI DOM object
 */
export default function HowItWorks() {
  return (
    <section className="container py-5" id="howItWorks">
      <h2 className="d-none">How It Works</h2>
      <article className="row py-4">
        <div className="col text-center">
          <h5>Only 4 steps to get started!</h5>
        </div>
      </article>

      <article
        id="carouselExampleIndicators"
        className="carousel carousel-steps slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators border border-light just-width center text-uppercase">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active just-width m-0 pb-3 px-4 rounded-0 text-center just-height"
          >
            buy
          </li>
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="1"
            className="just-width m-0 pb-3 px-4 rounded-0 text-center just-height"
          >
            sell
          </li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row py-4 justify-content-start">
              <div className="col-12 col-sm-8 col-md-6">
                <div className="row align-items-center">
                  <div className="col text-center">
                    <FontAwesomeIcon
                      icon={faBullhorn}
                      className=" fa-5x text-primary-benshada"
                    />
                  </div>
                  <div className="col-12 my-3 col-sm-8 col-lg-9">
                    <hgroup className="row">
                      <h4 className="col-2 text-center">01.</h4>
                      <h4 className="col">Step 1</h4>
                    </hgroup>
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Eius esse facilis aut eos velit dolorem reiciendis iusto
                      similique quae accusamus delectus, deleniti, ipsum fugiat
                      voluptatem. Quas dicta aliquam cum. Magni!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row py-4 text-right justify-content-end">
              <div className="col-12 col-sm-8 col-md-6">
                <div className="row align-items-center">
                  <div className="col-12 my-3 col-sm-8 col-lg-9">
                    <hgroup className="row text-right">
                      <h4 className="col-5 col-sm-7 col-lg-8 p-0">02.</h4>
                      <h4 className="col">Step 2</h4>
                    </hgroup>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Aspernatur autem iste, nisi sunt explicabo odit rem
                      dolores nobis minima aliquid iusto distinctio quia itaque
                      architecto ipsam, laborum animi ipsa fugiat.
                    </p>
                    <small>Don&apos;t worry, your idea is safe with us</small>
                  </div>
                  <div className="col text-center">
                    <FontAwesomeIcon
                      icon={faLightbulb}
                      className=" fa-5x text-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row py-4 justify-content-start">
              <div className="col-12 col-sm-8 col-md-6">
                <div className="row align-items-center">
                  <div className="col text-center">
                    <FontAwesomeIcon
                      icon={faAtom}
                      className=" fa-5x text-success"
                    />
                  </div>
                  <div className="col-12 my-3 col-sm-8 col-lg-9">
                    <hgroup className="row">
                      <h4 className="col-2 text-center">03.</h4>
                      <h4 className="col">Step 3</h4>
                    </hgroup>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Tempora omnis molestias at autem porro aspernatur dicta,
                      fugiat id sit quas, saepe dolor laboriosam natus! Alias
                      porro ex vitae ea nemo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row py-4 text-right justify-content-end">
              <div className="col-12 col-sm-8 col-md-6">
                <div className="row align-items-center">
                  <div className="col-12 my-3 col-lg-8 col-xl-9">
                    <hgroup className="row text-right">
                      <h4 className="col-4 col-sm-5 col-lg-7 col-xl-8 p-0">
                        04.
                      </h4>
                      <h4 className="col">Step 4</h4>
                    </hgroup>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Eveniet obcaecati illum deleniti eius magni sit ex animi.
                      Distinctio, vel quasi. Est ipsa vero, magni suscipit
                      veritatis expedita saepe sapiente necessitatibus!
                    </p>
                  </div>
                  <div className="col text-center">
                    <FontAwesomeIcon
                      icon={faUsers}
                      className=" fa-5x text-danger"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row py-4 justify-content-start">
              <div className="col-12 col-sm-8 col-md-6">
                <div className="row align-items-center">
                  <div className="col text-center">
                    <FontAwesomeIcon
                      icon={faBullhorn}
                      className=" fa-5x text-primary-benshada"
                    />
                  </div>
                  <div className="col-12 my-3 col-sm-8 col-lg-9">
                    <hgroup className="row">
                      <h4 className="col-2 text-center">01.</h4>
                      <h4 className="col">Step 1</h4>
                    </hgroup>
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Eius esse facilis aut eos velit dolorem reiciendis iusto
                      similique quae accusamus delectus, deleniti, ipsum fugiat
                      voluptatem. Quas dicta aliquam cum. Magni!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row py-4 text-right justify-content-end">
              <div className="col-12 col-sm-8 col-md-6">
                <div className="row align-items-center">
                  <div className="col-12 my-3 col-sm-8 col-lg-9">
                    <hgroup className="row text-right">
                      <h4 className="col-5 col-sm-7 col-lg-8 p-0">02.</h4>
                      <h4 className="col">Step 2</h4>
                    </hgroup>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Sequi facere qui dolores nulla fuga tempora quo! Soluta
                      magni inventore ratione dolor sapiente quibusdam ab, sed
                      officia nulla sunt esse aperiam!
                    </p>
                  </div>
                  <div className="col text-center">
                    <FontAwesomeIcon
                      icon={faHandHolding}
                      className=" fa-5x text-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row py-4 justify-content-start">
              <div className="col-12 col-sm-8 col-md-6">
                <div className="row align-items-center">
                  <div className="col text-center">
                    <FontAwesomeIcon
                      icon={faAtom}
                      className=" fa-5x text-success"
                    />
                  </div>
                  <div className="col-12 my-3 col-sm-8 col-lg-9">
                    <hgroup className="row">
                      <h4 className="col-2 text-center">03.</h4>
                      <h4 className="col">Step 3</h4>
                    </hgroup>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Tempora autem reprehenderit delectus minus quis optio
                      porro officiis, magni recusandae ipsum labore quibusdam!
                      Harum, magni. Mollitia facilis incidunt quaerat debitis
                      dignissimos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row py-4 text-right justify-content-end">
              <div className="col-12 col-sm-8 col-md-6">
                <div className="row align-items-center">
                  <div className="col-12 my-3 col-lg-8 col-xl-9">
                    <hgroup className="row text-right">
                      <h4 className="col-4 col-sm-5 col-lg-7 col-xl-8 p-0">
                        04.
                      </h4>
                      <h4 className="col">Step 4</h4>
                    </hgroup>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Laborum eaque quasi sit quibusdam soluta aperiam nihil
                      quam quia! Debitis eligendi tempore laudantium obcaecati
                      est iste minima velit, inventore vel nisi!
                    </p>
                  </div>
                  <div className="col text-center">
                    <FontAwesomeIcon
                      icon={faUsers}
                      className=" fa-5x text-danger"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
