import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  minify:true,
  external: [], // 不 external，确保所有依赖被打包进产物
});
