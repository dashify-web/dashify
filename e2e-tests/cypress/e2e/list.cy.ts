import { ADMIN_MOCKS } from '../../src/mocks';
import { DEFAULT_PAGINATION } from '../../src/providers';
import { Admin } from '../../src/types';

const should_contains_admin = (admin: Admin) => {
  cy.contains(admin.username);
  cy.contains(admin.email);
  cy.contains(admin.salary + ' USD');
  cy.contains(admin.password);
  cy.contains(admin.role);
};
describe('list', () => {
  beforeEach(() => {
    cy.useRole('ADMIN');
  });

  it.only('list.data', () => {
    cy.visit('/admins');
    cy.contains('auth-loading');
    cy.wait('@getWhoAmi');
    should_contains_admin(ADMIN_MOCKS[0]);
    should_contains_admin(ADMIN_MOCKS[1]);
    cy.get('tbody tr').should('have.length', DEFAULT_PAGINATION.pageSize);
  });
});
