/**
 * CRC32 实现，用于 QR 码生成
 * 基于原始 qr-image 库实现
 * 
 * 注意：ARMv6 (Raspberry Pi) 在位运算中有 bug
 * https://code.google.com/p/v8/issues/detail?id=3757
 * https://github.com/alexeyten/qr-image/issues/13
 * 
 * 对于遗留的 ARM 架构 (ARMv6)，我们提供基于 Buffer 的实现作为后备。
 * 现代 ARM64 (Apple Silicon M1/M2/M3) 没有这些问题，使用标准实现。
 */

import { crc32Buffer } from './crc32buffer';

// 检查是否在 ARM 架构上运行（特别是 ARMv6，有位运算 bug）
// 现代 ARM64 (Apple Silicon) 没有这些问题
const isARM = process.arch === 'arm';

// 多项式 0xedb88320 的 CRC 表（仅用于非 ARM）
const crcTable: number[] = [];

// 初始化 CRC 表（仅用于非 ARM）
if (!isARM) {
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) {
        c = 0xedb88320 ^ (c >>> 1);
      } else {
        c = c >>> 1;
      }
    }
    crcTable[n] = c >>> 0;
  }
}

/**
 * 使用缓冲区数据更新 CRC（非 ARM 实现）
 * @param c 当前 CRC 值
 * @param buf 要处理的缓冲区
 * @returns 更新后的 CRC 值
 */
const update = (c: number, buf: Buffer): number => {
  const l = buf.length;
  for (let n = 0; n < l; n++) {
    c = crcTable[(c ^ buf[n]) & 0xff] ^ (c >>> 8);
  }
  return c;
}

/**
 * 使用位运算的标准 CRC32 实现
 * @param args 要计算 CRC32 的数据
 * @returns CRC32 校验和，作为无符号 32 位整数
 */
const crc32Standard = (...args: (string | Buffer | number[])[]): number => {
  let c = -1;
  
  for (const arg of args) {
    const buf = Buffer.isBuffer(arg) ? arg : Buffer.from(arg);
    c = update(c, buf);
  }
  
  c = (c ^ -1) >>> 0;
  return c;
}

/**
 * 计算给定数据的 CRC32 校验和
 * 根据架构自动选择合适的实现
 * @param data 要计算 CRC32 的数据（可以是字符串、缓冲区或数字数组）
 * @returns CRC32 校验和，作为无符号 32 位整数
 */
export const crc32 = (...args: (string | Buffer | number[])[]): number => {
  // ARM 使用基于缓冲区的实现，其他使用标准实现
  return isARM ? crc32Buffer(...args) : crc32Standard(...args);
}

export default crc32;
