import d3 from 'd3';
import d3Tip from 'd3-tip';

import {v3force} from './network.d3-force';

// Based on Force-Directed Graph by [M. Bostock](https://bl.ocks.org/mbostock/4062045).
export default function Network (opts) {
  opts = opts || {};

  const margin = opts.margin || {top: 0, right: 0, bottom: 0, left: 0};
  const width = opts.width || (960 - margin.left - margin.right);
  const height = opts.height || (600 - margin.top - margin.bottom);
  const title = opts.title || 'Network';
  const layout = opts.layout || v3force({});

  const color = d3.scale.category20();

  const tip = d3Tip()
    .attr('class', 'd3-tip animate')
    .offset([-10, 0])
    .html(d => `${d.name}`);

  function chart (selection) {
    selection.each(function (graph) {
      const container = d3.select(this);

      const svg = container.selectAll('svg')
        .data([graph])
        .enter()
        .append('svg')
          .attr('title', title)
          .attr('width', width)
          .attr('height', height);

      svg.call(tip);

      const nodeData = graph.nodes.filter(d => d.visible);
      const linkData = graph.links.filter(d => d.target.visible && d.source.visible);

      layout
        .size([width, height]);

      layout
        .nodes(nodeData);

      layout
        .links(linkData);

      layout
        .start();

      const link = svg.selectAll('.link')
          .data(linkData)
        .enter().append('line')
          .attr('class', 'link')
          .style('stroke-width', d => Math.sqrt(d.value));

      const node = svg.selectAll('.node')
          .data(nodeData)
        .enter().append('circle')
          .attr('class', 'node')
          .attr('r', 5)
          .style('fill', d => color(d.group))
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)
          .call(layout.drag);

      node.append('title')
        .text(d => d.name);

      layout.on('tick', () => {
        link.attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node.attr('cx', d => d.x)
            .attr('cy', d => d.y);
      });
    });
  }

  return chart;
}
