import React from "react";
import { format } from "date-fns";

import { CharacterResponse } from "../types/CharacterResult";
import CharacterBasicProperty from "./BasicPropertyResult";
import CharactersArrayResult from "./CharactersArrayResult";
import StringArrayResult from "./StringArrayResult";

type Props = {
  character: CharacterResponse;
};

function CharacterResult({ character }: Props) {
  const {
    name,
    world,
    vocation,
    level,
    lastLogin,
    formerNames = [],
    formerWorlds = [],
    traded,
    otherVisibleCharacters = [],
    possibleInvisibleCharacters = [],
  } = character;

  return (
    <div className="d-grid mt-1">
      <CharacterBasicProperty
        propertyName="Name"
        propertyValue={`${name} ${traded ? "(traded)" : ""}`}
      />

      <CharacterBasicProperty propertyName="World" propertyValue={world} />
      <CharacterBasicProperty propertyName="Vocation" propertyValue={vocation} />
      <CharacterBasicProperty propertyName="Level" propertyValue={level} />

      {/* Protection pour éviter une erreur si lastLogin = null */}
      <CharacterBasicProperty
        propertyName="Last Login"
        propertyValue={
          lastLogin
            ? format(new Date(lastLogin), "dd.MM.yyyy HH:mm:ss")
            : "Unknown"
        }
      />

      {formerNames.length > 0 && (
        <StringArrayResult headerName="Former Names" propertyValue={formerNames} />
      )}

      {formerWorlds.length > 0 && (
        <StringArrayResult headerName="Former Worlds" propertyValue={formerWorlds} />
      )}

      {otherVisibleCharacters.length > 0 && (
        <StringArrayResult
          headerName="Other Visible Characters"
          propertyValue={otherVisibleCharacters}
          isCharacterName
        />
      )}

      {possibleInvisibleCharacters.length > 0 && (
        <CharactersArrayResult
          propertyName="Possible Other Characters"
          propertyValue={possibleInvisibleCharacters}
        />
      )}
    </div>
  );
}

export default CharacterResult;
