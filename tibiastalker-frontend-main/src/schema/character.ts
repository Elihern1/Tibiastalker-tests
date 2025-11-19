import { z } from "zod";

export const personnageSchema = z
  .object({
    name: z.string(),
    level: z.number().int().nonnegative(),
    vocation: z.string().optional(),
    server: z.string().optional(),
  })
  .strict();

export const listePersonnagesSchema = z.array(personnageSchema);

export type Personnage = z.infer<typeof personnageSchema>;
