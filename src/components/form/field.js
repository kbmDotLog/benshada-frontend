// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

// Component imports
import FormIcon from 'components/form/icons/formIcon.js';
import ValidateIcon from 'components/form/icons/validateIcon.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class FormField extends Component {
  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    action: PropTypes.string,
    className: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.array,
    disabled: PropTypes.bool,
    val: PropTypes.string,
    maxLength: PropTypes.number
  };

  renderOptions = (options, id) => options.map((option, i) => <option key={`${id}${i}`} value={option} />);

  renderLabel = ({
    type, icon, label, id, action
  }, input) => (type === 'radio' ? (
      <label className="custom-control-label py-3" htmlFor={`${action}${input.name}${label}`}>
        <FontAwesomeIcon icon={icon} className="icon" /> {label}
      </label>
  ) : (
      <label htmlFor={id}>{label}</label>
  ));

  renderType = ({
    type, action, placeholder, disabled, val, maxLength, options
  }, id, input) => ({
    textarea: (
        <textarea
          {...input}
          component={type}
          type={type}
          className="form-control"
          name={`${action}${input.name}`}
          id={id}
          placeholder={placeholder}
          autoComplete="off"
          disabled={disabled}
          value={val || input.value}
          maxLength={maxLength}
          list={options ? `${id}s` : ''}
        ></textarea>
    ),
    multi: (
        <Select
          {...input}
          options={options}
          value={input.value}
          isMulti={true}
          isSearchable={true}
          id={id}
          className="form-control"
          style={{ zIndex: 999 }}
          onBlur={() => input.onBlur([...input.value])}
        />
    )
  }[type] || (
      <input
        {...input}
        type={type}
        className={type === 'radio' ? 'custom-control-input' : 'form-control'}
        id={id}
        placeholder={placeholder}
        name={`${action}${input.name}`}
        autoComplete="off"
        disabled={disabled}
        value={val || input.value}
        maxLength={maxLength}
        rows={type === 'textarea' ? 3 : undefined}
      />
  ));

  render = () => {
    const {
      icon, action, input, type, meta, options, className
    } = this.props;

    const { touched, error, warning } = meta;

    const id = `${action}${input.name}${Math.random() * 1099511627776}`;

    return (
      <div className={`${className} form-holder mb-3 text-left`}>
        <div className="d-flex align-items-center">
          {type === 'radio' ? '' : <FormIcon icon={icon} />}
          <div className="flex-grow-1">
            {this.renderLabel(this.props, input)}
            {this.renderType(this.props, id, input)}

            {type !== 'datalist' ? (
              ''
            ) : (
              <datalist id={`${id}s`}>{this.renderOptions(options, id)}</datalist>
            )}
          </div>
          {type === 'radio' ? '' : <ValidateIcon touched={touched} error={error} />}
        </div>
        {touched
          ? error && <small className="form-info text-danger">{error}</small>
          : warning && <small className="form-info text-info">{warning}</small>}
      </div>
    );
  };
}
