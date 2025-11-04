import React from 'react';

export interface ResultCardProps {
  name: string;
  level: number;
  vocation?: string;
  server?: string;
  href?: string;           // lien vers la page du personnage (optionnel)
  highlight?: boolean;     // applique une classe spéciale (optionnel)
  onSelect?: () => void;   // bouton d'action optionnel
}

export default function ResultCard({
  name,
  level,
  vocation,
  server,
  href,
  highlight = false,
  onSelect,
}: ResultCardProps) {
  return (
    <article
      role="article"
      aria-label={`Result for ${name}`}
      className={`result-card ${highlight ? 'is-highlighted' : ''}`}
      data-testid="result-card"
    >
      <header>
        <h2>{name}</h2>
        {href ? (
          <a href={href} aria-label={`View ${name}`}>
            View
          </a>
        ) : null}
      </header>

      <dl>
        <div>
          <dt>Level</dt>
          <dd>{level}</dd>
        </div>

        {vocation ? (
          <div>
            <dt>Vocation</dt>
            <dd>{vocation}</dd>
          </div>
        ) : null}

        {server ? (
          <div>
            <dt>Server</dt>
            <dd>{server}</dd>
          </div>
        ) : null}
      </dl>

      {onSelect ? (
        <footer>
          <button type="button" onClick={onSelect} aria-label={`Select ${name}`}>
            Select
          </button>
        </footer>
      ) : null}
    </article>
  );
}
