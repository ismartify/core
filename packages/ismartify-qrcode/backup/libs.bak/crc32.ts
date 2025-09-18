/**
 * CRC32 implementation for QR code generation
 * Based on the original qr-image library implementation
 * 
 * Note: ARMv6 (Raspberry Pi) has bug in bitwise operations
 * https://code.google.com/p/v8/issues/detail?id=3757
 * https://github.com/alexeyten/qr-image/issues/13
 * 
 * For legacy ARM architecture (ARMv6), we provide a Buffer-based implementation as fallback.
 * Modern ARM64 (Apple Silicon M1/M2/M3) doesn't have these issues and uses the standard implementation.
 */

import { crc32Buffer } from './crc32buffer';

// Check if we're running on ARM architecture (specifically ARMv6 which has bitwise operation bugs)
// Modern ARM64 (Apple Silicon) doesn't have these issues
const isARM = process.arch === 'arm';

// CRC table for polynomial 0xedb88320 (only used for non-ARM)
const crcTable: number[] = [];

// Initialize CRC table (only for non-ARM)
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
 * Update CRC with buffer data (non-ARM implementation)
 * @param c Current CRC value
 * @param buf Buffer to process
 * @returns Updated CRC value
 */
function update(c: number, buf: Buffer): number {
  const l = buf.length;
  for (let n = 0; n < l; n++) {
    c = crcTable[(c ^ buf[n]) & 0xff] ^ (c >>> 8);
  }
  return c;
}

/**
 * Standard CRC32 implementation using bitwise operations
 * @param args Data to calculate CRC32 for
 * @returns CRC32 checksum as unsigned 32-bit integer
 */
function crc32Standard(...args: (string | Buffer | number[])[]): number {
  let c = -1;
  
  for (const arg of args) {
    const buf = Buffer.isBuffer(arg) ? arg : Buffer.from(arg);
    c = update(c, buf);
  }
  
  c = (c ^ -1) >>> 0;
  return c;
}

/**
 * Calculate CRC32 checksum for given data
 * Automatically chooses the appropriate implementation based on architecture
 * @param data Data to calculate CRC32 for (can be string, Buffer, or number array)
 * @returns CRC32 checksum as unsigned 32-bit integer
 */
export function crc32(data: string | Buffer | number[]): number;
export function crc32(...data: (string | Buffer | number[])[]): number;
export function crc32(...args: (string | Buffer | number[])[]): number {
  // Use buffer-based implementation for ARM, standard implementation for others
  return isARM ? crc32Buffer(...args) : crc32Standard(...args);
}

export default crc32;
