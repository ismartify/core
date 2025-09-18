/**
 * QR Code encoding functions
 * Based on the original qr-image library implementation
 * 
 * Supports multiple encoding modes:
 * - Numeric: digits only (0-9)
 * - Alphanumeric: digits, uppercase letters, and specific symbols
 * - 8-bit byte: any data
 * - URL: special handling for HTTP/HTTPS URLs
 */

/**
 * Encoded data result for different QR code versions
 */
interface EncodedData {
  /** Data for version 1 (21x21) */
  data1?: number[];
  /** Data for version 10 (57x57) */
  data10?: number[];
  /** Data for version 27 (125x125) */
  data27: number[];
}

/**
 * Push bits to array in big-endian order
 * @param arr Target array to push bits to
 * @param n Number of bits to push
 * @param value Value to convert to bits
 */
function pushBits(arr: number[], n: number, value: number): void {
  for (let bit = 1 << (n - 1); bit; bit = bit >>> 1) {
    arr.push(bit & value ? 1 : 0);
  }
}

/**
 * Encode data as 8-bit bytes
 * @param data Buffer data to encode
 * @returns Encoded data for different QR versions
 */
function encode8bit(data: Buffer): EncodedData {
  const len = data.length;
  const bits: number[] = [];

  for (let i = 0; i < len; i++) {
    pushBits(bits, 8, data[i]);
  }

  const res: EncodedData = {} as EncodedData;

  // Mode indicator: 0100 (8-bit byte mode)
  const d27 = [0, 1, 0, 0];
  pushBits(d27, 16, len); // Character count for version 27
  res.data27 = d27.concat(bits);
  res.data10 = res.data27; // Same format for version 10

  if (len < 256) {
    const d1 = [0, 1, 0, 0];
    pushBits(d1, 8, len); // Character count for version 1
    res.data1 = d1.concat(bits);
  }

  return res;
}

/**
 * Alphanumeric character mapping
 * Maps characters to their alphanumeric encoding values
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
 * Encode string using alphanumeric mode
 * @param str String to encode (must contain only alphanumeric characters)
 * @returns Encoded data for different QR versions
 */
function encodeAlphanum(str: string): EncodedData {
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

  // Mode indicator: 0010 (alphanumeric mode)
  const d27 = [0, 0, 1, 0];
  pushBits(d27, 13, len); // Character count for version 27
  res.data27 = d27.concat(bits);

  if (len < 2048) {
    const d10 = [0, 0, 1, 0];
    pushBits(d10, 11, len); // Character count for version 10
    res.data10 = d10.concat(bits);
  }

  if (len < 512) {
    const d1 = [0, 0, 1, 0];
    pushBits(d1, 9, len); // Character count for version 1
    res.data1 = d1.concat(bits);
  }

  return res;
}

/**
 * Encode string using numeric mode
 * @param str Numeric string to encode (digits only)
 * @returns Encoded data for different QR versions
 */
function encodeNumeric(str: string): EncodedData {
  const len = str.length;
  const bits: number[] = [];

  for (let i = 0; i < len; i += 3) {
    const s = str.substr(i, 3);
    const b = Math.ceil(s.length * 10 / 3);
    pushBits(bits, b, parseInt(s, 10));
  }

  const res: EncodedData = {} as EncodedData;

  // Mode indicator: 0001 (numeric mode)
  const d27 = [0, 0, 0, 1];
  pushBits(d27, 14, len); // Character count for version 27
  res.data27 = d27.concat(bits);

  if (len < 4096) {
    const d10 = [0, 0, 0, 1];
    pushBits(d10, 12, len); // Character count for version 10
    res.data10 = d10.concat(bits);
  }

  if (len < 1024) {
    const d1 = [0, 0, 0, 1];
    pushBits(d1, 10, len); // Character count for version 1
    res.data1 = d1.concat(bits);
  }

  return res;
}

/**
 * Encode URL with special handling for HTTP/HTTPS URLs
 * @param str URL string to encode
 * @returns Encoded data for different QR versions
 */
function encodeUrl(str: string): EncodedData {
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
}

/**
 * Choose appropriate encoding mode and generate data for different QR versions
 * @param data Input data (string, number, Buffer, or number array)
 * @param parseUrl Whether to parse URLs specially (default: true)
 * @returns Encoded data for different QR versions
 */
export function encode(data: string | number | Buffer | number[], parseUrl: boolean = true): EncodedData {
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

  // Try numeric encoding first (most efficient)
  if (/^[0-9]+$/.test(str)) {
    if (buffer.length > 7089) {
      throw new Error("Too much data");
    }
    return encodeNumeric(str);
  }

  // Try alphanumeric encoding
  if (/^[0-9A-Z \$%\*\+\.\/\:\-]+$/.test(str)) {
    if (buffer.length > 4296) {
      throw new Error("Too much data");
    }
    return encodeAlphanum(str);
  }

  // Special URL handling (must come before 8-bit check)
  if (parseUrl && /^https?:/i.test(str)) {
    return encodeUrl(str);
  }

  // Fall back to 8-bit byte encoding
  if (buffer.length > 2953) {
    throw new Error("Too much data");
  }
  return encode8bit(buffer);
}

export default encode;
