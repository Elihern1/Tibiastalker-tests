describe("Test suggestions API réelle", () => {
  it("affiche l'erreur et les suggestions API pour un nom inexistant", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Click here").click({ force: true });

    cy.get('input[placeholder="Character Name"]').type("Elibert", { force: true });
    cy.contains("button", "Search").click({ force: true });

    // Attendre l'erreur
    cy.contains(/not found/i).should("exist");

    // Réouvrir l'UI
    cy.get(".logo").first().click({ force: true });

    // Vérifier qu'il y a des suggestions réelles
    cy.get("table tbody tr")
      .should("exist")
      .and("have.length.greaterThan", 3);
  });
});
