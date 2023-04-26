// tests remaining to write (non-exhaustive list):
// bad paths:  non-address picker postcode doesnt give you address picker
// bad paths: no submit without verified postcode
//

describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  describe('Happy paths', () => {
    it('the h1 has correct text', () => {
      cy.get('h1').contains('Remember').contains('to').contains('Vote');
    });

    it('Can verify postcode', () => {
      cy.get('#postcode').type('ST7 2AE');
      const verifyBtn = cy.get('#verify-btn');
      verifyBtn.click();
      verifyBtn.contains('Postcode verified!');
    });

    it('Can select an address from the address picker', () => {
      cy.get('#postcode').type('ST7 2AF');
      const verifyBtn = cy.get('#verify-btn');
      verifyBtn.click();
      verifyBtn.contains('Postcode verified!');
      cy.get('.form-select').select('6 LAWTON ROAD, ALSAGER, STOKE-ON-TRENT');
    });

    it('Can submit the form', () => {
      cy.get('#name').type('Curtis Turk');
      cy.get('.PhoneInputInput').type('+15005550006');
      cy.get('#postcode').type('ST7 2AE');
      cy.get('#verify-btn').click();
      cy.get('.joe').click();
      cy.get('.alert-heading').contains('Submitted');
    });

    it('Can cancel a verified postcode', () => {
      cy.get('#postcode').type('ST7 2AE');
      cy.get('#verify-btn').click().contains('Postcode verified!');
      cy.get('#cancel-button').click();
      cy.get('#verify-btn').contains('Verify postcode');
    });

    it('Can cancel an address that has been picked', () => {
      cy.get('#postcode').type('ST7 2AF');
      cy.get('#verify-btn').click().contains('Postcode verified!');
      cy.get('.form-select').select('6 LAWTON ROAD, ALSAGER, STOKE-ON-TRENT');
      cy.get('.btn-outline-danger').click();
      cy.get('#verify-btn').contains('Verify postcode');
    });
  });

  describe('Bad paths', () => {
    it('Can not submit a form without a name', () => {
      cy.get('.PhoneInputInput').type('+15005550006');
      cy.get('#postcode').type('ST7 2AE');
      cy.get('#verify-btn').click();
      cy.get('.joe').click();
      cy.get('.alert-heading h4').should('not.exist');
    });

    it('Can not submit a form without number', () => {
      cy.get('#name').type('harry fox');
      cy.get('#postcode').type('ST7 2AE');
      cy.get('#verify-btn').click();
      cy.get('.joe').click();
      cy.get('.alert-heading h4').should('not.exist');
    });

    it('Can not submit a form without postcode', () => {
      cy.get('#name').type('harry fox');
      cy.get('#postcode').type('ST7 2AE');
      cy.get('#verify-btn').click();
      cy.get('.joe').should('be.disabled');
    });

    it('bad postcode wont verify', () => {
      cy.get('#postcode').type('aaaaaaa');
      const verifyBtn = cy.get('#verify-btn');
      verifyBtn.click();
      cy.get('#verify-postcode-message').contains('Postcode could not be found');
    });
  });
});
export {};
