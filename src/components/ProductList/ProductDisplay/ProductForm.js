/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { faDollarSign, faPercentage, faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { productValidate as validate } from '../../../assets/js/validate.js';

import '../../../assets/css/form.css';
import FormField from '../../form/formField.js';
import categories from '../../../assets/js/categories.js';
import genders from '../../../assets/js/genders.js';
import productSizes from '../../../assets/data/sizes.json';
import ImageUpload from '../../Image/ImageUpload.js';

class ProductForm extends Component {
  INIT = {
    animationClass: 'animate__zoomIn',
    imageButtonValue: 'Select Image',
    data: null,
    buttonProduct: 'Upload Product'
  };

  constructor(props) {
    super(props);

    this.state = this.INIT;
  }

  static propTypes = {
    action: PropTypes.string,
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    handleSubmit: PropTypes.func,
    user: PropTypes.object,
    product: PropTypes.object,
    onSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    initialize: PropTypes.func
  };

  componentWillUnmount() {
    this.setState({ animationClass: 'animate__slideOutLeft' });
  }

  getSnapshotBeforeUpdate = (prvP) => ({
    shouldInitialize:
      (prvP.product && prvP.product._id)
      !== (this.props.product && this.props.product._id)
  });

  componentDidUpdate = (prvP, prvS, snapshot) => (snapshot.shouldInitialize ? this.props.initialize(this.props.product) : '')

  componentDidMount = () => this.props.initialize(this.props.product);

  onSubmit = ({
    _id,
    name,
    shortDescription,
    longDescription,
    price,
    discountPercentage,
    quantity,
    color,
    category,
    gender,
    mainMaterial,
    productionCountry,
    guarantee,
    sizes,
    batchQuality
  }) => {
    const { data } = this.state;

    if (!data) {
      return toast.error('Do select an image');
    }

    const productData = {
      _id,
      name,
      shortDescription,
      longDescription,
      price,
      discountPercentage,
      quantity,
      color,
      category,
      gender,
      mainMaterial,
      productionCountry,
      guarantee,
      sizes,
      batchQuality: batchQuality || 0
    };

    Object.entries(productData).forEach(([key, value]) => {
      const v = key === 'sizes' ? value.map((size) => size.value) : value;

      return data.get(key) ? '' : data.append(key, v);
    });

    return this.props.onSubmit(data);
  };

  render() {
    const { animationClass } = this.state;

    return (
      <>
        <h2 className="mb-0 px-3 pt-4">{this.props.action ? 'Upload Product' : 'Edit Product'}</h2>
        <p className="px-3 pb-4 text-danger font-weight-bold lead">
          Image should be 680x850 pixels
        </p>
        <div
          className="position-absolute w-100 text-center item-upload"
          id="productUpload"
          style={{
            top: '0'
          }}
        >
          <ImageUpload
            buttonValue={this.state.imageButtonValue}
            object={this.props.product}
            onImageChange={(data) => this.setState({ data })}
            type="product"
          />
        </div>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className={`animate__animated ${animationClass} m-0`}
          autoComplete="off"
          id="productForm"
        >
          <div className="form-row">
            <Field
              action="product"
              name="name"
              type="text"
              component={FormField}
              label="Product Name"
              className="col-12"
              placeholder="e.g Oxford Shoes"
            />
          </div>

          <div className="form-row">
            <Field
              action="product"
              name="shortDescription"
              type="textarea"
              component={FormField}
              label="Short Description"
              className="col-12 col-md-6"
              placeholder="e.g: Cooperate unisex shoes"
            />
            <Field
              action="product"
              name="longDescription"
              type="textarea"
              component={FormField}
              label="Long Description"
              className="col-12 col-md-6"
              placeholder="e.g: Cooperate unisex shoes for men to go for weddings"
            />
          </div>

          <div className="form-row">
            <Field
              action="product"
              name="price"
              type="number"
              component={FormField}
              label="Price"
              icon={faDollarSign}
              className="col-12 col-md-6"
              placeholder="e.g: 50000"
            />
            <Field
              action="product"
              name="discountPercentage"
              type="number"
              component={FormField}
              label="Discount"
              icon={faPercentage}
              className="col-12 col-md-6"
              placeholder="e.g: 10"
            />
          </div>

          <div className="form-row">
            <Field
              action="product"
              name="quantity"
              type="number"
              component={FormField}
              label="Quantity"
              className="col-12 col-md-6"
              placeholder="e.g: 100"
            />

            <Field
              action="product"
              name="color"
              type="color"
              component={FormField}
              label="Color"
              icon={faPaintBrush}
              className="col-12 col-md-6"
              placeholder="#000000"
            />
          </div>

          <small className="section-header">Category</small>
          <div className="form-row align-items-center">
            {categories.map(({ name, icon }) => (
              <Field
                action="product"
                name="category"
                type="radio"
                component={FormField}
                label={name}
                icon={icon}
                className="col form-holder-select"
                value={name}
                key={`product-category-${name}`}
              />
            ))}
          </div>

          <small className="section-header">Gender</small>
          <div className="form-row align-items-center">
            {genders.map(({ name, icon }) => (
              <Field
                action="product"
                name="gender"
                type="radio"
                component={FormField}
                label={name}
                icon={icon}
                className="col form-holder-select"
                value={name}
                key={`product-gender-${name}`}
              />
            ))}
          </div>

          <div className="form-row">
            <Field
              action="product"
              name="mainMaterial"
              type="text"
              component={FormField}
              label="Main Material"
              className="col-12 col-md-6"
              placeholder="e.g: Leather"
            />
            <Field
              action="product"
              name="productionCountry"
              type="text"
              component={FormField}
              label="Made In"
              placeholder="e.g: Nigeria"
              icon={faFlag}
              className="col-12 col-md-6"
            />
          </div>

          <div className="form-row">
            <Field
              action="product"
              name="guarantee"
              type="number"
              component={FormField}
              label="Days of Warranty"
              placeholder="e.g: 10"
              className="col-12 col-md-6"
            />
            {(this.props.product && this.props.product.isBatch)
            || (this.props.user && this.props.user.type === 'UA') ? (
              <Field
                action="product"
                name="batchQuality"
                type="number"
                component={FormField}
                label="Batch Quality"
                placeholder="e.g: 30"
                className="col-12 col-md-6"
              />
              ) : (
                ''
              )}
          </div>

          <div className="form-row">
            <Field
              action="product"
              name="sizes"
              type="multi"
              component={FormField}
              label="Available Sizes"
              className="col-12"
              options={productSizes}
            />
          </div>

          <div className="button-group">
            <button className="btn btn-primary" type="submit">
              {this.props.buttonValue}
            </button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
              Done
            </button>
          </div>
        </form>
      </>
    );
  }
}

const warn = () => ({});

const mapStateToProps = ({ product }) => ({
  product: product.selected
});

export default reduxForm({
  form: 'productForm',
  validate,
  warn
})(connect(mapStateToProps)(ProductForm));
