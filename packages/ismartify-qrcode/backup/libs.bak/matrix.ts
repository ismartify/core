/**
 * QR码矩阵生成和处理模块
 * 
 * 包含QR码矩阵的完整生成流程：
 * - 矩阵初始化
 * - 定位图案填充
 * - 对齐图案和时序图案
 * - 数据和纠错码填充
 * - 掩码应用和惩罚计算
 * - 格式和版本信息填充
 * 
 * 基于原始qr-image库的matrix.js实现
 */

/**
 * QR码数据结构接口
 */
export interface QRData {
  /** QR码版本 (1-40) */
  version: number;
  /** 纠错级别 */
  ec_level: string;
  /** 数据块数组 */
  blocks: Buffer[];
  /** 纠错码数组 */
  ec: Buffer[];
  /** 纠错码长度 */
  ec_len: number;
}

/**
 * QR码矩阵类型：二维数组，每个元素表示一个模块
 * 0 = 白色模块, 1 = 黑色模块
 * 0x80-0x8F = 功能图案（定位、对齐、时序等）
 */
export type QRMatrix = number[][];

/**
 * 初始化指定版本的QR码矩阵
 * @param version QR码版本 (1-40)
 * @returns 初始化的矩阵（全部填充为0）
 */
function initMatrix(version: number): QRMatrix {
  // QR码尺寸计算：N = version * 4 + 17
  const N = version * 4 + 17;
  const matrix: QRMatrix = [];
  
  // 创建N×N的矩阵，初始值全为0
  for (let i = 0; i < N; i++) {
    matrix[i] = new Array(N).fill(0);
  }
  
  return matrix;
}

/**
 * 在矩阵中填充定位图案（Finder Patterns）
 * 定位图案位于QR码的三个角落，用于扫描器定位
 * @param matrix QR码矩阵
 */
function fillFinders(matrix: QRMatrix): void {
  const N = matrix.length;
  
  // 在三个角落填充7×7的定位图案
  for (let i = -3; i <= 3; i++) {
    for (let j = -3; j <= 3; j++) {
      const max = Math.max(Math.abs(i), Math.abs(j));
      const min = Math.min(Math.abs(i), Math.abs(j));
      
      // 定位图案的像素值：外圈和中心为黑色(0x81)，中间圈为白色(0x80)
      const pixel = (max === 2 && min >= -2) || (min === -2 && max <= 2) ? 0x80 : 0x81;
      
      // 左上角定位图案
      matrix[3 + i][3 + j] = pixel;
      // 右上角定位图案
      matrix[3 + i][N - 4 + j] = pixel;
      // 左下角定位图案
      matrix[N - 4 + i][3 + j] = pixel;
    }
  }
  
  // 填充定位图案周围的分隔符（白色边框）
  for (let i = 0; i < 8; i++) {
    matrix[7][i] = matrix[i][7] = 0x80; // 左上角分隔符
    matrix[7][N - i - 1] = matrix[i][N - 8] = 0x80; // 右上角分隔符
    matrix[N - 8][i] = matrix[N - 1 - i][7] = 0x80; // 左下角分隔符
  }
}

/**
 * 填充对齐图案和时序图案
 * @param matrix QR码矩阵
 */
function fillAlignAndTiming(matrix: QRMatrix): void {
  const N = matrix.length;
  
  // 对于版本2及以上，需要填充对齐图案
  if (N > 21) {
    const len = N - 13;
    let delta = Math.round(len / Math.ceil(len / 28));
    if (delta % 2) delta++; // 确保delta为偶数
    
    const positions: number[] = [];
    // 计算对齐图案的位置
    for (let p = len + 6; p > 10; p -= delta) {
      positions.unshift(p);
    }
    positions.unshift(6);
    
    // 在计算出的位置填充5×5的对齐图案
    for (let i = 0; i < positions.length; i++) {
      for (let j = 0; j < positions.length; j++) {
        const x = positions[i];
        const y = positions[j];
        
        // 跳过已被定位图案占用的位置
        if (matrix[x][y]) continue;
        
        // 填充5×5对齐图案
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            const max = Math.max(Math.abs(r), Math.abs(c));
            const min = Math.min(Math.abs(r), Math.abs(c));
            
            // 对齐图案：外圈和中心为黑色，中间圈为白色
            const pixel = (max === 1 && min >= -1) || (min === -1 && max <= 1) ? 0x80 : 0x81;
            matrix[x + r][y + c] = pixel;
          }
        }
      }
    }
  }
  
  // 填充时序图案（水平和垂直的交替黑白线）
  for (let i = 8; i < N - 8; i++) {
    matrix[6][i] = matrix[i][6] = i % 2 ? 0x80 : 0x81;
  }
}

/**
 * 填充预留区域的占位符
 * @param matrix QR码矩阵
 */
