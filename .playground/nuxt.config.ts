export default defineNuxtConfig({
  css: ["@unocss/reset/tailwind-compat.css"],
  devtools: { enabled: true },
  modules: ["../src/module", "@unocss/nuxt"],
})
