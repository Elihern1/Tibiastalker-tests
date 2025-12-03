import React, { useEffect, useState } from "react";
import ResultCard from "./ResultCard";
import { listePersonnagesSchema, Personnage } from "../schema/character";

export type Character = Personnage & { id: string };

export interface ResultsListProps {
  query: string;
  endpoint: string;
}

export default function ResultsList({ query, endpoint }: ResultsListProps) {
  const [items, setItems] = useState<Character[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!query.trim()) {
      setItems([]);
      setState("idle");
      setError("");
      return;
    }

    let cancelled = false;

    async function run() {
      try {
        setState("loading");
        setError("");

        const res = await fetch(
          `${endpoint}${encodeURIComponent(query.trim())}`
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        const parseResult = listePersonnagesSchema.safeParse(data);

        if (!parseResult.success) {
          if (process.env.NODE_ENV !== "production") {
            console.error("Erreur Zod:", parseResult.error.format());
          }
          if (!cancelled) {
            setItems([]);
            setState("error");
            setError("Les données reçues du serveur sont invalides.");
          }
          return;
        }

        const personnages = parseResult.data.map((p, index) => ({
          id: `${p.name}-${p.level}-${index}`,
          ...p,
        }));

        if (!cancelled) {
          setItems(personnages);
          setState("success");
        }
      } catch (e: any) {
        if (!cancelled) {
          setItems([]);
          setState("error");
          setError(e?.message ?? "Une erreur est survenue.");
        }
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [query, endpoint]);

  if (state === "idle") return <p aria-label="idle" data-testid="idle">Enter a query…</p>;
  if (state === "loading") return <p role="status" data-testid="loading">Loading…</p>;
  if (state === "error") return <p role="alert" data-testid="error">Error: {error}</p>;
  if (items.length === 0) return <p aria-label="no-results" data-testid="no-results">No results</p>;

  return (
    <section aria-label="results" data-testid="results-list">
      {items.map((c) => (
        <ResultCard
          key={c.id}
          name={c.name}
          level={c.level}
          vocation={c.vocation}
          server={c.server}
          href={`/characters/${encodeURIComponent(c.name)}`}
          data-testid="result-card"
        />
      ))}
    </section>
  );
}
