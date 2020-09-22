// Modules Import
import React from 'react';
import { Link } from 'react-router-dom';

// Start Component
export default function UnAuthHeader() {
  return (
    <form className="form-inline pl-md-3">
      <Link to="/register" className="flex-grow-1 mr-3">
        <button className="btn btn-primary rounded-0 w-100" type="button">
          Register
        </button>
      </Link>
      <Link to="/login" className="flex-grow-1">
        <button className="btn btn-primary rounded-0 w-100" type="button">
          Login
        </button>
      </Link>
    </form>
  );
}
// End Component
