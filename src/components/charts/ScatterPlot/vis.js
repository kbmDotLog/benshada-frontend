import * as d3 from 'd3';

const draw = (props) => {
  d3.select('.vis-scatterplot > *').remove();
  const { width } = props;
  const { height } = props;
  d3.select('.vis-scatterplot').append('svg').attr('width', width).attr('height', height);
};

export default draw;
