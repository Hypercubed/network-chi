import d3v3 from 'd3';
import * as d3v4 from 'd3-selection';
import {forceSimulation, forceManyBody, forceCenter, forceLink} from 'd3-force';
import {drag} from 'd3-drag';

function v3force () {
  const force = d3v3.layout.force()
    .charge(-120)
    .linkDistance(30);

  return {
    nodes: force.nodes.bind(force),
    links: force.links.bind(force),
    drag () {
      // force.drag.apply(this, arguments);
    },
    on: force.on.bind(force),
    size: force.size.bind(force),
    start: force.start.bind(force)
  };
}

function v4force () {
  const link = forceLink();

  const simulation = forceSimulation()
    .force('charge', forceManyBody())
    .force('link', link);

  /* const nodeDrag = drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended); */

  const api = {
    nodes: simulation.nodes.bind(simulation),
    links: link.links.bind(link),
    drag: () => {},
    on: simulation.on.bind(simulation),
    size: ([width, height]) => {
      simulation.force('center', forceCenter(width / 2, height / 2));
      return api;
    },
    start: () => {}
  };

  return api;

  /* function dragstarted (d) {
    if (!d3v4.event.active) {
      simulation.alphaTarget(0.3).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged (d) {
    d.fx = d3v4.event.x;
    d.fy = d3v4.event.y;
  }

  function dragended (d) {
    if (!d3v4.event.active) {
      simulation.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
  } */
}

export {
  v3force,
  v4force
};
