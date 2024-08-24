import { defineConfig } from "tsup"

export default defineConfig({
  format: ["cjs", "esm"],
  entry: {
    index: 'lib/index.ts',
    messages: 'lib/messages/index.ts'
  },
  minify: true,
  dts: true,
  shims: true,
  clean: true,
  skipNodeModulesBundle: true
})
