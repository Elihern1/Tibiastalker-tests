import React, { useState, FormEvent } from 'react';

export interface SearchBoxProps {
  initialQuery?: string;
  placeholder?: string;
  onChange?: (q: string) => void;
  onSubmit?: (q: string) => void;
}

export default function SearchBox({
  initialQuery = '',
  placeholder = 'Search…',
  onChange,
  onSubmit,
}: SearchBoxProps) {
  const [q, setQ] = useState<string>(initialQuery);

  function handleChange(value: string) {
    setQ(value);
    onChange?.(value);
  }

  function handleSubmit(e?: FormEvent) {
    e?.preventDefault?.();
    const trimmed = q.trim();
    if (!trimmed) return;
    onSubmit?.(trimmed);
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
          if (e.key === 'Enter') handleSubmit();
        }}
      />
      <button type="submit" disabled={!q.trim()}>
        Search
      </button>
    </form>
  );
}
