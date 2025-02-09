describe('dummy-show with role=ADMIN', () => {
  beforeEach(() => {
    cy.useRole('ADMIN');
    cy.visit('/dummies/DUMMY_ID');
  });

  it('should show error if axiosInstance throw unknown error', () => {
    cy.interceptWithError('**/dummies/DUMMY_ID', 500, 'getOneDummy');
    cy.contains('auth-loading');
    cy.wait('@getWhoAmi');
    cy.wait('@getOneDummy');
    cy.contains('request-error');
  });

  it('should redirect to /auth-error if axiosInstance throw authentication error', () => {
    cy.interceptWithError('**/dummies/DUMMY_ID', 403, 'getOneDummy');
    cy.contains('auth-loading');
    cy.wait('@getWhoAmi');
    cy.wait('@getOneDummy');
    cy.contains('auth-error');
  });
});
