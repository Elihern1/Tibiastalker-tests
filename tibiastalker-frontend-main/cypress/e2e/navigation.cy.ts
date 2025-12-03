describe("returns to home without blank page", () => {
  it("works with real API", () => {
    cy.visit("http://localhost:3000/");

    // Entrer un nom inexistant
    cy.get('input[placeholder="Character Name"]').type("Elibert", { force: true });

    // Cliquer sur Search malgré le dropdown
    cy.contains("button", "Search").click({ force: true });

    // Vérifier erreur
    cy.contains("not found").should("exist");

    // Attendre que les suggestions (réelles API) apparaissent
    cy.get("table tbody tr").should("have.length.above", 3);

    // Revenir à l'accueil
    cy.get(".logo").first().click({ force: true });

    // Vérifier que l'accueil est affiché
    cy.contains("Click here").should("exist");
    cy.url().should("eq", "http://localhost:3000/");
  });
});
