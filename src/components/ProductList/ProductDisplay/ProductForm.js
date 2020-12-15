/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
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
    imageButtonValue: 'Select Image',
    data: new FormData(),
    buttonProduct: 'Upload Product'
  };

  constructor(props) {
    super(props);

    this.state = this.INIT;
  }

  static propTypes = {
    action: PropTypes.string,
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    formData: PropTypes.object,
    handleSubmit: PropTypes.func,
    user: PropTypes.object,
    product: PropTypes.object,
    products: PropTypes.array,
    onSubmit: PropTypes.func,
    initialize: PropTypes.func
  };

  getSnapshotBeforeUpdate = (prevProps) => ({
    shouldInitialize:
      (prevProps.product && prevProps.product._id)
      !== (this.props.product && this.props.product._id)
  });

  componentDidUpdate = (prevProps, prevState, snapshot) => snapshot
    .shouldInitialize && this.props.initialize(this.props.product);

  componentDidMount = () => this.props.initialize(this.props.product);

  getBlob = async (url) => {
    let blob = null;
    const p = await fetch(url);
    await p.blob().then((myBlob) => {
      blob = myBlob;
    });
    return blob;
  };

  onSubmit = async ({
    _id,
    image,
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
    batchQuality,
    updatedAt
  }) => {
    const { data } = this.state;

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
      sizes: sizes.map((size) => size.value),
      batchQuality: batchQuality || 0
    };

    Object.entries(productData).forEach(
      ([key, value]) => !data.get(key) && data.append(key, value)
    );

    if (image) {
      if (image.length > 0 && !data.has('image')) {
        const blob = await this.getBlob(image[0]);

        const date = new Date(updatedAt); // some mock date
        const lastModified = date.getTime();
        const existingImage = new File([blob], image, {
          type: blob.type,
          lastModified
        });

        data.append('image', existingImage);
      }
    } else if (!data.has('image')) {
      return toast.error('Do select an image');
    }

    return this.props.onSubmit(data);
  };

  getSizes = (sizesArray, category) => ({ shoes: sizesArray[1] }[category] || sizesArray[0]);

  render = () => {
    const {
      action,
      buttonValue,
      formData,
      product,
      products,
      user
    } = this.props;
    const mainMaterials = products.map((item) => item && item.mainMaterial);

    return (
      <>
        <h2 className="mb-0 px-3 pt-4">
          {action ? 'Upload Product' : 'Edit Product'}
        </h2>
        <p className="px-3 pb-4 text-danger font-weight-bold lead">
          Image must be a square
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
            object={product}
            onImageChange={(data) => this.setState(() => ({ data }))}
            type="product"
          />
        </div>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          // className={`animate__animated ${this.state.animationClass} m-0 px-lg-5`}
          className="m-0"
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
              className="col-12 col-md-6"
              placeholder="e.g: 50000"
            />
            <Field
              action="product"
              name="discountPercentage"
              type="number"
              component={FormField}
              label="Discount"
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
              className="col-12 col-md-6"
            />
          </div>

          <small className="section-header">Category</small>
          <div className="form-row align-items-center">
            {categories.map(({ name, icon }) => (
              <Field
                action="product"
                name="mainMaterial"
                type="datalist"
                options={mainMaterials.map((mainMaterial) => mainMaterial)}
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
              type="datalist"
              options={['Nigeria', 'Ghana']}
              component={FormField}
              label="Made In"
              placeholder="e.g: Nigeria"
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

            {(product && product.isBatch) || (user && user.type === 'UA') ? (
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
              options={formData ? this.getSizes(productSizes, formData.category) : []}
            />
          </div>

          <div className="button-group">
            <button className="btn btn-primary" type="submit">
              {buttonValue}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </form>
      </>
    );
  };
}

const warn = () => ({});

const mapStateToProps = ({ form, product }) => ({
  formData: form.packageForm && form.packageForm.values,
  product: product.selected,
  products: product.all
});

export default reduxForm({
  form: 'productForm',
  validate,
  warn
})(connect(mapStateToProps)(ProductForm));
