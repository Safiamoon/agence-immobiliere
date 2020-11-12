/// <reference types="cypress" />

describe ('BOOKINGS LIST', () => {
    it('contains a specific title', ()=> {
        cy.visit('http://localhost:3000/reservation');
        cy.get('[data-test="title"]');
        cy.contains('BOOKINGS LIST');
    });
    it('should display data table', ()=>{
        cy.get('[data-test="data-table"]').should('be.visible');
    });
    it('should display details modal when clicking on "see" button', ()=>{
        cy.get('[data-test="see-details"]').click({multiple: true, force: true});
    });
})