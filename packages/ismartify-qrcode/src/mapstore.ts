import { ISmartifyMapStore } from "@ismartify/mapstore";
import { toMatrix, toSVG, toSVGDataURL, toSVGObject, getQRInfo } from "./libs/qr";
import type { ECLevel, SVGOptions, QRMatrix } from "./libs/qr";

export interface ISmartifyQRCodeOptions {
  ecLevel?: ECLevel; // 纠错级别，默认 M
  parseUrl?: boolean; // 是否按 URL 优化编码，默认 true
  svg?: SVGOptions & {
    // 扩展：是否生成 base64 的 DataURL（默认 false，沿用 encodeURIComponent）
    base64?: boolean;
  };
}

// ISmartifyMapStore 能力参考：
// - set/get/has/delete/clear/pick/raw
// - mixin/call
// - exec
// - tap(rule?)
export class ISmartifyQRCode extends ISmartifyMapStore {
  constructor(options: ISmartifyQRCodeOptions = {}) {
    super();
    // 基础标识
    this.set("type", "qrcode");

    // 默认参数
    this.set("ecLevel", options.ecLevel ?? ("M" as ECLevel));
    this.set("parseUrl", options.parseUrl ?? true);
    this.set("svg", options.svg ?? {});

    // 提供一个默认的混入函数：increment 示例（演示 mixin 能力，可按需扩展/删除）
    this.mixin("setOption", (self: ISmartifyMapStore, key: string, value: any) => {
      self.set(key, value);
      return self;
    });

    // 添加QR码格式生成方法
    this.mixin("toPNG", (self: ISmartifyQRCode, data: string | number | Buffer | number[], options: any = {}) => {
      const { toPNG } = require('./libs/qr');
      return toPNG(data, options);
    });

    this.mixin("toPDF", (self: ISmartifyQRCode, data: string | number | Buffer | number[], options: any = {}) => {
      const { toPDF } = require('./libs/qr');
      return toPDF(data, options);
    });

    this.mixin("toEPS", (self: ISmartifyQRCode, data: string | number | Buffer | number[], options: any = {}) => {
      const { toEPS } = require('./libs/qr');
      return toEPS(data, options);
    });
  }

  // 链式配置方法
  setLevel(level: ECLevel): this {
    this.set("ecLevel", level);
    return this;
  }

  setParseUrl(enabled: boolean): this {
    this.set("parseUrl", enabled);
    return this;
  }

  setSVGOptions(svg: SVGOptions & { base64?: boolean }): this {
    // 合并已有的 svg 配置
    const current = this.get("svg", {});
    this.set("svg", { ...current, ...svg });
    return this;
  }

  // 输出：矩阵
  matrix(data: string | number | Buffer | number[]): QRMatrix {
    const ecLevel = this.get("ecLevel", "M");
    const parseUrl = this.get("parseUrl", true);
    return toMatrix(data, ecLevel, parseUrl);
  }

  // 输出：SVG 字符串（支持通过 svg.minify/背景色等选项定制）
  svg(data: string | number | Buffer | number[], svg?: SVGOptions): string {
    const ecLevel = this.get("ecLevel", "M");
    const parseUrl = this.get("parseUrl", true);
    const baseSVG = this.get("svg", {});
    return toSVG(data, { ecLevel, parseUrl, svg: { ...baseSVG, ...(svg ?? {}) } });
  }

  // 输出：DataURL（默认使用 encodeURIComponent；当 svg.base64=true 时使用 base64）
  dataURL(
    data: string | number | Buffer | number[],
    svg?: SVGOptions & { base64?: boolean }
  ): string {
    const ecLevel = this.get("ecLevel", "M");
    const parseUrl = this.get("parseUrl", true);
    const baseSVG = this.get("svg", {} as SVGOptions & { base64?: boolean });
    const merged = { ...baseSVG, ...(svg ?? {}) } as SVGOptions & { base64?: boolean };

    if (merged.base64) {
      // 直接生成 SVG，再手工转 base64 DataURL
      const svgStr = toSVG(data, { ecLevel, parseUrl, svg: merged });
      const b64 = Buffer.from(svgStr).toString("base64");
      return `data:image/svg+xml;base64,${b64}`;
    }

    return toSVGDataURL(data, { ecLevel, parseUrl, svg: merged });
  }

  // 输出：仅路径对象（包含 size 与 path）
  object(
    data: string | number | Buffer | number[],
    extra?: { margin?: number }
  ) {
    const ecLevel = this.get("ecLevel", "M");
    const parseUrl = this.get("parseUrl", true);
    const baseSVG = this.get("svg", {});
    const margin = extra?.margin ?? (baseSVG.margin ?? 1);
    return toSVGObject(data, { ecLevel, parseUrl, svg: { margin } });
  }

  // 分析：尺寸、黑白比例等
  inspect(data: string | number | Buffer | number[]) {
    const ecLevel = this.get("ecLevel", "M");
    const parseUrl = this.get("parseUrl", true);
    return getQRInfo(data, ecLevel, parseUrl);
  }
}
    

