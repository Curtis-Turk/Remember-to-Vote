describe('visit homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('the h1 has correct text', () => {
    cy.get('h1').contains('Remember').contains('to').contains('Vote');
  });

  it('Can verify postcode', () => {
    // cy.get('#name').type('Curtis Turk');
    // cy.get('.PhoneInputInput').type('07436468661');
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
});
