/**
 * CRC32 implementation using Buffer operations for ARM architecture
 * This is a fallback implementation for ARM processors that may have
 * issues with bitwise operations in JavaScript
 * 
 * Based on the original qr-image library crc32buffer.js
 */

// CRC table using Buffer operations
const crcTable: Buffer[] = [];

// Initialize CRC table using Buffer operations
for (let n = 0; n < 256; n++) {
  const c = Buffer.alloc(4);
  c.writeUInt32BE(n, 0);

  for (let k = 0; k < 8; k++) {
    const b0 = c[0] & 1;
    const b1 = c[1] & 1;
    const b2 = c[2] & 1;
    const b3 = c[3] & 1;

    c[0] = (c[0] >> 1) ^ (b3 ? 0xed : 0);
    c[1] = (c[1] >> 1) ^ (b3 ? 0xb8 : 0) ^ (b0 ? 0x80 : 0);
    c[2] = (c[2] >> 1) ^ (b3 ? 0x83 : 0) ^ (b1 ? 0x80 : 0);
    c[3] = (c[3] >> 1) ^ (b3 ? 0x20 : 0) ^ (b2 ? 0x80 : 0);
  }

  crcTable[n] = c;
}

/**
 * Update CRC using Buffer operations
 * @param c Current CRC buffer (4 bytes)
 * @param buf Buffer to process
 */
function update(c: Buffer, buf: Buffer): void {
  const l = buf.length;
  for (let n = 0; n < l; n++) {
    const e = crcTable[c[3] ^ buf[n]];
    c[3] = e[3] ^ c[2];
    c[2] = e[2] ^ c[1];
    c[1] = e[1] ^ c[0];
    c[0] = e[0];
  }
}

/**
 * Calculate CRC32 checksum using Buffer operations (ARM-safe version)
 * @param data Data to calculate CRC32 for (can be string, Buffer, or number array)
 * @returns CRC32 checksum as unsigned 32-bit integer
 */
export function crc32Buffer(data: string | Buffer | number[]): number;
export function crc32Buffer(...data: (string | Buffer | number[])[]): number;
export function crc32Buffer(...args: (string | Buffer | number[])[]): number {
  const c = Buffer.alloc(4);
  c.fill(0xff);

  for (const arg of args) {
    const buf = Buffer.isBuffer(arg) ? arg : Buffer.from(arg);
    update(c, buf);
  }

  c[0] = c[0] ^ 0xff;
  c[1] = c[1] ^ 0xff;
  c[2] = c[2] ^ 0xff;
  c[3] = c[3] ^ 0xff;

  return c.readUInt32BE(0);
}

export default crc32Buffer;
