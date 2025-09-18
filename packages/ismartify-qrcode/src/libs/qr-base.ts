/**
 * QR码核心逻辑模块
 * 
 * 整合编码、纠错码计算和矩阵生成的完整流程
 * 包含版本选择、数据模板填充等核心算法
 * 
 * 基于原始qr-image库的qr-base.js实现
 */

import { encode } from './encode';

/**
 * 编码数据接口（从encode模块复制）
 */
interface EncodedData {
  /** 版本1数据 */
  data1?: number[];
  /** 版本10数据 */
  data10?: number[];
  /** 版本27数据 */
  data27: number[];
}
import { calculateErrorCode } from './errorcode';
import { getMatrix, type QRMatrix, type QRData } from './matrix';

/**
 * 深拷贝对象
 * @param obj 要拷贝的对象
 * @returns 深拷贝后的对象
 */
function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * QR码纠错级别
 */
export const EC_LEVELS = ['L', 'M', 'Q', 'H'] as const;
export type ECLevel = typeof EC_LEVELS[number];

/**
 * 版本配置接口
 */
interface VersionConfig {
  /** 版本号 (1-40) */
  version: number;
  /** 纠错级别 */
  ec_level: ECLevel;
  /** 数据长度（字节） */
  data_len: number;
  /** 纠错码长度（字节） */
  ec_len: number;
  /** 数据块分割 */
  blocks: number[];
  /** 纠错码块（将被填充） */
  ec: Buffer[];
}

/**
 * 版本配置数据表
 * 格式：[总码字数, L级别纠错码字数, L级别块数, M级别纠错码字数, M级别块数, Q级别纠错码字数, Q级别块数, H级别纠错码字数, H级别块数]
 */
const versionsRaw = [
  [], // 版本0不存在
  // 版本1-40的配置数据
  [26, 7, 1, 10, 1, 13, 1, 17, 1],          // 版本1
  [44, 10, 1, 16, 1, 22, 1, 28, 1],         // 版本2
  [70, 15, 1, 26, 1, 36, 2, 44, 2],         // 版本3
  [100, 20, 1, 36, 2, 52, 2, 64, 4],        // 版本4
  [134, 26, 1, 48, 2, 72, 4, 88, 4],        // 版本5
  [172, 36, 2, 64, 4, 96, 4, 112, 4],       // 版本6
  [196, 40, 2, 72, 4, 108, 6, 130, 5],      // 版本7
  [242, 48, 2, 88, 4, 132, 6, 156, 6],      // 版本8
  [292, 60, 2, 110, 5, 160, 8, 192, 8],     // 版本9
  [346, 72, 4, 130, 5, 192, 8, 224, 8],     // 版本10
  [404, 80, 4, 150, 5, 224, 8, 264, 11],    // 版本11
  [466, 96, 4, 176, 8, 260, 10, 308, 11],   // 版本12
  [532, 104, 4, 198, 9, 288, 12, 352, 16],  // 版本13
  [581, 120, 4, 216, 9, 320, 16, 384, 16],  // 版本14
  [655, 132, 6, 240, 10, 360, 12, 432, 18], // 版本15
  [733, 144, 6, 280, 10, 408, 17, 480, 16], // 版本16
  [815, 168, 6, 308, 11, 448, 16, 532, 19], // 版本17
  [901, 180, 6, 338, 13, 504, 18, 588, 21], // 版本18
  [991, 196, 7, 364, 14, 546, 21, 650, 25], // 版本19
  [1085, 224, 8, 416, 16, 600, 20, 700, 25], // 版本20
  [1156, 224, 8, 442, 17, 644, 23, 750, 25], // 版本21
  [1258, 252, 9, 476, 17, 690, 23, 816, 34], // 版本22
  [1364, 270, 9, 504, 18, 750, 25, 900, 30], // 版本23
  [1474, 300, 10, 560, 20, 810, 27, 960, 32], // 版本24
  [1588, 312, 12, 588, 21, 870, 29, 1050, 35], // 版本25
  [1706, 336, 12, 644, 23, 952, 34, 1110, 37], // 版本26
  [1828, 360, 12, 700, 25, 1020, 34, 1200, 40], // 版本27
  [1921, 390, 13, 728, 26, 1050, 35, 1260, 42], // 版本28
  [2051, 420, 14, 784, 28, 1140, 38, 1350, 45], // 版本29
  [2185, 450, 15, 812, 29, 1200, 40, 1440, 48], // 版本30
  [2323, 480, 16, 868, 31, 1290, 43, 1530, 51], // 版本31
  [2465, 510, 17, 924, 33, 1350, 45, 1620, 54], // 版本32
  [2611, 540, 18, 980, 35, 1440, 48, 1710, 57], // 版本33
  [2761, 570, 19, 1036, 37, 1530, 51, 1800, 60], // 版本34
  [2876, 570, 19, 1064, 38, 1590, 53, 1890, 63], // 版本35
  [3034, 600, 20, 1120, 40, 1680, 56, 1980, 66], // 版本36
  [3196, 630, 21, 1204, 43, 1770, 59, 2100, 70], // 版本37
  [3362, 660, 22, 1260, 45, 1860, 62, 2220, 74], // 版本38
  [3532, 720, 24, 1316, 47, 1950, 65, 2310, 77], // 版本39
  [3706, 750, 25, 1372, 49, 2040, 68, 2430, 81]  // 版本40
];

/**
 * 处理后的版本配置表
 */
