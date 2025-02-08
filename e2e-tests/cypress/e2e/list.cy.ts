import { CUSTOME_ONE, CUSTOMER_MOCKS } from "../../src/mocks";

describe('list', () => {
  beforeEach(() => {
    cy.useRole('ANONYMOUS');
  });

  it('list.data', () => {
    cy.visit('/customers');
    cy.contains("auth-loading");
    cy.wait("@getWhoAmi");
    cy.contains(CUSTOME_ONE.username);
    cy.contains(CUSTOME_ONE.email);
    cy.get('li').should('have.length', 2);
  });

  it('list.pagination', () => {
    cy.visit('/customers');
    cy.get('li').should('have.length', 2);
    cy.getByTestid('next-button').click();
    cy.get('li').should('have.length', 2);
    cy.should('not.contain.text', CUSTOME_ONE.username);
    cy.contains(CUSTOMER_MOCKS.at(2)!.username);
    cy.contains(CUSTOMER_MOCKS.at(3)!.email);
    cy.getByTestid('page-value').contains(2);
  });
});
