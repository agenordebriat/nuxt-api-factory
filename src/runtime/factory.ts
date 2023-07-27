import { defu } from "defu"
import { hash } from "ohash"
import type { Options } from "api-factory"
import type { FetchError } from "ofetch"
import type { Ref } from "vue"
import type { ZodSchema } from "zod"
import { createError, parseData, useFetch } from "#imports"

export default class RepositoriesFactory {
  private defaultOptions: Parameters<typeof useFetch>[1]

  constructor(options: Parameters<typeof useFetch>[1]) {
    this.defaultOptions = options
  }

  protected async fetch<S extends ZodSchema>(
    request: Parameters<typeof useFetch>[0],
    schema: S | false,
    description: string,
    { options = {}, errorOptions = {} }: Options = {},
  ): Promise<{
    data: Ref<S["_type"]>
    pending: ReturnType<typeof useFetch>["pending"]
    refresh: ReturnType<typeof useFetch>["refresh"]
    execute: ReturnType<typeof useFetch>["execute"]
    status: ReturnType<typeof useFetch>["status"]
    error: Ref<FetchError<any> | null>
  }> {
    const { data, error, ...rest } = await useFetch(
      request,
      defu(
        {
          key: `${description} (${hash([request, options, errorOptions])})`,
          ...options,
        },
        this.defaultOptions,
      ),
    )

    if (error.value) {
      const { statusCode, statusMessage, message, fatal = true } = errorOptions
      const errorData: typeof errorOptions = error.value

      const customError = () => {
        return createError({
          statusCode: statusCode ?? errorData.statusCode,
          statusMessage: statusMessage ?? errorData.statusMessage,
          message: message ?? errorData.message,
          fatal,
        })
      }

      if (fatal) throw customError()

      customError()
    }

    return {
      data: schema ? parseData(data, schema) : data,
      ...rest,
      error,
    }
  }
}
