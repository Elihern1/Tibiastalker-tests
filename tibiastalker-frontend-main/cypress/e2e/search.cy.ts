// cypress/e2e/search.cy.ts

describe("Recherche d'un personnage (mock API)", () => {
  it("affiche le résultat d'un personnage trouvé", () => {
    // 1) Intercept AVANT de lancer la page
    //    → on matche TOUT ce qui ressemble à /api/tibia-stalker/v1/characters/Knight
    cy.intercept(
      "GET",
      /\/api\/tibia-stalker\/v1\/characters\/Knight(\?.*)?$/,
      {
        statusCode: 200,
        body: {
          name: "Knight",
          level: 150,
          vocation: "Elite Knight",
          server: "Antica",
          lastLogin: "2024-01-01T12:30:00Z",
          formerNames: [],
          formerWorlds: [],
          otherVisibleCharacters: [],
          possibleInvisibleCharacters: [],
        },
      },
    ).as("mockKnight");

    // 2) Ouvre l'application
    cy.visit("http://localhost:3000/");

    // 3) Clique sur "Click here" pour afficher le formulaire
    cy.contains("Click here").click({ force: true });

    // 4) Tape "Knight" dans l'input
    cy.get('input[placeholder="Character Name"]').type("Knight", {
      force: true,
    });

    // 5) Clique sur le bouton Search
    cy.contains("button", "Search").click({ force: true });

    // 6) Attend que la requête interceptée se produise
    cy.wait("@mockKnight");

    // 7) Vérifie que le résultat est affiché
    cy.contains("Name").parent().should("contain", "Knight");
    cy.contains("Level").parent().should("contain", "150");
    cy.contains("Vocation").parent().should("contain", "Elite Knight");
  });
});
