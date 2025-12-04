import { useCallback, useRef, useState } from "react";

import fetchPromptList from "./fetchPromptList";


const initialPromptList: string[] = [];

export const usePromptList = () => {
  const [promptList, setPromptList] = useState<string[]>(initialPromptList);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  /** Vide la liste de suggestions */
  const clearPromptList = useCallback(() => {
    setPromptList(initialPromptList);
  }, []);

  const getPromptList = useCallback(
    (currentInputValue: string) => {
      // Clear debounce
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // Moins de 3 lettres ⇒ aucune suggestion
      if (currentInputValue.trim().length < 3) {
        clearPromptList();
        return;
      }

      debounceRef.current = setTimeout(() => {
        fetchPromptList(currentInputValue, setPromptList);
      }, 800);
    },
    [clearPromptList]
  );

  return { promptList, getPromptList, clearPromptList };
};

export default usePromptList;
