// 定义响应式标志
const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  RAW = '__v_raw'
}

// 自定义 isReactive 实现
export function isReactive(value: unknown): boolean {
  if (value === null || typeof value !== 'object') {
    return false;
  }
  // 检查对象是否有 __v_isReactive 属性
  return !!(value as any)[ReactiveFlags.IS_REACTIVE];
}
