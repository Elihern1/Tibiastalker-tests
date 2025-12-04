import { useState, useCallback, useEffect } from "react";
import { fetchCharacter, fetchSimilarCharacters } from "../../../services/characters";
import { CharacterResponse, ErrorResponse, SimilarCharactersResponse } from "../../../types/CharacterResult";

export function useCharacterSearch() {
  const [loading, setLoading] = useState(false);
  const [searchedName, setSearchedName] = useState("");
  const [character, setCharacter] = useState<CharacterResponse | null>(null);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [similar, setSimilar] = useState<SimilarCharactersResponse | null>(null);
  const [page, setPage] = useState(1);

  const search = useCallback(async (name: string) => {
    setLoading(true);
    setSearchedName(name);
    setError(null);
    setCharacter(null);
    setSimilar(null);

    const result = await fetchCharacter(name);

    if ("detail" in result) {
      setError(result);
    } else {
      setCharacter(result);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (error?.status === 404) {
      setLoading(true);
      fetchSimilarCharacters(searchedName, page)
        .then((res) => setSimilar(res))
        .finally(() => setLoading(false));
    }
  }, [page, error, searchedName]);

  return {
    loading,
    searchedName,
    character,
    error,
    similar,
    page,
    setPage,
    search,
  };
}
