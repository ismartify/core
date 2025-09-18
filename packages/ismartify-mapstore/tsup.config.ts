import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  target: "es2022", //目标 JavaScript 版本
  dts: true,  //是否生成类型声明文件
  clean: true, //每次构建是否清理输出目录
  minify: true, //是否压缩
  noExternal: [], // 强制打包 @ismartify/common 和 urijs
  external: [], // 不 external，确保所有依赖被打包进产物
  onSuccess: async () => {
    console.log("构建成功");
  },
  silent:false, //是否静默模式 
});
