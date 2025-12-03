describe("Navigation - retour arrière conserve la recherche", () => {
  it("revient avec le champ rempli", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Click here").click({ force: true });

    cy.get('input[placeholder="Character Name"]').type("Knight", { force: true });
    cy.contains("button", "Search").click({ force: true });

    // Ici mock d'un personnage pour afficher CharacterResult
    cy.intercept("GET", "**/characters/Knight", {
      statusCode: 200,
      body: {
        name: "Knight",
        level: 150,
        vocation: "Elite Knight",
        server: "Antica"
      }
    });

    cy.contains("Knight").should("exist");

    // Retour arrière
    cy.go("back");

    // Le champ de recherche doit encore contenir "Knight"
    cy.get('input[placeholder="Character Name"]').should("have.value", "Knight");
  });
});
