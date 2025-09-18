import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  // minify:true,
  target: "es2022", //目标 JavaScript 版本
  // noExternal: ['urijs'], // 强制打包 @ismartify/common 和 urijs
  external: [], // 不 external，确保所有依赖被打包进产物
});
