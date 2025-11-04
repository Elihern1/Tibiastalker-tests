import { describe, it, expect } from 'vitest';
import { parseLevelRange } from '../../utils/levels';

describe('parseLevelRange', () => {
  it('analyse un intervalle complet (AAA)', () => {
    // Arrange
    const input = '50-100';
    // Act
    const result = parseLevelRange(input);
    // Assert
    expect(result).toEqual({ min: 50, max: 100 });
  });

  it('analyse une borne minimale "80+"', () => {
    const input = '80+';
    const result = parseLevelRange(input);
    expect(result).toEqual({ min: 80, max: null });
  });

  it('analyse une borne maximale "<60"', () => {
    const input = '<60';
    const result = parseLevelRange(input);
    expect(result).toEqual({ min: null, max: 60 });
  });

  it('rejette un format invalide', () => {
    expect(() => parseLevelRange('abc')).toThrow(/invalid/i);
  });

  it('rejette un intervalle inversé (min > max)', () => {
    expect(() => parseLevelRange('100-50')).toThrow(/min cannot exceed max/i);
  });
});