const versions: Record<string, VersionConfig>[] = versionsRaw.map((v, index) => {
  if (!index) return {}; // 版本0不存在
  
  const res: Record<string, VersionConfig> = {};
  
  // 处理每个纠错级别 (L, M, Q, H)
  for (let i = 1; i < 8; i += 2) {
    const totalCodewords = v[0];
    const ecCodewords = v[i];
    const numBlocks = v[i + 1];
    const ecLevel = EC_LEVELS[(i / 2) | 0];
    
    const dataLength = totalCodewords - ecCodewords;
    const ecLength = ecCodewords / numBlocks;
    
    const config: VersionConfig = {
      version: index,
      ec_level: ecLevel,
      data_len: dataLength,
      ec_len: ecLength,
      blocks: [],
      ec: []
    };
    
    // 计算数据块的分割
    let remainingData = dataLength;
    for (let k = numBlocks; k > 0; k--) {
      const blockSize = Math.floor(remainingData / k);
      config.blocks.push(blockSize);
      remainingData -= blockSize;
    }
    
    res[ecLevel] = config;
  }
  
  return res;
});

/**
 * 根据编码数据和纠错级别选择合适的QR码版本
 * @param message 编码后的消息数据
 * @param ecLevel 纠错级别
 * @returns 版本配置模板
 * @throws 如果数据太大无法编码则抛出错误
 */
export function getTemplate(message: EncodedData, ecLevel: ECLevel): VersionConfig {
  let i = 1;
  let len: number;

  // 首先尝试版本1-9（使用data1）
  if (message.data1) {
    len = Math.ceil(message.data1.length / 8);

    for (/* i */; i < 10; i++) {
      const version = versions[i][ecLevel];
      if (version && version.data_len >= len) {
        return deepCopy(version);
      }
    }
  } else {
    i = 10;
  }

  // 尝试版本10-26（使用data10）
  if (message.data10) {
    len = Math.ceil(message.data10.length / 8);

    for (/* i */; i < 27; i++) {
      const version = versions[i][ecLevel];
      if (version && version.data_len >= len) {
        return deepCopy(version);
      }
    }
  } else {
    i = 27;
  }

  // 尝试版本27-40（使用data27）
  len = Math.ceil(message.data27.length / 8);
  for (/* i */; i < 41; i++) {
    const version = versions[i][ecLevel];
    if (version && version.data_len >= len) {
      return deepCopy(version);
    }
  }

  throw new Error("数据太大，无法编码为QR码");
}

/**
 * 将编码数据填充到版本模板中
 * @param message 编码后的消息数据
 * @param template 版本配置模板
 * @returns 填充完成的QR码数据
 */
export function fillTemplate(message: EncodedData, template: VersionConfig): QRData {
  // 创建数据缓冲区
  const blocks = Buffer.alloc(template.data_len);
  blocks.fill(0);
  
  // 根据版本选择合适的编码数据
  let messageData: number[];
  if (template.version < 10) {
    messageData = message.data1!;
  } else if (template.version < 27) {
    messageData = message.data10!;
  } else {
    messageData = message.data27;
  }
  
  const len = messageData.length;
  
  // 将位数据转换为字节数据
  for (let i = 0; i < len; i += 8) {
    let b = 0;
    for (let j = 0; j < 8; j++) {
      b = (b << 1) | (messageData[i + j] ? 1 : 0);
    }
    blocks[Math.floor(i / 8)] = b;
  }
  
  // 添加填充字节（交替使用236和17）
  let pad = 236;
  for (let i = Math.ceil((len + 4) / 8); i < blocks.length; i++) {
    blocks[i] = pad;
    pad = (pad === 236) ? 17 : 236;
  }
  
  // 分割数据块并计算纠错码（与原始JS逻辑一致）
  let offset = 0;
  const dataBlocks: Buffer[] = [];
  const ecBlocks: Buffer[] = [];

  template.blocks.forEach((blockSize: number) => {
    const dataBlock = blocks.subarray(offset, offset + blockSize);
    offset += blockSize;
    const ecBlock = calculateErrorCode(dataBlock, template.ec_len);
    dataBlocks.push(dataBlock);
    ecBlocks.push(ecBlock);
  });

  // 返回正确的QRData格式
  return {
    version: template.version,
    ec_level: template.ec_level,
    blocks: dataBlocks,
    ec: ecBlocks,
    ec_len: template.ec_len
  };
}

/**
 * 生成QR码矩阵的主函数
 * 整合编码、版本选择、数据填充和矩阵生成的完整流程
 * 
 * @param text 要编码的文本
 * @param ecLevel 纠错级别 (L, M, Q, H)，默认为M
 * @param parseUrl 是否解析URL，默认为true
 * @returns QR码矩阵
 * @throws 如果纠错级别无效或数据太大则抛出错误
 */
export function QR(text: string | number | Buffer | number[], ecLevel: ECLevel = 'M', parseUrl: boolean = true): QRMatrix {
  // 验证纠错级别
  if (!EC_LEVELS.includes(ecLevel)) {
    throw new Error(`无效的纠错级别: ${ecLevel}，必须是 L、M、Q 或 H 之一`);
  }
  
  // 1. 编码数据
  const message = encode(text, parseUrl);
  
  // 2. 选择版本并获取模板
  const template = getTemplate(message, ecLevel);
  
  // 3. 填充数据到模板
  const data = fillTemplate(message, template);
  
  // 4. 生成矩阵
  return getMatrix(data);
}

// 导出类型
export type { VersionConfig, EncodedData };
