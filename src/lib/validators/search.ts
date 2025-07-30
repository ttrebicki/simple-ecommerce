import { z } from "zod";

export const searchValidator = z.object({
  search: z.string(),
});
