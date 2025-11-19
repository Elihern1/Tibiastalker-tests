import React, { useState, FormEvent } from "react";
import { rechercheSchema } from "../schema/search";

export interface SearchBoxProps {
  initialQuery?: string;
  placeholder?: string;
  onChange?: (q: string) => void;
  onSubmit?: (q: string) => void;
}

export default function SearchBox({
  initialQuery = "",
  placeholder = "Search…",
  onChange,
  onSubmit,
}: SearchBoxProps) {
  const [q, setQ] = useState<string>(initialQuery);
  const [erreur, setErreur] = useState<string>("");

  function handleChange(value: string) {
    setQ(value);
    setErreur("");
    onChange?.(value);
  }

  function handleSubmit(e?: FormEvent) {
    e?.preventDefault?.();
    const brut = q;

    const parsed = rechercheSchema.safeParse(brut);

    if (!parsed.success) {
      const msg =
        parsed.error.issues[0]?.message ||
        "La requête de recherche est invalide.";
      setErreur(msg);
      return;
    }

    const valeurValide = parsed.data;
    setErreur("");
    onSubmit?.(valeurValide);
  }

  return (
    <form aria-label="search form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={q}
        placeholder={placeholder}
        aria-label="search input"
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />
      <button type="submit" disabled={!q.trim()}>
        Search
      </button>
      {erreur && (
        <p role="alert" aria-label="search-error">
          {erreur}
        </p>
      )}
    </form>
  );
}
