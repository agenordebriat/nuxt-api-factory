module.exports = {
  root: true,
  extends: ["@antfu", "@unocss"],
  rules: {
    "@typescript-eslint/quotes": ["error", "double"],
    "antfu/if-newline": "off",
    "unused-imports/no-unused-vars": ["error", { ignoreRestSiblings: true }],
    "yml/quotes": ["error", { prefer: "double" }],
  },
}
