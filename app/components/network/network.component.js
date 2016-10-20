import d3 from 'd3';

import './network.less!';
import NetworkChart from './network.chart';

function controller () {
  const $ctrl = this;

  console.log(this);

  const chart = new NetworkChart();

  return Object.assign($ctrl, {
    editorOptions: {
      data: $ctrl.dataPackage,
      enableOpen: true,
      onChange: draw
    },
    filter: {},
    $onInit: () => {
      $ctrl.data = processData($ctrl.dataPackage.resources[0].data);
      $ctrl.names = $ctrl.data.nodes.map(d => d.name);
      draw();
    },
    applyFilter
  });

  function applyFilter (filter) {
    let fn = d => {
      d.visible = true;
    };

    if (Array.isArray(filter.name) && filter.name.length > 0) {
      const names = filter.name.map(d => d.toLowerCase());
      fn = d => {
        const name = d.name.toLowerCase();
        d.visible = names.some(d => name.indexOf(d) > -1);
      };
    }

    $ctrl.data.nodes.forEach(fn);
    draw();
  }

  function processData (data) {
    const nodes = data.nodes.map((d, id) => {
      return {
        ...d,
        id,
        outdegree: 0,
        indegree: 0,
        visible: true
      };
    });

    const links = data.links.map(d => {
      const source = nodes[d.source];
      const target = nodes[d.target];

      source.outdegree++;
      source.degree++;

      target.indegree++;
      target.degree++;

      return {
        ...d,
        source: nodes[d.source],
        target: nodes[d.target]
      };
    });

    return {
      nodes,
      links
    };
  }

  function draw () {
    const container = d3.select('#_network__chart');

    container.selectAll('div').remove();

    const divs = container
      .selectAll('div')
      .data([$ctrl.data]);

    divs.enter().append('div');

    divs.exit().remove();

    divs.call(chart);
  }
}

export default {
  controller,
  templateUrl: 'components/network/network.template.html',
  bindings: {
    dataPackage: '<package'
  }
};
