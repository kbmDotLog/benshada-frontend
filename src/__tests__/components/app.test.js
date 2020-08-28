// Module imports
import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';

// App import
import App from 'app';

// Store import
import store from 'redux/store';

// Shallow test App component
it('renders app component without crashing', () => {
  shallow(<Provider store={store}>
    <App />
  </Provider>);
});

// Test all components
it('renders entire app without crashing', () => {
  mount(<Provider store={store}>
    <App />
  </Provider>);
});
