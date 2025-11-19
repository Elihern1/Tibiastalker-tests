import React from "react";
import { mount } from "@cypress/react";
import ResultsList from "../../src/components/ResultsList";

describe("ResultsList (CT)", () => {
  it("affiche les personnages après une réponse API valide", () => {
    const fauxPersonnages = [
      {
        name: "Sir Exura",
        level: 123,
        vocation: "Knight",
        server: "Antica",
      },
    ];

    cy.stub(globalThis as any, "fetch")
      .resolves({
        ok: true,
        json: async () => fauxPersonnages,
      } as Response)
      .as("fetchPersonnages");

    mount(<ResultsList query="Sir Exura" endpoint="/api/search?name=" />);

    cy.get("@fetchPersonnages").should("have.been.called");

    cy.contains(/sir exura/i).should("exist");
    cy.contains(/123/).should("exist");
    cy.contains(/Knight/).should("exist");
    cy.contains(/Antica/).should("exist");
  });

  it("affiche un message d'erreur quand les données reçues sont invalides", () => {
    const donneesInvalides = [
      {
        nom: "Invalide",
        level: "abc",
        vocation: "Knight",
      } as any,
    ];

    cy.stub(globalThis as any, "fetch")
      .resolves({
        ok: true,
        json: async () => donneesInvalides,
      } as Response)
      .as("fetchPersonnagesInvalides");

    mount(<ResultsList query="Invalide" endpoint="/api/search?name=" />);

    cy.get("@fetchPersonnagesInvalides").should("have.been.called");

    cy.contains("Les données reçues du serveur sont invalides.").should("exist");
    cy.get('[aria-label="results"]').should("not.exist");
  });
});
