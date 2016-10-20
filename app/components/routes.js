import angular from 'angular';

import aboutHTML from './about/about.md!md';
import networkComponent from './network/network.component';

import 'ui-select/dist/select';
import 'ui-select/dist/select.css!';

configRoutes.$inject = ['$routeProvider'];
function configRoutes ($routeProvider) {
  $routeProvider
    .when('/about', {
      template: aboutHTML
    })
    .when('/', {
      template: '<network data-package="$resolve.dataPackage"></network>',
      datapackageUrl: 'components/network/datapackage.json'
    })
    .otherwise({
      redirectTo: '/'
    });
}

export default angular
  .module('routes', ['projectX.dataService', 'ui.select'])
  .component('network', networkComponent)
  .config(configRoutes);
