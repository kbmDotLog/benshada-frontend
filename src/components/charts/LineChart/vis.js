import * as d3 from 'd3';
import _ from 'lodash';

const draw = (props) => {
  let data = [];
  if (props.data !== null) {
    data = _.cloneDeep(props.data);
  }
  d3.select('.vis-linechart > *').remove();
  const margin = {
    top: 20, right: 20, bottom: 30, left: 40
  };
  const width = props.width - margin.left - margin.right;
  const height = props.height - margin.top - margin.bottom;
  const svg = d3
    .select('.vis-linechart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  data.forEach((d) => {
    d.updatedAt = d3.timeParse('%Y-%m-%d')(d.updatedAt);
    d.totalPrice = +d.totalPrice;
  });

  // Add X axis --> it is a updatedAt format
  const x = d3
    .scaleTime()
    .domain(
      d3.extent(data, (d) => d.updatedAt)
    )
    .range([0, width]);
  svg
    .append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, (d) => +d.totalPrice)
    ])
    .range([height, 0]);
  svg.append('g').call(d3.axisLeft(y));

  // Add the line
  svg
    .append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#ef932e')
    .attr('stroke-width', 1.5)
    .attr(
      'd',
      d3
        .line()
        .x((d) => x(d.updatedAt))
        .y((d) => y(d.totalPrice))
    );
};

export default draw;
