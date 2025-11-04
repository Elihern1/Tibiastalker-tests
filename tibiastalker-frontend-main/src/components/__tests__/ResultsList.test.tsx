import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultsList from '../../components/ResultsList';

const endpoint = '/api/search?name=';

describe('ResultsList (async)', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.useRealTimers();
    // on typpe fetch comme un mock Vitest
    global.fetch = vi.fn() as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    global.fetch = originalFetch as any;
  });

  it('affiche "idle" quand la query est vide (AAA)', () => {
    render(<ResultsList query="" endpoint={endpoint} />);
    expect(screen.getByLabelText(/idle/i)).toBeInTheDocument();
  });

  it('affiche loading puis rend les résultats (succès 200)', async () => {
    const mockData = [
      { id: '1', name: 'Sir Exura', level: 120, vocation: 'Knight', server: 'Antica' },
      { id: '2', name: 'Ana Maria', level: 80, vocation: 'Druid', server: 'Pacera' },
    ];

    // cast local pratique pour accéder aux méthodes de mock
    const mockFetch = global.fetch as unknown as ReturnType<typeof vi.fn>;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    } as any);

    render(<ResultsList query="exu" endpoint={endpoint} />);

    expect(screen.getByRole('status')).toHaveTextContent(/loading/i);

    const resultsSection = await screen.findByLabelText(/results/i);
    expect(resultsSection).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /sir exura/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ana maria/i })).toBeInTheDocument();

    expect(mockFetch).toHaveBeenCalledWith('/api/search?name=exu');
  });

  it('affiche "No results" quand la réponse est vide', async () => {
    const mockFetch = global.fetch as unknown as ReturnType<typeof vi.fn>;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as any);

    render(<ResultsList query="unknown" endpoint={endpoint} />);

    const emptyMsg = await screen.findByLabelText(/no-results/i);
    expect(emptyMsg).toHaveTextContent(/no results/i);
  });

  it('affiche une erreur si la réponse est non-200', async () => {
    const mockFetch = global.fetch as unknown as ReturnType<typeof vi.fn>;
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'boom' }),
    } as any);

    render(<ResultsList query="err" endpoint={endpoint} />);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/error/i);
    expect(alert).toHaveTextContent(/500/);
  });
});
