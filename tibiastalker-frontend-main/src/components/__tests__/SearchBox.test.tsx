import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from '../../components/SearchBox';

describe('SearchBox', () => {
  it('rend un input avec placeholder et bouton désactivé si vide (AAA)', () => {
    // Arrange
    render(<SearchBox placeholder="Rechercher un personnage…" />);
    const input = screen.getByRole('textbox', { name: /search input/i });
    const btn = screen.getByRole('button', { name: /search/i });

    // Assert
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Rechercher un personnage…');
    expect(btn).toBeDisabled();
  });

  it("appelle onChange à chaque saisie et active le bouton quand l'input n'est pas vide", () => {
    // Arrange
    const onChange = vi.fn();
    render(<SearchBox onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: /search input/i });
    const btn = screen.getByRole('button', { name: /search/i });

    // Act
    fireEvent.change(input, { target: { value: 'Sir' } });
    fireEvent.change(input, { target: { value: 'Sir Ex' } });

    // Assert
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith('Sir Ex');
    expect(btn).not.toBeDisabled();
  });

  it("soumet la recherche (bouton) avec valeur *trimmed* via onSubmit", () => {
    // Arrange
    const onSubmit = vi.fn();
    render(<SearchBox onSubmit={onSubmit} />);
    const input = screen.getByRole('textbox', { name: /search input/i });
    const btn = screen.getByRole('button', { name: /search/i });

    // Act
    fireEvent.change(input, { target: { value: '   Sir Exura  ' } });
    fireEvent.click(btn);

    // Assert
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('Sir Exura');
  });

  it("soumet aussi avec la touche Enter", () => {
    // Arrange
    const onSubmit = vi.fn();
    render(<SearchBox onSubmit={onSubmit} />);
    const input = screen.getByRole('textbox', { name: /search input/i });

    // Act
    fireEvent.change(input, { target: { value: 'Ana Maria' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    // Assert
    expect(onSubmit).toHaveBeenCalledWith('Ana Maria');
  });
});
