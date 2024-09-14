describe('auth.routes', () => {
  it('public with no-auth-routes', () => {
    cy.useRole('ANONYMOUS');
    cy.visit('/auth-error');
    cy.contains('auth-error');

    cy.visit('/role-error');
    cy.contains('role-error');

    cy.visit('/unknown-error');
    cy.contains('unknown-error');

    cy.visit('/nrole-anonymous');
    cy.contains('nrole-anonymous');
  });

  it('admins', () => {
    cy.useRole('ADMIN');
    cy.visit('/admins');
    cy.contains('admins-list');

    cy.useRole('ANONYMOUS');
    cy.visit('/admins');
    cy.contains('auth-error');

    cy.useRole('ADMIN');
    cy.visit('/admins');
    cy.contains('role-error');
  });

  it('customers', () => {
    cy.useRole('ADMIN');
    cy.visit('/customers');
    cy.contains('customers-list');

    cy.useRole('ANONYMOUS');
    cy.visit('/customers');
    cy.contains('customers-list');

    cy.useRole('CUSTOMER');
    cy.visit('/customers');
    cy.contains('customers-list');
  });

  it('nrole-all', () => {
    cy.useRole('ADMIN');
    cy.visit('/nrole-all');
    cy.contains('nrole-all');

    cy.useRole('ANONYMOUS');
    cy.visit('/nrole-all');
    cy.contains('auth-error');

    cy.useRole('CUSTOMER');
    cy.visit('/nrole-all');
    cy.contains('nrole-all');
  });

  it('nrole-admins', () => {
    cy.useRole('ADMIN');
    cy.visit('/nrole-admins');
    cy.contains('nrole-admins');

    cy.useRole('ANONYMOUS');
    cy.visit('/nrole-admins');
    cy.contains('auth-error');

    cy.useRole('CUSTOMER');
    cy.visit('/nrole-admins');
    cy.contains('role-error');
  });

  it('wrole-all', () => {
    cy.useRole('ADMIN');
    cy.visit('/wrole-all');
    cy.contains('wrole-all');

    cy.useRole('ANONYMOUS');
    cy.visit('/wrole-all');
    cy.contains('auth-error');

    cy.useRole('CUSTOMER');
    cy.visit('/wrole-all');
    cy.contains('wrole-all');
  });

  it('wrole-admins', () => {
    cy.useRole('ADMIN');
    cy.visit('/wrole-admins');
    cy.contains('wrole-admins');

    cy.useRole('ANONYMOUS');
    cy.visit('/wrole-all');
    cy.contains('auth-error');

    cy.useRole('CUSTOMER');
    cy.visit('/wrole-admins');
    cy.contains('role-error');
  });
});
