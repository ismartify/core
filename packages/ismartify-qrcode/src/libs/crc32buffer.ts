/**
 * 使用 Buffer 操作的 CRC32 实现，针对 ARM 架构
 * 这是针对可能在 JavaScript 中有位运算问题的 ARM 处理器的后备实现
 * 
 * 基于原始 qr-image 库的 crc32buffer.js
 */

// 使用 Buffer 操作的 CRC 表
const crcTable: Buffer[] = [];

// 使用 Buffer 操作初始化 CRC 表
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
 * 使用 Buffer 操作更新 CRC
 * @param c 当前 CRC 缓冲区（4 字节）
 * @param buf 要处理的缓冲区
 */
const update = (c: Buffer, buf: Buffer): void => {
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
 * 使用 Buffer 操作计算 CRC32 校验和（ARM 安全版本）
 * @param data 要计算 CRC32 的数据（可以是字符串、缓冲区或数字数组）
 * @returns CRC32 校验和，作为无符号 32 位整数
 */
export const crc32Buffer = (...args: (string | Buffer | number[])[]): number => {
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
};

export default crc32Buffer;
