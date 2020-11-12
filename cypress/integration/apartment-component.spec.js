/// <reference types="cypress" />

describe ('APARTMENTS LIST', () => {
    it('contains a specific title', ()=> {
        cy.visit('http://localhost:3000/appartements');
        cy.get('[data-test="title"]');
        cy.contains('APARTMENTS LIST');
    });
    it('contains the "add apartment" button', ()=>{
        cy.get('[data-test="button-displayed"]').should('be.visible');
    });
    it('should display modal when clicking on the "add apartment" button', ()=>{
        cy.get('[data-test2="display-modal"]').click({multiple: true, force: true});
    });
    it('should add new apartment when clicking on the button', ()=>{
        cy.get('[data-test="add-apartment"]').click({force: true});
    });
    it('should add new room when clicking on "add room button"', ()=>{
        cy.get('[data-test="add-room"]').click({force: true});
    });
    it('should close modal', ()=>{
        cy.get('[data-test="close-modal"]').click({force: true});
    });
    it('should display data table', ()=>{
        cy.get('[data-test="data-table"]').should('be.visible');
    });
    it('should display details modal when clicking on "see" button', ()=>{
        cy.get('[data-test="see-details"]').click({multiple: true, force: true});
    });
    it('should display "add new room" modal when clicking on "add room" button', ()=>{
        cy.get('[data-test="add-new-room-modal"]').click({multiple: true, force: true});
    });
})