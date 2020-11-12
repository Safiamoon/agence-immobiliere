/// <reference types="cypress" />

describe ('CLIENTS LIST', () => {
    it('contains a specific title', ()=> {
        cy.visit('http://localhost:3000/clients');
        cy.get('[data-test="title"]');
        cy.contains('CLIENTS LIST');
    });
    it('contains the "add client" button', ()=>{
        cy.get('[data-test="button-displayed"]').should('be.visible');
    });
    it('should display modal when clicking on the "add client" button', ()=>{
        cy.get('[data-test2="display-modal"]').click({multiple: true, force: true});
    });
    it('should add new client when clicking on the button "add client"', ()=>{
        cy.get('[data-test="add-client"]').click({force: true});
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
})