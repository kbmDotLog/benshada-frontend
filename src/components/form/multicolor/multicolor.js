// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BlockPicker } from 'react-color';

// Asset imports
import './multicolor.css';

/**
 * Dsiplays a multiple color picker
 * @constructor
 */
export default class MultiColor extends Component {
  /** Component propTypes */
  static propTypes = {
    colors: PropTypes.array.isRequired,
    id: PropTypes.string,
    input: PropTypes.object,
    onUpdateColors: PropTypes.func.isRequired
  };

  /**
   * Updates selected colors
   * @param {object} hex - Hex value of new color
   * @param {[]} colors - Array of selected colors
   * @callback  onUpdateColors
   */
  updateColors = async (hex, colors, onUpdateColors, input) => {
    const newColors = colors.includes(hex)
      ? colors.filter((color) => color !== hex)
      : [...colors, hex];

    await onUpdateColors(newColors);
    input.onChange(newColors.join());
  };

  /**
   * Displays selected colors
   * @param {[]} colors
   * @return
   */
  renderColors = (colors) => colors.map((color) => (
      <li className="color-item shadow-sm" style={{ background: color }} key={`color-item-${color}`}></li>
  ));

  /**
   * Returns MultiColor UI
   * @return {object} The UI DOM object
   */
  render() {
    const {
      colors, id, input, onUpdateColors
    } = this.props;

    return (
      <div className="multi-color">
        <BlockPicker
          className="w-100"
          id={id}
          triangle="hide"
          color={colors.reverse()[0]}
          onChange={({ hex }) => this.updateColors(hex, colors, onUpdateColors, input)}
        />
        <input
          {...input}
          type="text"
          className="form-control"
          placeholder="Colors"
          value={colors.join()}
        />
        <ul className="color-list">{this.renderColors(colors)}</ul>
      </div>
    );
  }
}
