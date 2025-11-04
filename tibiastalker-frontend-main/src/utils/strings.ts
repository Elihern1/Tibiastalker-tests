/**
 * Normalise un nom de personnage Tibia :
 * - trim début/fin
 * - remplace espaces multiples par un seul
 * - conserve accents
 * - Title Case par mot (+ après apostrophe)
 * - autorise lettres unicode, espace, tiret (-) et apostrophe (')
 * - lève une erreur si vide ou si caractères non autorisés
 */
export function normalizeCharacterName(input: string): string {
  if (typeof input !== 'string') throw new TypeError('name must be a string');

  const raw = input.trim();
  if (raw.length === 0) throw new Error('name must not be empty');

  // Autorise lettres Unicode, espace, tiret (-), apostrophe (')
  const allowed = /^[\p{L}\s'-]+$/u;
  if (!allowed.test(raw)) {
    throw new Error('name contains invalid characters');
  }

  // Réduction des espaces multiples
  const collapsed = raw.replace(/\s+/g, ' ');

  // Title Case mot par mot, en gérant les sous-parties avec '-'
  const words = collapsed.split(' ').map((word) => {
    return word
      .split('-')
      .map((part) => {
        // tout en minuscules d'abord
        let s = part.toLocaleLowerCase();

        // majuscule sur la première lettre
        s = s.replace(/^\p{L}/u, (ch) => ch.toLocaleUpperCase());

        // majuscule sur la lettre juste après un apostrophe
        s = s.replace(/'(\p{L})/gu, (_, ch: string) => `'${ch.toLocaleUpperCase()}`);

        return s;
      })
      .join('-');
  });

  return words.join(' ');
}