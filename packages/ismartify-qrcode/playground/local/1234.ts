import { toSVG, qrcode } from "../../src/index";
import {writeFileSync} from "node:fs"
import { join } from "node:path";
const projectPath = join(__dirname, "../../output");

const svg = toSVG("1234", {
    ecLevel: "M",
    svg: {
        size: 300,
        background: "white",
        foreground: "black",
        margin: 2
    }
});

const matrix = qrcode("Hello World", {
    ecLevel: "M",
    parseUrl: true,
    type: "matrix"
});

writeFileSync(join(projectPath, "local.1234.svg"), svg);
writeFileSync(join(projectPath, "local.1234.matrix"), JSON.stringify(matrix));