import {
  addImportsDir,
  addTemplate,
  createResolver,
  defineNuxtModule,
} from "@nuxt/kit"

export default defineNuxtModule({
  meta: {
    name: "nuxt-api-factory",
    compatibility: { nuxt: "^3.6.0" },
  },
  async setup(_, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const { resolve: resolveFromProject } = createResolver(nuxt.options.srcDir)

    addImportsDir([resolve("runtime"), resolveFromProject("repositories")])

    addTemplate({
      filename: "types/api-factory.d.ts",
      getContents: () =>
        [
          "declare module 'api-factory' {",
          "  import type { UseFetchOptions } from \"nuxt/app\"",
          "  export interface Options<T = any, U = T> {",
          "    options?: UseFetchOptions<T, U>",
          "    errorOptions?: { statusCode?: number; statusMessage?: string; message?: string; fatal?: boolean }",
          "  }",
          "}",
        ].join("\n"),
    })

    nuxt.hook("prepare:types", ({ references }) => {
      references.push({
        path: resolve(nuxt.options.buildDir, "types/api-factory.d.ts"),
      })
    })
  },
})
