import { z } from "zod"

export const nonemptyObject = (object: object): boolean => {
  const emptyObjectSchema = z.object({}).strict()
  const result = emptyObjectSchema.safeParse(object)
  return !result.success
}