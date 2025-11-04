import { describe, it, expect } from 'vitest';
import { buildCharacterUrl } from '../../utils/url';

describe('buildCharacterUrl', () => {
  it('construit une URL basique avec nom normalisé et encodé (AAA)', () => {
    // Arrange
    const name = '  sIr   exUrA  ';
    // Act
    const url = buildCharacterUrl(name);
    // Assert
    expect(url).toBe('/characters/Sir%20Exura');
  });

  it("gère accents et apostrophe + ajoute ?lang et ?server", () => {
    // Arrange
    const name = "jóão d'árvore";
    const opts = { lang: 'pl', server: 'Antica' };
    // Act
    const url = buildCharacterUrl(name, opts);
    // Assert
    expect(url).toBe("/characters/J%C3%B3%C3%A3o%20D'%C3%81rvore?lang=pl&server=Antica");
  });

  it('ignore les options vides et nettoie les espaces', () => {
    // Arrange
    const name = 'Ana   Maria';
    const opts = { lang: '  ', server: '   ' };
    // Act
    const url = buildCharacterUrl(name, opts);
    // Assert
    expect(url).toBe('/characters/Ana%20Maria');
  });

  it('lève une erreur si le nom est vide ou invalide', () => {
    // Arrange
    const empty = '   ';
    const invalid = 'Exura123';
    // Act + Assert
    expect(() => buildCharacterUrl(empty)).toThrow(/must not be empty/i);
    expect(() => buildCharacterUrl(invalid)).toThrow(/invalid characters/i);
  });
});