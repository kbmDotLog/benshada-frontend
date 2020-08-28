// Module imports
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

// Component imports
import Home from 'components/home';

// Asset imports
import 'assets/css/app.css';

export default class App extends React.Component {
  render = () => (
    <Router>
      <Route path="/" exact component={Home} />
    </Router>
  );
}
