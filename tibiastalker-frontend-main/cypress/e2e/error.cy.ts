describe("Erreur 404 et suggestions", () => {
  it("affiche l'erreur puis les suggestions", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Click here").click({ force: true });

    cy.intercept("GET", "**/characters/Knight", {
      statusCode: 404,
      body: { detail: "Character not found", status: 404 }
    }).as("mock404");

    cy.intercept("GET", "**/characters/prompt*", {
      statusCode: 200,
      body: ["Knightius", "Knightor", "KnightHero"]
    }).as("mockPrompt");

    cy.get('input[placeholder="Character Name"]').type("Knight", { force: true });
    cy.contains("button", "Search").click({ force: true });

    cy.wait("@mock404");
    cy.contains("Character not found").should("exist");

    // Réouvrir UI
    cy.get(".logo").first().click({ force: true });

    cy.wait("@mockPrompt");

    cy.contains("Knightius").should("exist");
    cy.contains("Knightor").should("exist");
    cy.contains("KnightHero").should("exist");
  });
});
