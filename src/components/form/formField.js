import React from 'react';
import PropTypes from 'prop-types';
import Select from './select.js';
import DataList from './datalist.js';
import Input from './input.js';
import TextArea from './textArea.js';
import Multi from './multi.js';

const FormField = ({
  input, label, type, placeholder, icon, action, className,
  options, meta: { touched, error, warning }, disabled, val, maxLength
}) => (
  <div className={`${className} form-holder`}>
    {{
      radio: <Select icon={icon} action={action} input={input} label={label} type={type} />,
      datalist: (
        <DataList
          icon={icon}
          action={action}
          input={input}
          label={label}
          placeholder={placeholder}
          touched={touched}
          error={error}
          options={options}
        />
      ),
      multi: (
        <Multi
          icon={icon}
          action={action}
          input={input}
          label={label}
          touched={touched}
          error={error}
          options={options}
        />
      ),
      textarea: <TextArea
        icon={icon}
        action={action}
        input={input}
        label={label}
        placeholder={placeholder}
        touched={touched}
        error={error}
      />
    }[type] || (
      <Input
        icon={icon}
        action={action}
        input={input}
        label={label}
        type={type}
        placeholder={placeholder}
        touched={touched}
        error={error}
        disabled={disabled}
        val={val}
        maxLength={maxLength}
      />
    )}
    {touched
      ? touched && error && <small className="form-info text-danger">{error}</small>
      : warning && <small className="form-info text-info">{warning}</small>}
  </div>
);

FormField.propTypes = {
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

export default FormField;
