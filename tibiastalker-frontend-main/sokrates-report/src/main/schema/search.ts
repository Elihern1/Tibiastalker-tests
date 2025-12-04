import { z } from "zod";

export const rechercheSchema = z
  .string()
  .trim()
  .min(3, "La requête doit contenir au moins 3 caractères.")
  .max(50, "La requête ne doit pas dépasser 50 caractères.");
