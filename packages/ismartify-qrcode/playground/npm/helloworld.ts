import { toSVG, qrcode } from "@ismartify/qrcode";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const projectPath = join(__dirname, "../../output");

const svg = toSVG("hello world");
const matrix = qrcode("hello world", {
  ecLevel: "M",
  parseUrl: true,
  type: "matrix",
});

writeFileSync(join(projectPath, "npm.helloworld.svg"), svg);
writeFileSync(join(projectPath, "npm.helloworld.matrix"), JSON.stringify(matrix));