// 主要API导出
export { default as qrcode } from './libs/qr';
export { 
  toMatrix, 
  toSVG, 
  toCompactSVG, 
  toSVGDataURL, 
  toPNG,
  toPDF,
  toEPS,
  toSVGObject, 
  getQRInfo 
} from './libs/qr';

// 核心功能导出
export { QR } from './libs/qr-base';
export { generateSVG, generateCompactSVG, generateSVGDataURL, generatePNG, generatePDF, generateEPS, svgObject } from './libs/vector';
export { encode } from './libs/encode';
export { calculateErrorCode } from './libs/errorcode';
export { getMatrix } from './libs/matrix';
export { crc32 } from './libs/crc32';

// 类型导出
export type { QROptions, QRMatrix, ECLevel, SVGOptions, PNGOptions, PDFOptions, EPSOptions } from './libs/qr';
export type { EncodedData } from './libs/qr-base';
export type { SVGObject } from './libs/vector';