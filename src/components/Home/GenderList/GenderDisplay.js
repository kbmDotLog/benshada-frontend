// Module imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

// Start Component
export default class GenderDisplay extends Component {
  static propTypes = {
    icon: PropTypes.any,
    name: PropTypes.string
  };

  render = () => {
    const { name, icon } = this.props;

    return (
      <Link to={`/catalog/?a=p&gender=${name}`} className="col p-2">
        <FontAwesomeIcon className="icon text-primary-benshada" icon={icon} />
        <p>{name}</p>
      </Link>
    );
  };
}
// End Component
