import * as d3 from 'd3';
import _ from 'lodash';

const draw = (props) => {
  d3.select('.vis-mlinechart > *').remove();
  const margin = {
    top: 20, right: 20, bottom: 30, left: 40
  };
  const width = props.width - margin.left - margin.right;
  const height = props.height - margin.top - margin.bottom;
  const svg = d3
    .select('.vis-mlinechart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const datas = [];
  let x;
  let y;

  if (props.datas !== null) {
    props.datas.forEach((data, i) => {
      datas[i] = _.cloneDeep(data.activities);

      datas[i].forEach((d) => {
        d.date = d3.timeParse('%Y-%m-%d')(d.date);
        d.count = +d.count;
      });

      // Add X axis
      x = d3
        .scaleTime()
        .domain(
          d3.extent(datas[i], (d) => d.date)
        )
        .range([0, width]);

      // Add Y axis
      y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(datas[i], (d) => +d.count)
        ])
        .range([height, 0]);

      // // Add the line
      svg
        .append('path')
        .datum(datas[i])
        .attr('fill', 'none')
        .attr('stroke', '#ef932e')
        .attr('stroke-width', 1.5)
        .attr(
          'd',
          d3
            .line()
            .x((d) => x(d.date))
            .y((d) => y(d.count))
        );
    });

    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));
  }
};

export default draw;