function fillStub(matrix: QRMatrix): void {
  const N = matrix.length;
  
  // 填充格式信息区域的占位符
  for (let i = 0; i < 8; i++) {
    if (i !== 6) { // 跳过时序图案
      matrix[8][i] = matrix[i][8] = 0x80;
    }
    matrix[8][N - 1 - i] = 0x80;
    matrix[N - 1 - i][8] = 0x80;
  }
  
  matrix[8][8] = 0x80; // 中心暗模块
  matrix[N - 8][8] = 0x81; // 暗模块
  
  // 对于版本7及以上，填充版本信息区域
  if (N >= 45) {
    for (let i = N - 11; i < N - 8; i++) {
      for (let j = 0; j < 6; j++) {
        matrix[i][j] = matrix[j][i] = 0x80;
      }
    }
  }
}

/**
 * 填充格式信息和版本信息的实际数据
 */
const fillReserved = (() => {
  // 预计算格式信息编码
  const FORMATS = new Array(32);
  // 预计算版本信息编码
  const VERSIONS = new Array(40);
  
  // 格式信息的生成多项式和掩码
  const gf15 = 0x0537;
  const gf18 = 0x1f25;
  const formatsMask = 0x5412;
  
  // 计算所有可能的格式信息编码
  for (let format = 0; format < 32; format++) {
    let res = format << 10;
    for (let i = 5; i > 0; i--) {
      if (res >>> (9 + i)) {
        res = res ^ (gf15 << (i - 1));
      }
    }
    FORMATS[format] = (res | (format << 10)) ^ formatsMask;
  }
  
  // 计算版本7-40的版本信息编码
  for (let version = 7; version <= 40; version++) {
    let res = version << 12;
    for (let i = 6; i > 0; i--) {
      if (res >>> (11 + i)) {
        res = res ^ (gf18 << (i - 1));
      }
    }
    VERSIONS[version] = res | (version << 12);
  }
  
  // 纠错级别到数值的映射
  const EC_LEVELS: Record<string, number> = { L: 1, M: 0, Q: 3, H: 2 };
  
  return function fillReserved(matrix: QRMatrix, ecLevel: string, mask: number): void {
    const N = matrix.length;
    const format = FORMATS[EC_LEVELS[ecLevel] << 3 | mask];
    
    // 格式信息位提取函数
    const F = (k: number) => (format >> k & 1) ? 0x81 : 0x80;
    
    // 填充格式信息
    for (let i = 0; i < 8; i++) {
      matrix[8][N - 1 - i] = F(i);
      if (i < 6) matrix[i][8] = F(i);
    }
    for (let i = 8; i < 15; i++) {
      matrix[N - 15 + i][8] = F(i);
      if (i > 8) matrix[8][14 - i] = F(i);
    }
    matrix[7][8] = F(6);
    matrix[8][8] = F(7);
    matrix[8][7] = F(8);
    
    // 填充版本信息（版本7及以上）
    const version = VERSIONS[(N - 17) / 4];
    if (!version) return;
    
    const V = (k: number) => (version >> k & 1) ? 0x81 : 0x80;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        matrix[N - 11 + j][i] = matrix[i][N - 11 + j] = V(i * 3 + j);
      }
    }
  };
})();

/**
 * 数据填充和掩码应用
 */
