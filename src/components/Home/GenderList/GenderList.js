// Module imports
import React, { Component } from 'react';

// Asset imports
import '../../../assets/css/gender.css';
import GenderDisplay from './GenderDisplay.js';
import genders from '../../../assets/js/genders.js';

export default class GenderList extends Component {
  renderGenderList = () => genders.map(({ name, icon }, i) => <GenderDisplay key={`GenderDisplay${i}`} icon={icon} name={name} />);

  render = () => (
    <div className="container" id="genderList">
      <div className="row justify-content-between text-center bg-white bg-lg-light">{this.renderGenderList()}</div>
    </div>
  );
}
