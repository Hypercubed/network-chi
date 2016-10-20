/* global describe, beforeEach, it, cy, context */
/* eslint xo/filename-case: 0 */

describe('Project χ - network', () => {
  context('home', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('<title> is correct and have an index', () => {
      cy.title().should('include', 'Project-χ - Network');
      cy.get('network').find('svg .link').should('have.length', 254);
      cy.get('network').find('svg .node').should('have.length', 77);
    });
  });
});
