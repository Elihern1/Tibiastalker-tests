import React, { useEffect, useState } from 'react';
import ResultCard from './ResultCard';

export interface Character {
  id: string;
  name: string;
  level: number;
  vocation?: string;
  server?: string;
}

export interface ResultsListProps {
  query: string;
  endpoint: string; // ex: "/api/search?name="
}

export default function ResultsList({ query, endpoint }: ResultsListProps) {
  const [items, setItems] = useState<Character[]>([]);
  const [state, setState] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!query.trim()) {
      setItems([]);
      setState('idle');
      setError('');
      return;
    }
    let cancelled = false;
    async function run() {
      try {
        setState('loading');
        setError('');
        const res = await fetch(`${endpoint}${encodeURIComponent(query.trim())}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as Character[];
        if (!cancelled) {
          setItems(data);
          setState('success');
        }
      } catch (e: any) {
        if (!cancelled) {
          setItems([]);
          setState('error');
          setError(e?.message ?? 'Unknown error');
        }
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [query, endpoint]);

  if (state === 'idle') return <p aria-label="idle">Enter a query…</p>;
  if (state === 'loading') return <p role="status">Loading…</p>;
  if (state === 'error') return <p role="alert">Error: {error}</p>;
  if (items.length === 0) return <p aria-label="no-results">No results</p>;

  return (
    <section aria-label="results">
      {items.map((c) => (
        <ResultCard
          key={c.id}
          name={c.name}
          level={c.level}
          vocation={c.vocation}
          server={c.server}
          href={`/characters/${encodeURIComponent(c.name)}`}
        />
      ))}
    </section>
  );
}
