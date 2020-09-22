/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';
import { connect } from 'react-redux';

// Component imports
import BarChart from '../../charts/BarChart/index.js';
import LineChart from '../../charts/LineChart/index.js';
import PieChart from '../../charts/PieChart/index.js';
import TabList from '../TabList/TabList.js';
import { unique } from '../../../assets/js/prototypes.js';
import NumberCardList from './NumberCardList/NumberCardList.js';

// Start Component
class Analytics extends Component {
  static propTypes = {
    orders: PropTypes.array,
    products: PropTypes.array,
    store: PropTypes.object,
    transactions: PropTypes.array
  };

  averageProductPrice = (products) => (products.length > 0
    ? products
      .map(({ price, discountPercentage }) => price * (1 - discountPercentage / 100))
      .reduce((total, num) => total + num, 0) / products.length
    : 0);

  getTotalOrderRevenue = (pO) => pO.map(({ totalPrice }) => totalPrice).reduce((a, b) => a + b, 0);

  getTotalCustomers = (paidOrders) => unique(paidOrders.map(({ user }) => user && user._id)).length;

  productRevenue = (paidOrders) => {
    const productArray = paidOrders.map((order) => order && order.product);

    const data = this.props.products
      .filter((product) => productArray.includes(product && product._id))
      .map(({
        _id, name, price, discountPercentage
      }) => ({
        name,
        revenue:
          productArray.filter((item) => item === _id).length
          * price
          * (1 - discountPercentage / 100)
      }));

    return data;
  };

  timeRevenue = (paidOrders) => paidOrders.map(({ updatedAt, totalPrice }) => ({
    updatedAt: updatedAt.toDashDate(),
    totalPrice
  }));

  getShopOrders = () => {
    // Props
    const { products, store, orders } = this.props;

    // Get shop products
    const shopProductsIDs = products.filter(({ shop }) => shop === store._id).map(({ _id }) => _id);
    const shopOrders = orders.filter((item) => shopProductsIDs.includes(item && item.product));
    return shopOrders;
  };

  getPaidOrders = (shopOrders) => {
    // Get shop products
    const txsOrderIDs = this.props.transactions.map((item) => item && item.order);
    const txsRefs = this.props.transactions.map((item) => item && item.trxnRef);
    const paidOrders = shopOrders.filter(
      (order) => txsRefs.includes(order.orderNumber) || txsOrderIDs.includes(order._id)
    );
    return paidOrders;
  };

  getCustomerOrders = (paidOrders) => paidOrders.map(({ user, totalPrice }) => ({
    name: user.name,
    totalPrice
  }));

  getUniqueCustomerNames = (paidOrders) => unique(paidOrders.map(({ user }) => user && user.name));

  render = () => {
    const { store } = this.props;
    const shopOrders = this.getShopOrders();
    const paidOrders = this.getPaidOrders(shopOrders);
    const orderRevenue = this.getTotalOrderRevenue(paidOrders);
    const customers = this.getTotalCustomers(paidOrders);
    const customerOrders = this.getCustomerOrders(paidOrders);
    const uniqueCustomerNames = this.getUniqueCustomerNames(paidOrders);
    const content = [
      <>
        <NumberCardList
          list={[
            { isNaira: true, title: 'total revenue', value: orderRevenue },
            { isNaira: false, title: 'total orders', value: shopOrders.length },
            {
              isNaira: true,
              title: 'average product price',
              value: this.averageProductPrice((store && store.products) || [])
            }
          ]}
        />

        <div className="card shadow-sm">
          <div className="card-body w-100 p-3" style={{ maxHeight: '75vh' }}>
            <p className="card-title text-uppercase">revenue over time</p>

            <ContainerDimensions>
              {({ height, width }) => (paidOrders.length < 1 ? (
                  <small className="mt-3">No products purchased yet</small>
              ) : (
                  <LineChart
                    data={this.timeRevenue(paidOrders)}
                    width={width * 0.95}
                    height={height * 0.8}
                  />
              ))
              }
            </ContainerDimensions>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body w-100 p-3" style={{ maxHeight: '75vh' }}>
            <p className="card-title text-uppercase">revenue per product</p>
            <ContainerDimensions>
              {({ height, width }) => (paidOrders.length < 1 ? (
                  <small className="mt-3">No products purchased yet</small>
              ) : (
                  <BarChart
                    data={this.productRevenue(paidOrders)}
                    width={width * 0.95}
                    height={height * 0.8}
                  />
              ))
              }
            </ContainerDimensions>
          </div>
        </div>
      </>,
      <>
        <NumberCardList
          list={[
            { isNaira: false, title: 'total customers', value: customers },
            {
              isNaira: true,
              title: 'average customer spend',
              value: customers === 0 ? 0 : orderRevenue / customers
            }
          ]}
        />

        <div className="card shadow-sm">
          <div className="card-body w-100 p-3" style={{ maxHeight: '75vh' }}>
            <p className="card-title text-uppercase">revenue per customer</p>
            <ContainerDimensions>
              {({ height, width }) => (paidOrders.length < 1 ? (
                  <small className="mt-3">No products purchased yet</small>
              ) : (
                  <PieChart
                    data={[customerOrders, uniqueCustomerNames]}
                    width={width * 0.95}
                    height={height * 0.8}
                  />
              ))
              }
            </ContainerDimensions>
          </div>
        </div>

        {/* <div className="card shadow-sm">
            <div className="card-body w-100 p-3" style={{ maxHeight: "75vh" }}>
              <p className="card-title text-uppercase">
                new vs. returning customers
              </p>
              <ContainerDimensions>
                {({ height, width }) => (
                  <MultiLineChart
                    datas={[data[0], data[1]]}
                    width={width * 0.95}
                    height={height * 0.8}
                  />
                )}
              </ContainerDimensions>
            </div>
          </div> */}
      </>
    ];

    return (
      <div className="tab-content" id="analyticsTabContent">
        <div className="px-4 mb-4 text-center text-lg-left">
          <TabList list={['revenue', 'customer']} content={content} />
        </div>
      </div>
    );
  };
}
// End Component

const mapStateToProps = ({
  order, store, transaction, product
}) => ({
  orders: order.all,
  products: product.all,
  store: store.selected,
  transactions: transaction.all
});

export default connect(mapStateToProps)(Analytics);
