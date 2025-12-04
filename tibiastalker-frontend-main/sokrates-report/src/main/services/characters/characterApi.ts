import { charactersUrl } from "../../constants/api";
import {
  CharacterResponse,
  ErrorResponse,
  SimilarCharactersResponse
} from "../../types/CharacterResult";

export async function fetchCharacter(name: string): Promise<CharacterResponse | ErrorResponse> {
  const res = await fetch(`${charactersUrl}/${name}`);
  return res.json();
}

export async function fetchSimilarCharacters(
  name: string,
  page: number
): Promise<SimilarCharactersResponse> {
  const res = await fetch(
    `${charactersUrl}?searchText=${name}&page=${page}&pageSize=10`
  );
  return res.json();
}
