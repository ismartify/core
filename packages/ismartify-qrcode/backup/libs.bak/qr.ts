/**
 * QR码生成主要API接口
 * 
 * 提供简单易用的QR码生成接口，支持多种输出格式
 * 整合了矩阵生成、SVG输出等功能
 * 
 * 基于原始qr-image库的qr.js实现
 */

import { QR as generateMatrix, type ECLevel } from './qr-base';
import { generateSVG, generateCompactSVG, generateSVGDataURL, svgObject, type SVGOptions } from './vector';
import type { QRMatrix } from './matrix';

/**
 * QR码生成选项
 */
export interface QROptions {
  /** 纠错级别，默认为'M' */
  ecLevel?: ECLevel;
  /** 是否解析URL，默认为true */
  parseUrl?: boolean;
  /** 输出类型，默认为'svg' */
  type?: 'matrix' | 'svg' | 'svg-compact' | 'svg-data-url';
  /** SVG特定选项 */
  svg?: SVGOptions;
}

/**
 * 统一的QR码生成函数
 * 
 * @param data 要编码的数据
 * @param options 生成选项
 * @returns 根据type返回不同格式的结果
 */
export function qrcode(data: string | number | Buffer | number[], options: QROptions & { type: 'matrix' }): QRMatrix;
export function qrcode(data: string | number | Buffer | number[], options: QROptions & { type: 'svg' }): string;
export function qrcode(data: string | number | Buffer | number[], options: QROptions & { type: 'svg-compact' }): string;
export function qrcode(data: string | number | Buffer | number[], options: QROptions & { type: 'svg-data-url' }): string;
export function qrcode(data: string | number | Buffer | number[], options?: QROptions): string;
export function qrcode(data: string | number | Buffer | number[], options: QROptions = {}): QRMatrix | string {
  const {
    ecLevel = 'M',
    parseUrl = true,
    type = 'svg',
    svg: svgOptions = {}
  } = options;

  // 生成QR码矩阵
  const matrix = generateMatrix(data, ecLevel, parseUrl);

  // 根据输出类型返回相应结果
  switch (type) {
    case 'matrix':
      return matrix;
    
    case 'svg':
      return generateSVG(matrix, svgOptions);
    
    case 'svg-compact':
      return generateCompactSVG(matrix, svgOptions.margin, svgOptions.size);
    
    case 'svg-data-url':
      return generateSVGDataURL(matrix, svgOptions);
    
    default:
      return generateSVG(matrix, svgOptions);
  }
}

/**
 * 生成QR码矩阵
 * 
 * @param data 要编码的数据
 * @param ecLevel 纠错级别，默认为'M'
 * @param parseUrl 是否解析URL，默认为true
 * @returns QR码矩阵
 */
export function toMatrix(data: string | number | Buffer | number[], ecLevel: ECLevel = 'M', parseUrl: boolean = true): QRMatrix {
  return generateMatrix(data, ecLevel, parseUrl);
}

/**
 * 生成SVG格式的QR码
 * 
 * @param data 要编码的数据
 * @param options 生成选项
 * @returns SVG字符串
 */
export function toSVG(data: string | number | Buffer | number[], options: Omit<QROptions, 'type'> = {}): string {
  const {
    ecLevel = 'M',
    parseUrl = true,
    svg: svgOptions = {}
  } = options;

  const matrix = generateMatrix(data, ecLevel, parseUrl);
  return generateSVG(matrix, svgOptions);
}

/**
 * 生成紧凑SVG格式的QR码
 * 
 * @param data 要编码的数据
 * @param options 生成选项
 * @returns 紧凑SVG字符串
 */
export function toCompactSVG(data: string | number | Buffer | number[], options: Omit<QROptions, 'type'> = {}): string {
  const {
    ecLevel = 'M',
    parseUrl = true,
    svg: svgOptions = {}
  } = options;

  const matrix = generateMatrix(data, ecLevel, parseUrl);
  return generateCompactSVG(matrix, svgOptions.margin, svgOptions.size);
}

/**
 * 生成SVG数据URL格式的QR码
 * 
 * @param data 要编码的数据
 * @param options 生成选项
 * @returns SVG数据URL字符串
 */
export function toSVGDataURL(data: string | number | Buffer | number[], options: Omit<QROptions, 'type'> = {}): string {
  const {
    ecLevel = 'M',
    parseUrl = true,
    svg: svgOptions = {}
  } = options;

  const matrix = generateMatrix(data, ecLevel, parseUrl);
  return generateSVGDataURL(matrix, svgOptions);
}

/**
 * 获取QR码的SVG对象（仅路径数据）
 * 
 * @param data 要编码的数据
 * @param options 生成选项
 * @returns SVG对象，包含尺寸和路径
 */
export function toSVGObject(data: string | number | Buffer | number[], options: Omit<QROptions, 'type'> = {}) {
  const {
    ecLevel = 'M',
    parseUrl = true,
    svg: svgOptions = {}
  } = options;

  const matrix = generateMatrix(data, ecLevel, parseUrl);
  return svgObject(matrix, svgOptions.margin);
}

/**
 * 获取QR码信息（不生成实际输出）
 * 
 * @param data 要编码的数据
 * @param ecLevel 纠错级别，默认为'M'
 * @param parseUrl 是否解析URL，默认为true
 * @returns QR码信息
 */
export function getQRInfo(data: string | number | Buffer | number[], ecLevel: ECLevel = 'M', parseUrl: boolean = true) {
  const matrix = generateMatrix(data, ecLevel, parseUrl);
  
  // 计算统计信息
  const totalModules = matrix.length * matrix.length;
  const blackModules = matrix.flat().filter(cell => cell === 1).length;
  const whiteModules = totalModules - blackModules;
  
  return {
    version: Math.floor((matrix.length - 17) / 4), // 从矩阵尺寸反推版本
    ecLevel,
    matrixSize: matrix.length,
    totalModules,
    blackModules,
    whiteModules,
    blackPercentage: Math.round((blackModules / totalModules) * 100 * 100) / 100,
    estimatedSVGSize: matrix.length + 2 // 默认边距为1
  };
}

// 导出类型
export type { QRMatrix, ECLevel, SVGOptions };

// 默认导出主函数
export default qrcode;
