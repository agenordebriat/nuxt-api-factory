import { z } from "zod"

export const Users = z.array(
  z.object({ id: z.number(), name: z.string(), website: z.string() }),
)
