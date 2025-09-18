/**
 * QR码矢量格式生成模块
 * 
 * 支持生成SVG、PNG、PDF、EPS等格式
 * 基于路径优化算法，生成紧凑的矢量数据
 * 
 * 基于原始qr-image库的vector.js实现
 */

import type { QRMatrix } from './matrix';
import { crc32 } from './crc32';
import { deflateSync } from 'zlib';

/**
 * SVG路径命令类型
 */
type PathCommand = ['M', number, number] | ['h', number] | ['v', number];

/**
 * PNG生成选项
 */
export interface PNGOptions {
  /** 边距，默认为1 */
  margin?: number;
  /** 输出尺寸（像素），默认为1 */
  size?: number;
  /** 背景颜色，默认为白色 */
  background?: string;
  /** 前景颜色（QR码颜色），默认为黑色 */
  foreground?: string;
}

/**
 * PDF生成选项
 */
export interface PDFOptions {
  /** 边距，默认为1 */
  margin?: number;
  /** 缩放倍数，默认为9 */
  scale?: number;
}

/**
 * EPS生成选项
 */
export interface EPSOptions {
  /** 边距，默认为1 */
  margin?: number;
  /** 缩放倍数，默认为9 */
  scale?: number;
}

/**
 * SVG对象接口
 */
export interface SVGObject {
  /** SVG尺寸（包含边距） */
  size: number;
  /** SVG路径字符串 */
  path: string;
}

/**
 * 将QR码矩阵转换为SVG路径
 * 使用优化的路径追踪算法，减少路径数据量
 * 
 * @param matrix QR码矩阵
 * @returns SVG路径命令数组
 */
function matrix2path(matrix: QRMatrix): PathCommand[][] {
  const N = matrix.length;
  const filled: boolean[][] = [];
  
  // 初始化填充标记数组
  for (let row = -1; row <= N; row++) {
    filled[row] = [];
  }

  const paths: PathCommand[][] = [];

  // 扫描矩阵，寻找未处理的黑色模块
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      if (filled[row][col]) continue;
      filled[row][col] = true;

      if (isDark(row, col)) {
        // 从黑色模块的上边缘开始追踪
        if (!isDark(row - 1, col)) {
          paths.push(plotPath(row, col, 'right'));
        }
      } else {
        // 从白色模块的左边缘开始追踪
        if (isDark(row, col - 1)) {
          paths.push(plotPath(row, col, 'down'));
        }
      }
    }
  }

  return paths;

  /**
   * 检查指定位置是否为黑色模块
   */
  function isDark(row: number, col: number): boolean {
    if (row < 0 || col < 0 || row >= N || col >= N) return false;
    return !!matrix[row][col];
  }

  /**
   * 从指定位置开始追踪路径
   */
  function plotPath(row0: number, col0: number, dir: 'right' | 'left' | 'down' | 'up'): PathCommand[] {
    filled[row0][col0] = true;
    const result: PathCommand[] = [];
    result.push(['M', col0, row0]);

    let row = row0;
    let col = col0;
    let len = 0;

    do {
      switch (dir) {
        case 'right':
          filled[row][col] = true;
          if (isDark(row, col)) {
            filled[row - 1][col] = true;
            if (isDark(row - 1, col)) {
              result.push(['h', len]);
              len = 0;
              dir = 'up';
            } else {
              len++;
              col++;
            }
          } else {
            result.push(['h', len]);
            len = 0;
            dir = 'down';
          }
          break;

        case 'left':
          filled[row - 1][col - 1] = true;
          if (isDark(row - 1, col - 1)) {
            filled[row][col - 1] = true;
            if (isDark(row, col - 1)) {
              result.push(['h', -len]);
              len = 0;
              dir = 'down';
            } else {
              len++;
              col--;
            }
          } else {
            result.push(['h', -len]);
            len = 0;
            dir = 'up';
          }
          break;

        case 'down':
          filled[row][col - 1] = true;
          if (isDark(row, col - 1)) {
            filled[row][col] = true;
            if (isDark(row, col)) {
              result.push(['v', len]);
              len = 0;
              dir = 'right';
            } else {
              len++;
              row++;
            }
          } else {
            result.push(['v', len]);
            len = 0;
            dir = 'left';
          }
          break;

        case 'up':
          filled[row - 1][col] = true;
          if (isDark(row - 1, col)) {
            filled[row - 1][col - 1] = true;
            if (isDark(row - 1, col - 1)) {
              result.push(['v', -len]);
              len = 0;
              dir = 'left';
            } else {
              len++;
              row--;
            }
          } else {
            result.push(['v', -len]);
            len = 0;
            dir = 'right';
          }
          break;
      }
    } while (row !== row0 || col !== col0);

    return result;
  }
}

