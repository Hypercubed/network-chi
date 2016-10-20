import pkg from '../package.json';

export default {
  deploy: {
    ghPages: {
      remoteUrl: 'git@github.com:Hypercubed/network-chi.git',
      branch: 'gh-pages'
    }
  },
  template: {
    title: 'Project-χ - Network',
    webcomponents: false,
    version: pkg.version
  }
};
