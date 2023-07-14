import {
  defineConfig,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss"

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({ provider: "google", fonts: { sans: "Roboto:400,600" } }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
