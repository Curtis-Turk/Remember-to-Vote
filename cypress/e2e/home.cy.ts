// happy: postcode, cancel postcode, address picker, cancel postcode after address picker, submit
// blocked: need all form details for submit, bad postcode doesnt verify, non-address picker doesnt give you address picker
// blocked: no submit without verified postcode. no verified postcode for bad postcode
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
      cy.get('.PhoneInputInput').type('01632960602');
      cy.get('#postcode').type('ST7 2AE');
      cy.get('#verify-btn').click();
      cy.get('.joe').click();
      cy.get('.alert-heading').contains('Submitted');
    });

    it('Can cancel a verified postcode', () => {
      cy.get('#postcode').type('ST7 2AE');
      const verifyBtn = cy.get('#verify-btn');
      verifyBtn.click();
      verifyBtn.contains('Postcode verified!');
      cy.get('btn btn-outline-danger').click();
      verifyBtn.contains('Verify postcode');
    });

    it('Can cancel an address that has been picked', () => {
      cy.get('#postcode').type('ST7 2AF');
      const verifyBtn = cy.get('#verify-btn');
      verifyBtn.click();
      verifyBtn.contains('Postcode verified!');
      cy.get('.form-select').select('6 LAWTON ROAD, ALSAGER, STOKE-ON-TRENT');
      cy.get('btn btn-outline-danger').click();
      verifyBtn.contains('Verify postcode');
    });
  });

  describe('Bad paths', () => {
    it('Can not submit a form without a name', () => {
      cy.get('.PhoneInputInput').type('01632960602');
      cy.get('#postcode').type('ST7 2AE');
      cy.get('#verify-btn').click();
      cy.get('.joe').click();
      cy.get('.alert-heading h4').should('not.exist');
    });

    // it('bad postcode wont verify', () => {
    //   cy.get('#postcode').type('aaaaaaa');
    //   const verifyBtn = cy.get('#verify-btn');
    //   verifyBtn.click();
    //   verifyBtn.contains('Postcode verified!');
    //   cy.get('.form-select').select('6 LAWTON ROAD, ALSAGER, STOKE-ON-TRENT');
    //   cy.get('btn btn-outline-danger').click();
    //   verifyBtn.contains('Verify postcode');
    // });
  });
});
