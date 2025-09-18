import { toSVG, qrcode } from "@ismartify/qrcode";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const projectPath = join(__dirname, "../../output");

const svg = toSVG("1234");
const matrix = qrcode("1234", {
  ecLevel: "M",
  parseUrl: true,
  type: "matrix",
});

writeFileSync(join(projectPath, "npm.1234.svg"), svg);
writeFileSync(join(projectPath, "npm.1234.matrix"), JSON.stringify(matrix));