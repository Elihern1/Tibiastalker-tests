import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import ResultCard from "../../components/ResultCard";

describe("ResultCard", () => {
  it("rend le nom en heading et affiche les méta-données de base (AAA)", () => {
    const props = {
      name: "Sir Exura",
      level: 123,
      vocation: "Knight",
      server: "Antica",
    };

    render(<ResultCard {...props} />);

    expect(
      screen.getByRole("heading", { name: /sir exura/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/level/i)).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("Knight")).toBeInTheDocument();
    expect(screen.getByText("Antica")).toBeInTheDocument();
  });

  it('rend un lien "View" quand href est fourni', () => {
    const props = {
      name: "Sir Exura",
      level: 123,
      href: "/characters/Sir%20Exura",
    };

    render(<ResultCard {...props} />);

    const link = screen.getByRole("link", { name: /view sir exura/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/characters/Sir%20Exura");
  });

  it("n’affiche pas vocation/server/lien quand absents (rendu conditionnel)", () => {
    const props = { name: "Ana Maria", level: 80 };

    const { getByRole } = render(<ResultCard {...props} />);

    const card = getByRole("article", { name: /ana maria/i });

    expect(within(card).queryByText("Vocation")).toBeNull();
    expect(within(card).queryByText("Server")).toBeNull();
    expect(
      within(card).queryByRole("link", { name: /view/i })
    ).toBeNull();
  });

  it('applique la classe "is-highlighted" quand highlight=true', () => {
    const props = { name: "Highlighted", level: 200, highlight: true };

    const { getByRole } = render(<ResultCard {...props} />);

    const card = getByRole("article", { name: /highlighted/i });
    expect(card).toHaveClass("is-highlighted");
  });
});
