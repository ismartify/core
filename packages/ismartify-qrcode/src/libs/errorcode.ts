/**
 * Reed-Solomon 纠错码计算模块
 * 基于伽罗华域(GF(256))数学运算
 * 
 * 用于 QR 码的错误检测和纠正功能
 * 基于原始 qr-image 库的 errorcode.js 实现
 */

// 伽罗华域 GF(256) 的基础多项式：x^8 + x^4 + x^3 + x^2 + 1 = 285
const GF256_BASE = 285;

// 指数表：存储 α^i 的值，其中 α 是 GF(256) 的原根
const EXP_TABLE: number[] = [1];

// 对数表：存储 log_α(i) 的值，用于快速查找
const LOG_TABLE: number[] = [];

// 初始化伽罗华域的指数表和对数表
(() => {
  // 生成指数表：EXP_TABLE[i] = α^i mod GF256_BASE
  for (let i = 1; i < 256; i++) {
    let n = EXP_TABLE[i - 1] << 1; // 乘以 α (左移一位)
    if (n > 255) {
      n = n ^ GF256_BASE; // 如果超出8位，则模GF256_BASE
    }
    EXP_TABLE[i] = n;
  }

  // 生成对数表：LOG_TABLE[α^i] = i
  for (let i = 0; i < 255; i++) {
    LOG_TABLE[EXP_TABLE[i]] = i;
  }
})();

/**
 * 计算伽罗华域中的指数运算：α^k
 * @param k 指数值
 * @returns α^k 在 GF(256) 中的值
 */
const exp = (k: number): number => {
  // 将指数规范化到[0, 255)范围内
  while (k < 0) k += 255;
  while (k > 255) k -= 255;
  return EXP_TABLE[k];
}

/**
 * 计算伽罗华域中的对数运算：log_α(k)
 * @param k 要计算对数的值 (1-255)
 * @returns log_α(k) 的值
 * @throws 如果 k 不在有效范围内则抛出错误
 */
const log = (k: number): number => {
  if (k < 1 || k > 255) {
    throw new Error(`无效的对数参数: log(${k})，参数必须在1-255范围内`);
  }
  return LOG_TABLE[k];
}

// 生成多项式缓存：存储已计算的生成多项式
const POLYNOMIALS: number[][] = [
  [0], // α^0 * x^0 (度数为0的多项式)
  [0, 0], // α^0 * x^1 + α^0 * x^0 (度数为1的多项式)
  [0, 25, 1], // α^0 * x^2 + α^25 * x^1 + α^1 * x^0 (度数为2的多项式)
  // 更高度数的多项式将动态生成
];

/**
 * 生成 Reed-Solomon 编码的生成多项式
 * 生成多项式 g(x) = (x - α^0)(x - α^1)...(x - α^(num-1))
 * 
 * @param num 纠错码字数量（生成多项式的度数）
 * @returns 生成多项式的系数数组（指数形式）
 */
const generatorPolynomial = (num: number): number[] => {
  // 如果已经计算过，直接返回缓存结果
  if (POLYNOMIALS[num]) {
    return POLYNOMIALS[num];
  }

  // 递归计算：g_n(x) = g_(n-1)(x) * (x - α^(n-1))
  const prev = generatorPolynomial(num - 1);
  const res: number[] = [];

  // 第一项系数保持不变
  res[0] = prev[0];

  // 计算其他系数：新系数 = log( exp(prev[i]) ^ exp(prev[i-1] + num - 1) )
  for (let i = 1; i <= num; i++) {
    const prevCoeff = prev[i];
    const prevCoeffMinus1 = prev[i - 1];

    // 在 GF(256) 中进行乘法和加法运算（与原始 JS 完全一致）
    const result = exp(prevCoeff) ^ exp(prevCoeffMinus1 + num - 1);
    res[i] = log(result);
  }

  // 缓存结果
  POLYNOMIALS[num] = res;
  // console.log(`generatorPolynomial(${num}):`, res);
  return res;
}

/**
 * 计算 Reed-Solomon 纠错码
 * 使用多项式长除法计算消息多项式除以生成多项式的余式
 * 
 * @param msg 原始消息数据（可以是 Buffer 或数组）
 * @param ecLen 纠错码长度
 * @returns 纠错码 Buffer
 */
export const calculateErrorCode = (msg: Buffer | number[], ecLen: number): Buffer => {
  // 将消息转换为数组格式以便处理
  const message: number[] = Array.from(msg);

  // 获取对应长度的生成多项式
  const poly = generatorPolynomial(ecLen);

  // 在消息后添加ecLen个0，为纠错码预留空间
  for (let i = 0; i < ecLen; i++) {
    message.push(0);
  }

  // 执行多项式长除法
  while (message.length > ecLen) {
    // 如果最高位系数为0，直接移除
    if (!message[0]) {
      message.shift();
      continue;
    }

    // 计算当前最高位的对数
    const logK = log(message[0]);

    // 用生成多项式消除最高位
    for (let i = 0; i <= ecLen; i++) {
      message[i] = message[i] ^ exp(poly[i] + logK);
    }

    // 移除已处理的最高位
    message.shift();
  }

  // 返回余式作为纠错码
  return Buffer.from(message);
}

/**
 * 默认导出纠错码计算函数（保持向后兼容）
 */
export default calculateErrorCode;
