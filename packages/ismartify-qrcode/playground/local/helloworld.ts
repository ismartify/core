import { toSVG, qrcode } from "../../src/index";
import {writeFileSync} from "node:fs"

const svg = toSVG("Hello World", {
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

writeFileSync("helloworld.svg", svg);
writeFileSync("helloworld.matrix", JSON.stringify(matrix));