/**
 * 将路径命令转换为SVG路径字符串
 * 
 * @param paths 路径命令数组
 * @param margin 边距
 * @returns SVG路径字符串
 */
function pathsToSVGString(paths: PathCommand[][], margin: number): string {
  return paths.map(subpath => {
    let pathString = '';
    
    for (const command of subpath) {
      switch (command[0]) {
        case 'M':
          pathString += `M${command[1] + margin} ${command[2] + margin}`;
          break;
        default:
          pathString += command.join('');
      }
    }
    
    return pathString + 'z';
  }).join('');
}

/**
 * 生成SVG对象（仅包含路径数据）
 * 
 * @param matrix QR码矩阵
 * @param margin 边距，默认为1
 * @returns SVG对象，包含尺寸和路径
 */
export function svgObject(matrix: QRMatrix, margin: number = 1): SVGObject {
  const paths = matrix2path(matrix);
  const pathString = pathsToSVGString(paths, margin);
  
  return {
    size: matrix.length + 2 * margin,
    path: pathString
  };
}

/**
 * 生成完整的SVG字符串
 * 
 * @param matrix QR码矩阵
 * @param options SVG生成选项
 * @returns 完整的SVG字符串
 */
export interface SVGOptions {
  /** 边距，默认为1 */
  margin?: number;
  /** 输出尺寸（像素），0表示使用viewBox自适应，默认为0 */
  size?: number;
  /** 背景颜色，默认为白色 */
  background?: string;
  /** 前景颜色（QR码颜色），默认为黑色 */
  foreground?: string;
  /** 是否添加XML声明，默认为true */
  xmlDeclaration?: boolean;
  /** 自定义CSS类名 */
  className?: string;
  /** 自定义ID */
  id?: string;
}

export function generateSVG(matrix: QRMatrix, options: SVGOptions = {}): string {
  const {
    margin = 1,
    size = 0,
    background = 'white',
    foreground = 'black',
    xmlDeclaration = true,
    className,
    id
  } = options;

  const svgObj = svgObject(matrix, margin);
  const viewBoxSize = svgObj.size;
  
  let svg = '';
  
  // 添加XML声明
  if (xmlDeclaration) {
    svg += '<?xml version="1.0" encoding="UTF-8"?>\n';
  }
  
  // 开始SVG标签
  svg += '<svg xmlns="http://www.w3.org/2000/svg"';
  
  // 添加ID
  if (id) {
    svg += ` id="${id}"`;
  }
  
  // 添加类名
  if (className) {
    svg += ` class="${className}"`;
  }
  
  // 添加尺寸
  if (size > 0) {
    svg += ` width="${size}" height="${size}"`;
  }
  
  // 添加viewBox
  svg += ` viewBox="0 0 ${viewBoxSize} ${viewBoxSize}">`;
  
  // 添加背景
  if (background && background !== 'transparent') {
    svg += `<rect width="${viewBoxSize}" height="${viewBoxSize}" fill="${background}"/>`;
  }
  
  // 添加QR码路径
  if (svgObj.path) {
    svg += `<path d="${svgObj.path}" fill="${foreground}"/>`;
  }
  
  // 结束SVG标签
  svg += '</svg>';
  
  return svg;
}

/**
 * 生成紧凑的SVG字符串（无格式化）
 * 
 * @param matrix QR码矩阵
 * @param margin 边距，默认为1
 * @param size 输出尺寸，0表示自适应，默认为0
 * @returns 紧凑的SVG字符串
 */
export function generateCompactSVG(matrix: QRMatrix, margin: number = 1, size: number = 0): string {
  return generateSVG(matrix, {
    margin,
    size,
    xmlDeclaration: false,
    background: 'transparent'
  });
}

/**
 * 生成SVG数据URL（用于直接在浏览器中显示）
 * 
 * @param matrix QR码矩阵
 * @param options SVG选项
 * @returns SVG数据URL
 */
export function generateSVGDataURL(matrix: QRMatrix, options: SVGOptions = {}): string {
  const svg = generateSVG(matrix, { ...options, xmlDeclaration: false });
  const encodedSVG = encodeURIComponent(svg);
  return `data:image/svg+xml,${encodedSVG}`;
}

// 导出主要函数
export { matrix2path, pathsToSVGString };

/**
 * 生成PNG格式的QR码
 * 
 * @param matrix QR码矩阵
 * @param options PNG生成选项
 * @returns PNG格式的Buffer
 */
