import { charactersPromptUrl } from "../../../../constants/api";
import { FetchPromptList } from "./types";

const fetchPromptList: FetchPromptList = async (input, setPromptData) => {
  try {
    const res = await fetch(
      `${charactersPromptUrl}?searchText=${encodeURIComponent(input)}&page=1&pageSize=10`
    );

    if (!res.ok) {
      console.warn("⚠️ fetchPromptList: HTTP error", res.status);
      setPromptData([]);
      return;
    }

    const data = await res.json();

    // Robustesse : transformer la réponse en tableau propre
    let safeList: string[] = [];

    if (Array.isArray(data)) {
      safeList = data.map(String);
    } else if (data?.names && Array.isArray(data.names)) {
      // Certains backends renvoient { names: [...] }
      safeList = data.names.map(String);
    } else if (typeof data === "string") {
      safeList = [data];
    } else {
      console.warn("⚠️ fetchPromptList: réponse inattendue :", data);
      safeList = [];
    }

    setPromptData(safeList);
  } catch (err) {
    console.error("❌ fetchPromptList: exception", err);
    setPromptData([]);
  }
};

export default fetchPromptList;
