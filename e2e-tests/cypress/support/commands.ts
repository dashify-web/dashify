/// <reference types="cypress" />
import { Role } from '../../src/types';
import { ADMIN_ONE, CUSTOME_ONE } from '../../src/users';

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

  const user = role === 'CUSTOMER' ? CUSTOME_ONE : ADMIN_ONE;
  return {
    statusCode: 200,
    body: {
      id: user.id,
      role,
    },
  };
};

Cypress.Commands.add('useRole', (role) => {
  cy.intercept('GET', 'http://dummy.com/whoami', getResponse(role)).as(
    'getWhoAmi'
  );
});

Cypress.Commands.add('getByTestid', <Subject = any>(id: string) => {
  return cy.get<Subject>(`[data-testid='${id}']`);
});
