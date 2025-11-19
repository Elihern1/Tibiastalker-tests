import React from "react";
import { mount } from "@cypress/react";
import ResultCard from "../../src/components/ResultCard";

describe("ResultCard (CT)", () => {
  it("renders basic info", () => {
    const props = {
      name: "Sir Exura",
      level: 123,
      vocation: "Knight",
      server: "Antica",
    };

    mount(<ResultCard {...props} />);

    cy.contains(/sir exura/i).should("exist");
    cy.contains(/level/i).should("exist");
    cy.contains("123").should("exist");
    cy.contains("Knight").should("exist");
    cy.contains("Antica").should("exist");
  });
});
