import { normalizeCharacterName } from './strings';

/**
 * Construit l'URL d'un personnage.
 * - Normalise le nom (reutilise normalizeCharacterName)
 * - Encode le nom pour l'URL
 * - Ajoute des query params (lang, server) si fournis (non vides)
 * - Lève une erreur si le nom est invalide/vide
 *
 * Exemple:
 *   buildCharacterUrl("  sIr  exUrA ")         -> "/characters/Sir%20Exura"
 *   buildCharacterUrl("jóão d'árvore",{lang:'pl',server:'Antica'})
 *     -> "/characters/Jóão%20D'%C3%81rvore?lang=pl&server=Antica"
 */
export function buildCharacterUrl(
  name: string,
  opts?: { lang?: string; server?: string }
): string {
  const normalized = normalizeCharacterName(name); // lève déjà si invalide
  const pathname = `/characters/${encodeURIComponent(normalized)}`;

  const params = new URLSearchParams();
  if (opts?.lang && opts.lang.trim()) params.set('lang', opts.lang.trim());
  if (opts?.server && opts.server.trim()) params.set('server', opts.server.trim());

  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}