const fillData = (() => {
  // 8种掩码函数
  const MASK_FUNCTIONS = [
    (i: number, j: number) => (i + j) % 2 === 0,
    (i: number, j: number) => i % 2 === 0,
    (i: number, j: number) => j % 3 === 0,
    (i: number, j: number) => (i + j) % 3 === 0,
    (i: number, j: number) => (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0,
    (i: number, j: number) => (i * j) % 2 + (i * j) % 3 === 0,
    (i: number, j: number) => ((i * j) % 2 + (i * j) % 3) % 2 === 0,
    (i: number, j: number) => ((i * j) % 3 + (i + j) % 2) % 2 === 0
  ];
  
  return function fillData(matrix: QRMatrix, data: QRData, mask: number): void {
    const N = matrix.length;
    let row = N - 1;
    let col = N - 1;
    let dir = -1; // 方向：-1向上，1向下
    
    const maskFn = MASK_FUNCTIONS[mask];
    const maxBlockLength = Math.max(...data.blocks.map(block => block.length));
    
    // 填充数据块
    for (let i = 0; i < maxBlockLength; i++) {
      for (let b = 0; b < data.blocks.length; b++) {
        if (data.blocks[b].length <= i) continue;
        putByte(data.blocks[b][i]);
      }
    }
    
    // 填充纠错码
    for (let i = 0; i < data.ec_len; i++) {
      for (let b = 0; b < data.ec.length; b++) {
        if (data.ec[b].length <= i) continue;
        putByte(data.ec[b][i]);
      }
    }
    
    // 填充剩余位置
    if (col > -1) {
      do {
        matrix[row][col] = maskFn(row, col) ? 1 : 0;
      } while (next());
    }
    
    // 放置一个字节的数据
    function putByte(byte: number): void {
      for (let mask = 0x80; mask; mask = mask >> 1) {
        let pixel = !!(mask & byte);
        if (maskFn(row, col)) pixel = !pixel;
        matrix[row][col] = pixel ? 1 : 0;
        next();
      }
    }
    
    // 移动到下一个可用位置
    function next(): boolean {
      do {
        if ((col % 2) ^ (col < 6 ? 1 : 0)) {
          if ((dir < 0 && row === 0) || (dir > 0 && row === N - 1)) {
            col--;
            dir = -dir;
          } else {
            col++;
            row += dir;
          }
        } else {
          col--;
        }
        
        // 跳过时序列
        if (col === 6) col--;
        
        if (col < 0) return false;
      } while (matrix[row][col] & 0xf0); // 跳过功能图案
      
      return true;
    }
  };
})();

/**
 * 计算掩码的惩罚分数
 * 分数越低，掩码效果越好
 * @param matrix QR码矩阵
 * @returns 惩罚分数
 */
function calculatePenalty(matrix: QRMatrix): number {
  const N = matrix.length;
  let penalty = 0;
  
  // 规则1：连续相同颜色的模块
  // 水平方向检查
  for (let i = 0; i < N; i++) {
    let pixel = matrix[i][0] & 1;
    let len = 1;
    for (let j = 1; j < N; j++) {
      const p = matrix[i][j] & 1;
      if (p === pixel) {
        len++;
        continue;
      }
      if (len >= 5) {
        penalty += len - 2;
      }
      pixel = p;
      len = 1;
    }
    if (len >= 5) {
      penalty += len - 2;
    }
  }
  
  // 垂直方向检查
  for (let j = 0; j < N; j++) {
    let pixel = matrix[0][j] & 1;
    let len = 1;
    for (let i = 1; i < N; i++) {
      const p = matrix[i][j] & 1;
      if (p === pixel) {
        len++;
        continue;
      }
      if (len >= 5) {
        penalty += len - 2;
      }
      pixel = p;
      len = 1;
    }
    if (len >= 5) {
      penalty += len - 2;
    }
  }
  
  // 规则2：2×2的相同颜色块
  for (let i = 0; i < N - 1; i++) {
    for (let j = 0; j < N - 1; j++) {
      const s = (matrix[i][j] + matrix[i][j + 1] + matrix[i + 1][j] + matrix[i + 1][j + 1]) & 7;
      if (s === 0 || s === 4) {
        penalty += 3;
      }
    }
  }
  
  // 规则3：特定的图案（类似定位图案的序列）
  const I = (k: number, i: number, j: number) => matrix[i][j + k] & 1;
  const J = (k: number, i: number, j: number) => matrix[i + k][j] & 1;
  
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 水平方向检查图案 1011101
      if (j < N - 6 && I(0,i,j) && !I(1,i,j) && I(2,i,j) && I(3,i,j) && I(4,i,j) && !I(5,i,j) && I(6,i,j)) {
        if (j >= 4 && !(I(-4,i,j) || I(-3,i,j) || I(-2,i,j) || I(-1,i,j))) {
          penalty += 40;
        }
        if (j < N - 10 && !(I(7,i,j) || I(8,i,j) || I(9,i,j) || I(10,i,j))) {
          penalty += 40;
        }
      }
      
      // 垂直方向检查图案 1011101
      if (i < N - 6 && J(0,i,j) && !J(1,i,j) && J(2,i,j) && J(3,i,j) && J(4,i,j) && !J(5,i,j) && J(6,i,j)) {
        if (i >= 4 && !(J(-4,i,j) || J(-3,i,j) || J(-2,i,j) || J(-1,i,j))) {
          penalty += 40;
        }
        if (i < N - 10 && !(J(7,i,j) || J(8,i,j) || J(9,i,j) || J(10,i,j))) {
          penalty += 40;
        }
      }
    }
  }
  
  // 规则4：暗模块比例
  let numDark = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (matrix[i][j] & 1) numDark++;
    }
  }
  penalty += 10 * Math.floor(Math.abs(10 - 20 * numDark / (N * N)));
  
  return penalty;
}

/**
 * 生成完整的QR码矩阵
 * 这是主要的入口函数，整合了所有步骤
 * @param data QR码数据
 * @returns 最终的QR码矩阵
 */
export function getMatrix(data: QRData): QRMatrix {
  // 1. 初始化矩阵
  const matrix = initMatrix(data.version);
  
  // 2. 填充功能图案
  fillFinders(matrix);
  fillAlignAndTiming(matrix);
  fillStub(matrix);
  
  // 3. 尝试所有8种掩码，选择惩罚分数最低的
  let penalty = Infinity;
  let bestMask = 0;
  
  for (let mask = 0; mask < 8; mask++) {
    // 创建矩阵副本进行测试
    const testMatrix = matrix.map(row => [...row]);
    fillData(testMatrix, data, mask);
    fillReserved(testMatrix, data.ec_level, mask);
    
    const p = calculatePenalty(testMatrix);
    if (p < penalty) {
      penalty = p;
      bestMask = mask;
    }
  }
  
  // 4. 使用最佳掩码生成最终矩阵
  fillData(matrix, data, bestMask);
  fillReserved(matrix, data.ec_level, bestMask);
  
  // 5. 转换为最终格式（只保留0和1）
  return matrix.map(row => 
    row.map(cell => cell & 1)
  );
}

// 导出所有主要函数供测试使用
export {
  initMatrix,
  fillFinders,
  fillAlignAndTiming,
  fillStub,
  fillReserved,
  fillData,
  calculatePenalty
};
