import * as d3 from 'd3';
import '../../../assets/css/barchat.css';

const draw = (props) => {
  d3.select('.vis-barchart > *').remove();
  const { data } = props;
  const margin = {
    top: 20, right: 20, bottom: 30, left: 40
  };
  const width = props.width - margin.left - margin.right;
  const height = props.height - margin.top - margin.bottom;
  const svg = d3
    .select('.vis-barchart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // format the data
  data.forEach((d) => {
    d.revenue = +d.revenue;
  });

  // Scale the range of the data in the domains
  const x = d3.scaleBand().range([0, width]).padding(0.1);
  const y = d3.scaleLinear().range([height, 0]);
  x.domain(
    data.map((d) => d.name)
  );
  y.domain([
    0,
    d3.max(data, (d) => d.revenue)
  ]);

  // append the rectangles for the bar chart
  svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => x(d.name))
    .attr('width', x.bandwidth())
    .attr('y', (d) => y(d.revenue))
    .attr('height', (d) => height - y(d.revenue));

  // add the x Axis
  svg
    .append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

  // add the y Axis
  svg.append('g').call(d3.axisLeft(y));
};

export default draw;
