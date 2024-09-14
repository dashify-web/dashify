import { Role } from '../../src/types.ts';

export declare global {
  const Anonymous = null;
  namespace Cypress {
    interface Chainable {
      useRole(role: Role | 'ANONYMOUS'): void;
      getByTestid<Subject>(testid: string): Chainable<Subject>;
    }
  }
}
