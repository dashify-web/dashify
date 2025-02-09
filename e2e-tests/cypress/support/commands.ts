/// <reference types="cypress" />
import { ADMIN_ONE, CUSTOMER_ONE } from '../../src/mocks';
import { Role } from '../../src/types';

const getResponse = (role: Role | 'ANONYMOUS') => {
  if (role === 'ANONYMOUS') {
    return {
      statusCode: 403,
      body: {
        status: 403,
        message: 'Forbidden',
      },
    };
  }

  const user = role === 'CUSTOMER' ? CUSTOMER_ONE : ADMIN_ONE;
  return {
    statusCode: 200,
    body: {
      id: user.id,
      role,
    },
  };
};

Cypress.Commands.add('useRole', (role) => {
  cy.intercept('GET', '**/whoami', getResponse(role)).as('getWhoAmi');
});

Cypress.Commands.add('getByTestid', <Subject = any>(id: string) => {
  return cy.get<Subject>(`[data-testid='${id}']`);
});

Cypress.Commands.add('interceptWithError', (path, statusCode, alias) => {
  return cy
    .intercept(path, {
      statusCode,
      body: {
        message: 'ERROR',
      },
    })
    .as(alias);
});