export function generatePNG(matrix: QRMatrix, options: PNGOptions = {}): Buffer {
  const {
    margin = 1,
    size = 1,
    background = 'white',
    foreground = 'black'
  } = options;

  const N = matrix.length;
  const X = (N + 2 * margin) * size;
  const data = Buffer.alloc((X + 1) * X);
  data.fill(255); // 默认白色背景

  // 设置行过滤器字节
  for (let i = 0; i < X; i++) {
    data[i * (X + 1)] = 0;
  }

  // 绘制QR码
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (matrix[i][j]) {
        const offset = ((margin + i) * (X + 1) + (margin + j)) * size + 1;
        data.fill(0, offset, offset + size); // 黑色前景
        for (let c = 1; c < size; c++) {
          data.copy(data, offset + c * (X + 1), offset, offset + size);
        }
      }
    }
  }

  // PNG 文件头
  const PNG_HEAD = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const PNG_IHDR = Buffer.from([0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0]);
  const PNG_IDAT = Buffer.from([0, 0, 0, 0, 73, 68, 65, 84]);
  const PNG_IEND = Buffer.from([0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]);

  // 设置 IHDR 头部信息
  const IHDR = Buffer.concat([PNG_IHDR]);
  IHDR.writeUInt32BE(X, 8);
  IHDR.writeUInt32BE(X, 12);
  IHDR.writeUInt32BE(crc32(IHDR.subarray(4, -4)), 21);

  // 压缩数据
  const compressedData = deflateSync(data, { level: 9 });
  const IDAT = Buffer.concat([
    PNG_IDAT,
    compressedData,
    Buffer.alloc(4)
  ]);
  IDAT.writeUInt32BE(IDAT.length - 12, 0);
  IDAT.writeUInt32BE(crc32(IDAT.subarray(4, -4)), IDAT.length - 4);

  return Buffer.concat([PNG_HEAD, IHDR, IDAT, PNG_IEND]);
}

/**
 * 生成PDF格式的QR码
 * 
 * @param matrix QR码矩阵
 * @param options PDF生成选项
 * @returns PDF格式的Buffer
 */
export function generatePDF(matrix: QRMatrix, options: PDFOptions = {}): Buffer {
  const { margin = 1, scale = 9 } = options;
  const N = matrix.length;
  const X = (N + 2 * margin) * scale;

  const data: string[] = [
    '%PDF-1.0\n\n',
    '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n',
    '2 0 obj << /Type /Pages /Count 1 /Kids [ 3 0 R ] >> endobj\n'
  ];

  data.push(`3 0 obj << /Type /Page /Parent 2 0 R /Resources <<>> /Contents 4 0 R /MediaBox [ 0 0 ${X} ${X} ] >> endobj\n`);

  let path = `${scale} 0 0 ${scale} 0 0 cm\n`;
  path += matrix2path(matrix).map(subpath => {
    let res = '';
    let x = 0, y = 0;
    for (const item of subpath) {
      switch (item[0]) {
        case 'M':
          x = item[1] + margin;
          y = N - item[2] + margin;
          res += `${x} ${y} m `;
          break;
        case 'h':
          x += item[1];
          res += `${x} ${y} l `;
          break;
        case 'v':
          y -= item[1];
          res += `${x} ${y} l `;
          break;
      }
    }
    res += 'h';
    return res;
  }).join('\n');
  path += '\nf\n';

  data.push(`4 0 obj << /Length ${path.length} >> stream\n${path}endstream\nendobj\n`);

  let xref = 'xref\n0 5\n0000000000 65535 f \n';
  let l = data[0].length;
  for (let i = 1; i < 5; i++) {
    xref += ('0000000000' + l).toString().slice(-10) + ' 00000 n \n';
    l += data[i].length;
  }

  data.push(
    xref,
    'trailer << /Root 1 0 R /Size 5 >>\n',
    `startxref\n${l}\n%%EOF\n`
  );

  return Buffer.from(data.join(''));
}

/**
 * 生成EPS格式的QR码
 * 
 * @param matrix QR码矩阵
 * @param options EPS生成选项
 * @returns EPS格式的字符串
 */
export function generateEPS(matrix: QRMatrix, options: EPSOptions = {}): string {
  const { margin = 1, scale = 9 } = options;
  const N = matrix.length;
  const X = (N + 2 * margin) * scale;

  const data: string[] = [
    '%!PS-Adobe-3.0 EPSF-3.0',
    `%%BoundingBox: 0 0 ${X} ${X}`,
    '/h { 0 rlineto } bind def',
    '/v { 0 exch neg rlineto } bind def',
    `/M { neg ${N + margin} add moveto } bind def`,
    '/z { closepath } bind def',
    `${scale} ${scale} scale`,
    ''
  ];

  matrix2path(matrix).forEach(subpath => {
    let res = '';
    for (const item of subpath) {
      switch (item[0]) {
        case 'M':
          res += `${item[1] + margin} ${item[2]} M `;
          break;
        default:
          res += `${item[1]} ${item[0]} `;
      }
    }
    res += 'z\n';
    data.push(res);
  });

  data.push('fill\n%%EOF\n');
  return data.join('\n');
}
