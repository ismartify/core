/**
 * QR 码编码函数
 * 基于原始 qr-image 库实现
 *
 * 支持多种编码模式：
 * - 数字模式：仅数字（0-9）
 * - 字母数字模式：数字、大写字母和特定符号
 * - 8位字节模式：任意数据
 * - URL模式：HTTP/HTTPS URL 的特殊处理
 */

/**
 * 不同 QR 码版本的编码数据结果
 */
interface EncodedData {
  /** 版本 1 (21x21) 的数据 */
  data1?: number[];
  /** 版本 10 (57x57) 的数据 */
  data10?: number[];
  /** 版本 27 (125x125) 的数据 */
  data27: number[];
}

/**
 * 以大端序将位推送到数组中
 * @param arr 目标数组，用于推入位
 * @param n 要推入的位数
 * @param value 要转换为位的值
 */
const pushBits = (arr: number[], n: number, value: number): void => {
  for (let bit = 1 << (n - 1); bit; bit = bit >>> 1) {
    arr.push(bit & value ? 1 : 0);
  }
};

/**
 * 将数据编码为 8 位字节
 * @param data 要编码的缓冲区数据
 * @returns 不同 QR 版本的编码数据
 */
const encode8bit = (data: Buffer): EncodedData => {
  const len = data.length;
  const bits: number[] = [];

  for (let i = 0; i < len; i++) {
    pushBits(bits, 8, data[i]);
  }

  const res: EncodedData = {} as EncodedData;

  // 模式指示符：0100 (8 位字节模式)
  const d27 = [0, 1, 0, 0];
  pushBits(d27, 16, len); // 版本 27 的字符计数
  res.data27 = d27.concat(bits);
  res.data10 = res.data27; // 版本 10 格式相同

  if (len < 256) {
    const d1 = [0, 1, 0, 0];
    pushBits(d1, 8, len); // 版本 1 的字符计数
    res.data1 = d1.concat(bits);
  }

  return res;
};

/**
 * 字母数字字符映射
 * 将字符映射到字母数字编码值
 */
const ALPHANUM = (() => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';
  const res: Record<string, number> = {};
  for (let i = 0; i < chars.length; i++) {
    res[chars[i]] = i;
  }
  return res;
})();

/**
 * 使用字母数字模式编码字符串
 * @param str 要编码的字符串（必须仅包含字母数字字符）
 * @returns 不同 QR 版本的编码数据
 */
const encodeAlphanum = (str: string): EncodedData => {
  const len = str.length;
  const bits: number[] = [];

  for (let i = 0; i < len; i += 2) {
    let b = 6;
    let n = ALPHANUM[str[i]];
    if (str[i + 1]) {
      b = 11;
      n = n * 45 + ALPHANUM[str[i + 1]];
    }
    pushBits(bits, b, n);
  }

  const res: EncodedData = {} as EncodedData;

  // 模式指示符：0010 (字母数字模式)
  const d27 = [0, 0, 1, 0];
  pushBits(d27, 13, len); // 版本 27 的字符计数
  res.data27 = d27.concat(bits);

  if (len < 2048) {
    const d10 = [0, 0, 1, 0];
    pushBits(d10, 11, len); // 版本 10 的字符计数
    res.data10 = d10.concat(bits);
  }

  if (len < 512) {
    const d1 = [0, 0, 1, 0];
    pushBits(d1, 9, len); // 版本 1 的字符计数
    res.data1 = d1.concat(bits);
  }

  return res;
};

/**
 * 使用数字模式编码字符串
 * @param str 要编码的数字字符串（仅数字）
 * @returns 不同 QR 版本的编码数据
 */
const encodeNumeric = (str: string): EncodedData => {
  const len = str.length;
  const bits: number[] = [];

  for (let i = 0; i < len; i += 3) {
    const s = str.substr(i, 3);
    const b = Math.ceil(s.length * 10 / 3);
    pushBits(bits, b, parseInt(s, 10));
  }

  const res: EncodedData = {} as EncodedData;

  // 模式指示符：0001 (数字模式)
  const d27 = [0, 0, 0, 1];
  pushBits(d27, 14, len); // 版本 27 的字符计数
  res.data27 = d27.concat(bits);

  if (len < 4096) {
    const d10 = [0, 0, 0, 1];
    pushBits(d10, 12, len); // 版本 10 的字符计数
    res.data10 = d10.concat(bits);
  }

  if (len < 1024) {
    const d1 = [0, 0, 0, 1];
    pushBits(d1, 10, len); // 版本 1 的字符计数
    res.data1 = d1.concat(bits);
  }

  return res;
};

/**
 * 对 URL 进行特殊处理编码
 * @param str 要编码的 URL 字符串
 * @returns 不同 QR 版本的编码数据
 */
const encodeUrl = (str: string): EncodedData => {
  const slash = str.indexOf('/', 8) + 1 || str.length;
  const res = encode(str.slice(0, slash).toUpperCase(), false);

  if (slash >= str.length) {
    return res;
  }

  const pathRes = encode(str.slice(slash), false);

  res.data27 = res.data27.concat(pathRes.data27);

  if (res.data10 && pathRes.data10) {
    res.data10 = res.data10.concat(pathRes.data10);
  }

  if (res.data1 && pathRes.data1) {
    res.data1 = res.data1.concat(pathRes.data1);
  }

  return res;
};

/**
 * 选择合适的编码模式并为不同 QR 版本生成数据
 * @param data 输入数据（字符串、数字、缓冲区或数字数组）
 * @param parseUrl 是否对 URL 进行特殊解析（默认为 true）
 * @returns 不同 QR 版本的编码数据
 */
export const encode = (data: string | number | Buffer | number[], parseUrl: boolean = true): EncodedData => {
  let str: string;
  let buffer: Buffer;
  const dataType = typeof data;

  if (dataType === 'string' || dataType === 'number') {
    str = String(data);
    buffer = Buffer.from(str);
  } else if (Buffer.isBuffer(data)) {
    buffer = data;
    str = data.toString();
  } else if (Array.isArray(data)) {
    buffer = Buffer.from(data);
    str = buffer.toString();
  } else {
    throw new Error("Bad data");
  }

  // 首先尝试数字编码（最高效）
  if (/^[0-9]+$/.test(str)) {
    if (buffer.length > 7089) {
      throw new Error("Too much data");
    }
    return encodeNumeric(str);
  }

  // 尝试字母数字编码
  if (/^[0-9A-Z \$%\*\+\.\/\:\-]+$/.test(str)) {
    if (buffer.length > 4296) {
      throw new Error("Too much data");
    }
    return encodeAlphanum(str);
  }

  // 特殊 URL 处理（必须在 8 位检查之前）
  if (parseUrl && /^https?:/i.test(str)) {
    return encodeUrl(str);
  }

  // 回退到 8 位字节编码
  if (buffer.length > 2953) {
    throw new Error("Too much data");
  }
  return encode8bit(buffer);
};

export default encode;
