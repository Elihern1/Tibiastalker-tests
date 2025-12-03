describe("Erreur 404 et suggestions", () => {
  it("affiche l'erreur puis les suggestions après réouverture", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Click here").click({ force: true });

    // Mock 404 (resultat principal)
    cy.intercept("GET", "**/characters/Knight", {
      statusCode: 404,
      body: { detail: "Character not found", status: 404 }
    }).as("mock404");

    // Mock intelligent pour /prompt
    cy.intercept("GET", "**/characters/prompt*", (req) => {
      const url = new URL(req.url);

      // Autocomplete (SearchForm)
      if (url.searchParams.get("page") !== "1") {
        req.reply({
          statusCode: 200,
          body: ["knight", "knight emperor", "knight master"]
        });
        return;
      }

      // SimilarCharacters (page=1)
      req.reply({
        statusCode: 200,
        body: {
          totalCount: 3,
          names: ["Knightius", "Knightor", "KnightHero"]
        }
      });
    }).as("mockPromptConditional");

    // Recherche
    cy.get('input[placeholder="Character Name"]').type("Knight", { force: true });
    cy.contains("button", "Search").click({ force: true });

    cy.wait("@mock404");
    cy.contains("Character not found").should("exist");

    // Réouvrir l'UI
    cy.get(".logo").first().click({ force: true });

    // Attendre suggestions
    cy.contains("Knightius").should("exist");
    cy.contains("Knightor").should("exist");
    cy.contains("KnightHero").should("exist");
  });
});
