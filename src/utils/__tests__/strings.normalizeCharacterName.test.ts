import { describe, it, expect } from 'vitest';
import { normalizeCharacterName } from '../../utils/strings';

describe('normalizeCharacterName', () => {
  it('normalise espaces et met en Title Case (Arrange-Act-Assert)', () => {
    // Arrange
    const name = '  sIr   exUrA  ';
    // Act
    const result = normalizeCharacterName(name);
    // Assert
    expect(result).toBe('Sir Exura');
  });

  it('préserve accents et met en majuscule après apostrophe (ex: D\'Árvore)', () => {
    // Arrange
    const name = "jóão d'árvore";
    // Act
    const result = normalizeCharacterName(name);
    // Assert
    expect(result).toBe("Jóão D'Árvore");
  });

  it('gère les tirets et espaces multiples (ex: Ana-Maria Rosa)', () => {
    // Arrange
    const name = '  ana-maria    rosa ';
    // Act
    const result = normalizeCharacterName(name);
    // Assert
    expect(result).toBe('Ana-Maria Rosa');
  });

  it('rejette une chaîne vide (erreur explicite)', () => {
    // Arrange
    const name = '   ';
    // Act + Assert
    expect(() => normalizeCharacterName(name)).toThrow(/must not be empty/i);
  });

  it('rejette les caractères non autorisés (ex: chiffres)', () => {
    // Arrange
    const name = 'exura123';
    // Act + Assert
    expect(() => normalizeCharacterName(name)).toThrow(/invalid characters/i);
  });
});