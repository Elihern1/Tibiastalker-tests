/**
 * Analyse une chaîne représentant un intervalle de niveaux.
 * Retourne un objet { min, max }.
 *
 * Exemples :
 *   "50-100" → { min: 50, max: 100 }
 *   "80+"    → { min: 80, max: null }
 *   "<60"    → { min: null, max: 60 }
 *
 * Lève une erreur si le format est invalide ou si min > max.
 */
export function parseLevelRange(input: string): { min: number | null; max: number | null } {
  if (typeof input !== 'string') throw new TypeError('input must be a string');
  const raw = input.trim();
  if (!raw) throw new Error('level range cannot be empty');

  const range = raw.match(/^(\d+)\s*-\s*(\d+)$/);
  const plus = raw.match(/^(\d+)\s*\+$/);
  const less = raw.match(/^<\s*(\d+)$/);

  if (range) {
    const min = Number(range[1]);
    const max = Number(range[2]);
    if (min > max) throw new Error('min cannot exceed max');
    return { min, max };
  }
  if (plus) return { min: Number(plus[1]), max: null };
  if (less) return { min: null, max: Number(less[1]) };

  throw new Error('invalid level range format');
}