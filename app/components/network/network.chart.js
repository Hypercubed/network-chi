import d3 from 'd3';
import d3Tip from 'd3-tip';
import 'd3-tip/examples/example-styles.css!';

export default function Network (opts) {
  opts = opts || {};

  const margin = opts.margin || {top: 20, right: 20, bottom: 30, left: 40};
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  const title = opts.title || 'Network';

  const color = d3.scale.category20();

  const force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

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

      force
        .nodes(graph.nodes.filter(d => d.visible))
        .links(graph.links.filter(d => d.target.visible && d.source.visible))
        .start();

      const link = svg.selectAll('.link')
          .data(force.links())
        .enter().append('line')
          .attr('class', 'link')
          .style('stroke-width', d => Math.sqrt(d.value));

      const node = svg.selectAll('.node')
          .data(force.nodes())
        .enter().append('circle')
          .attr('class', 'node')
          .attr('r', 5)
          .style('fill', d => color(d.group))
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)
          .call(force.drag);

      node.append('title')
        .text(d => d.name);

      force.on('tick', () => {
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
