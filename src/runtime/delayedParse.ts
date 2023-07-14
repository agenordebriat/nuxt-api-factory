import { watch } from "vue"
import type { Ref } from "vue"
import type { ZodSchema } from "zod"
import { parseData } from "#imports"

type DelayedParseFn = (
  data: Ref<unknown>,
  schema: ZodSchema,
  pending: Ref<boolean>,
) => void

export const delayedParse: DelayedParseFn = (data, schema, pending) => {
  watch(pending, () => {
    if (!pending.value) {
      const parsedData = parseData(data, schema)

      data.value = parsedData.value
    }
  })
}
