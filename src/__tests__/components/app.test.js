import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import App from '../../app.js';
import store from '../../redux/store.js';

it('renders app component without crashing', () => {
  shallow(<Provider store={store}>
    <App />
  </Provider>);
});

it('renders entire app without crashing', () => {
  mount(<Provider store={store}>
    <App />
  </Provider>);
});
