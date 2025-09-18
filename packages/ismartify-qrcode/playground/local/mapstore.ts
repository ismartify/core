import { ISmartifyQRCode } from "../../src/mapstore";
import { writeFileSync } from "fs";
import { join } from "path";

// iSmartify playground: 使用 ISmartifyMapStore 封装的 ISmartifyQRCode 示例
// 运行：npx tsx playground/mapstore.ts

const qrc = new ISmartifyQRCode({
  ecLevel: "M",
  parseUrl: true,
  svg: { size: 200, margin: 2, foreground: "#111", background: "white" },
});

// 链式配置
qrc.setLevel("Q").setParseUrl(true).setSVGOptions({ size: 240 });

// 存储与读取自定义配置项（演示 mapstore 能力）
qrc.set("meta.project", "ismartify-qrcode");
console.log("[meta.project]:", qrc.get("meta.project"));

qrc.mixin("writeFile", (self, path, data) => {
  writeFileSync(path, data);
  return self;
});

qrc.mixin("logInfo", (self, message, data) => {
  console.log(message, data);
  return self;
});

// 生成并保存 SVG
qrc.exec(async (self) => {
  const svg = self.svg("https://ismartify.dev/hello");
  const filename = join(process.cwd(), "output", "mapstore-qr.svg");
  console.log("[exec] QR code saved to:", filename);
  return self.call("writeFile", filename, svg);
});

// 生成并保存矩阵数据
qrc.exec(async (self) => {
  const matrix = self.matrix("https://ismartify.dev/hello");
  const filename = join(process.cwd(), "output", "mapstore-matrix.json");
  self.call("writeFile", filename, JSON.stringify(matrix));
  return self.call("logInfo", "[matrix] size:", `${matrix.length} x ${matrix.length}`);
});

// 生成并保存另一个 SVG
qrc.exec(async (self) => {
  const svg = self.svg("Hello ISmartify");
  const filename = join(process.cwd(), "output", "hello-ismartify.svg");
  self.call("writeFile", filename, svg);
  return self.call("logInfo", "[svg] saved to:", `${filename}, length: ${svg.length}`);
});

// 生成并保存 PNG
qrc.exec(async (self) => {
  const pngBuffer = self.call("toPNG", "https://ismartify.dev/hello", { ecLevel: "Q", png: { margin: 2, size: 4 } });
  const filename = join(process.cwd(), "output", "mapstore-qr.png");
  self.call("writeFile", filename, pngBuffer);
  return self.call("logInfo", "[png] saved to:", `${filename}, size: ${pngBuffer.length} bytes`);
});

// 生成并保存 PDF
qrc.exec(async (self) => {
  const pdfBuffer = self.call("toPDF", "https://ismartify.dev/hello", { ecLevel: "Q", pdf: { margin: 1, scale: 12 } });
  const filename = join(process.cwd(), "output", "mapstore-qr.pdf");
  self.call("writeFile", filename, pdfBuffer);
  return self.call("logInfo", "[pdf] saved to:", `${filename}, size: ${pdfBuffer.length} bytes`);
});

// 生成并保存 EPS
qrc.exec(async (self) => {
  const epsString = self.call("toEPS", "https://ismartify.dev/hello", { ecLevel: "Q", eps: { margin: 1, scale: 12 } });
  const filename = join(process.cwd(), "output", "mapstore-qr.eps");
  self.call("writeFile", filename, epsString);
  return self.call("logInfo", "[eps] saved to:", `${filename}, length: ${epsString.length} chars`);
});

// 生成并显示 DataURL
qrc.exec(async (self) => {
  const dataURL = self.dataURL("Benz @ iSmartify", { base64: true, xmlDeclaration: false });
  return self.call("logInfo", "[dataURL] prefix:", `${dataURL.slice(0, 64)}...`);
});

// 生成并显示路径对象
qrc.exec(async (self) => {
  const obj = self.object("QRCode Path Object", { margin: 2 });
  return self.call("logInfo", "[object] size:", `${obj.size}, path length: ${obj.path.length}`);
});

// 分析信息
qrc.exec(async (self) => {
  const info = self.inspect("https://example.com/product/123");
  return self.call("logInfo", "[inspect]", info);
});

// 使用 mixin（在类中内置 setOption 示例）
qrc.call("setOption", "custom.flag", true);
console.log("[custom.flag]:", qrc.get("custom.flag"));

// 调试输出（可选：打印所有键值）
qrc.tap();
