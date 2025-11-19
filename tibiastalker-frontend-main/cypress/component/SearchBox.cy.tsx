import React from "react";
import { mount } from "@cypress/react";
import SearchBox from "../../src/components/SearchBox";

describe("SearchBox (CT)", () => {
  it("soumet la valeur saisie lorsque l'utilisateur valide", () => {
    const onSubmit = cy.stub().as("soumission");

    mount(<SearchBox onSubmit={onSubmit} />);

    cy.get('[aria-label="search input"]').type("Sir Exura");
    cy.get('button[type="submit"]').click();

    cy.get("@soumission").should("have.been.calledWith", "Sir Exura");
  });

  it("désactive le bouton lorsque le champ est vide", () => {
    mount(<SearchBox />);

    cy.get('button[type="submit"]').should("be.disabled");
    cy.get('[aria-label="search input"]').type("A");
    cy.get('button[type="submit"]').should("not.be.disabled");
  });

  it("appelle onChange à chaque frappe", () => {
    const onChange = cy.stub().as("changement");

    mount(<SearchBox onChange={onChange} />);

    cy.get('[aria-label="search input"]').type("Ab");

    cy.get("@changement").should("have.been.calledTwice");
    cy.get("@changement").should("have.been.calledWith", "A");
    cy.get("@changement").should("have.been.calledWith", "Ab");
  });

  it("affiche un message d'erreur quand la requête est trop courte", () => {
    const onSubmit = cy.stub().as("soumission");

    mount(<SearchBox onSubmit={onSubmit} />);

    cy.get('[aria-label="search input"]').type("ab");
    cy.get('button[type="submit"]').click();

    cy.contains("La requête doit contenir au moins 3 caractères.").should(
      "exist"
    );

    cy.get("@soumission").should("not.have.been.called");
  });
});
