import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import SearchBox from "../../components/SearchBox";

describe("SearchBox", () => {
  it("rend un input avec placeholder et bouton désactivé si vide (AAA)", () => {
    const { container } = render(
      <SearchBox placeholder="Rechercher un personnage…" />
    );

    const input = container.querySelector("input") as HTMLInputElement;
    const btn = container.querySelector("button") as HTMLButtonElement;

    expect(input).toBeInTheDocument();
    expect(input.placeholder).toBe("Rechercher un personnage…");
    expect(btn).toBeDisabled();
  });

  it("appelle onChange à chaque saisie et active le bouton quand l'input n'est pas vide", () => {
    const onChange = vi.fn();
    const { container } = render(<SearchBox onChange={onChange} />);

    const input = container.querySelector("input") as HTMLInputElement;
    const btn = container.querySelector("button") as HTMLButtonElement;

    fireEvent.change(input, { target: { value: "Sir" } });
    fireEvent.change(input, { target: { value: "Sir Ex" } });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith("Sir Ex");
    expect(btn).not.toBeDisabled();
  });

  it("soumet la recherche (bouton) avec valeur *trimmed* via onSubmit", () => {
    const onSubmit = vi.fn();
    const { container } = render(<SearchBox onSubmit={onSubmit} />);

    const input = container.querySelector("input") as HTMLInputElement;
    const btn = container.querySelector("button") as HTMLButtonElement;

    fireEvent.change(input, { target: { value: "   Sir Exura  " } });
    fireEvent.click(btn);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith("Sir Exura");
  });

  it("soumet aussi avec la touche Enter", () => {
    const onSubmit = vi.fn();
    const { container } = render(<SearchBox onSubmit={onSubmit} />);

    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Ana Maria" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(onSubmit).toHaveBeenCalledWith("Ana Maria");
  });
});
