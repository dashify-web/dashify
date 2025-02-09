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

describe('admin-list', () => {
  it('should redirect to /unknown-error if check auth throw error', () => {
    cy.interceptWithError('**/whoami', 500, 'getWhoAmi');
    cy.visit('/admins');
    cy.contains('auth-loading');
    cy.wait('@getWhoAmi');
    cy.contains('unknown-error');
  });

  it('should redirect to /role-error if wrong role', () => {
    cy.useRole('CUSTOMER');
    cy.visit('/admins');
    cy.contains('auth-loading');
    cy.wait('@getWhoAmi');
    cy.contains('role-error');
  });

  it('should redirect to /auth-error if anonymous role', () => {
    cy.useRole('ANONYMOUS');
    cy.visit('/admins');
    cy.contains('auth-loading');
    cy.wait('@getWhoAmi');
    cy.contains('auth-error');
  });

  it('should show correct data', () => {
    cy.useRole('ADMIN');
    cy.visit('/admins');
    cy.contains('auth-loading');
    cy.wait('@getWhoAmi');

    should_contains_admin(ADMIN_MOCKS[0]);
    should_contains_admin(ADMIN_MOCKS[1]);
    cy.get('tbody tr').should('have.length', DEFAULT_PAGINATION.pageSize);

    cy.getByTestid('dashify-list-next-button').click();
    cy.should('not.contain', ADMIN_MOCKS[0].username);
    should_contains_admin(ADMIN_MOCKS[2]);
    should_contains_admin(ADMIN_MOCKS[3]);
  });
});
