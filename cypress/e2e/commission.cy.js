
describe('Commission Calculator Widget', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173'); 
  });

  it('should use API data, calculate commission for 18000 revenue, and verify breakdown', () => {
    cy.contains('Use API Data').click();
    cy.get('input[aria-label="Revenue amount"]').type('18000');
    cy.get('select').select('Default');
    cy.contains('Calculate').click();

    cy.request('POST', 'https://app-fragrant-silence-8555.fly.dev/calculate-commission', {
      revenue: 18000,
      modelType: 'Default'
    }).then((response) => {
      expect(response.status).to.eq(200);
    });

    cy.get(".totalCommission").should('contain.text', '£1,850.00')
    
    cy.get('tbody').should('be.visible');

    cy.get('tbody').within(() => {
      cy.get('tr').eq(2).get('td').eq(3).should('contain.text', '£5k - £10k (10%)')
      cy.get('tr').eq(2).get('td').eq(4).should('contain.text', '£500.00')
      cy.get('tr').eq(2).get('td').eq(5).should('contain.text', '27.03%')

      cy.get('tr').eq(2).get('td').eq(6).should('contain.text', '£10k - £15k (15%)')
      cy.get('tr').eq(2).get('td').eq(7).should('contain.text', '£750.00')
      cy.get('tr').eq(2).get('td').eq(8).should('contain.text', '40.54%')

      cy.get('tr').eq(2).get('td').eq(9).should('contain.text', '£15k - £20k (20%)')
      cy.get('tr').eq(2).get('td').eq(10).should('contain.text', '£600.00')
      cy.get('tr').eq(2).get('td').eq(11).should('contain.text', '32.43%')
    });
  });
});