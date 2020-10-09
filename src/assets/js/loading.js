import React from 'react';
import PropTypes from 'prop-types';

export default function Loading(props) {
  return (
    <div className={`spinner-border text-${props.variant || 'white'}`} role="status">
          <span className="sr-only">Loading...</span>
        </div>
  );
}

Loading.propTypes = {
  variant: PropTypes.string
};
