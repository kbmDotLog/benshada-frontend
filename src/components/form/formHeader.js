/** Module imports */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Dsiplays FormHeader UI
 * @constructor
 * @param {Obj} props
 * @return {Obj} The UI DOM object
 */
const FormHeader = ({ title }) => (
  <nav>
    <div className="d-flex align-items-center">
      <div className=" just-width">
        <Link to="/" className="navbar-brand ">
          <i className="font-weight-bold">benshada</i>
        </Link>
      </div>
    </div>
    <h2 className="mb-4">{title}</h2>
  </nav>
);

/**
 * Component propTypes
 */
FormHeader.propTypes = { title: PropTypes.string };

/** Export component */
export default FormHeader;
