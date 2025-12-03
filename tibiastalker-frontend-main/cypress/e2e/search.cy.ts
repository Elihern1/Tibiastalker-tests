describe("Recherche d'un personnage (mock API)", () => {
  it("affiche le résultat d'un personnage trouvé", () => {
    cy.visit("http://localhost:3000/");

    // Entrer dans la page
    cy.contains("Click here").click({ force: true });

    // Mock API: personnage trouvé
    cy.intercept("GET", "**/characters/Knight", {
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
        possibleInvisibleCharacters: []
      }
    }).as("mockKnight");

    cy.get('input[placeholder="Character Name"]').type("Knight", { force: true });
    cy.contains("button", "Search").click({ force: true });

    cy.wait("@mockKnight");

    // Vérifie que le composant CharacterResult apparaît
    cy.contains("Knight").should("exist");
    cy.contains("Level").should("exist");
    cy.contains("150").should("exist");
  });
});
