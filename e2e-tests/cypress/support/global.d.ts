import { Role } from '../../src/types.ts';

export declare global {
  const Anonymous = null;
  namespace Cypress {
    interface Chainable {
      useRole(role: Role | 'ANONYMOUS'): void;
      interceptWithError(path: string, statucCode: number, alias: string): void;
      getByTestid<Subject>(testid: string): Chainable<Subject>;
    }
  }
}
