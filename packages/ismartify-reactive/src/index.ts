import get from "lodash/get";
import set from "lodash/set";
import pick from "lodash/pick";
import { isReactive } from "./isReactive";

//prettier-ignore
export class ISmartifyReactive {
  #store: Record<string, any> = {};
  constructor(reactiveObject?: Record<string, any>) {
    if (!reactiveObject || !isReactive(reactiveObject))
      throw new Error("传入的对象必须是响应式的");
    this.#store = reactiveObject || {};
    this.set("__version", "ismartify-reactive@1.0.0");
  }

  raw = () => this.#store; // 原始数据
  get = <T = any>(key: string, defaultValue?: T): T | undefined =>
    get(this.#store, key, defaultValue);
  set = <T = any>(key: string, value: T): this => {
    set(this.#store, key, value);
    return this;
  };
  pick = (pattern: string | string[]): Record<string, any> => {
    if (typeof pattern === 'string') {
      // 单路径选择
      return { [pattern]: get(this.#store, pattern) };
    } else {
      // 多路径选择
      const result: Record<string, any> = {};
      pattern.forEach(path => {
        result[path] = get(this.#store, path);
      });
      return result;
    }
  };
  tap(fn?: (store: Record<string, any>) => void) {
    const handle = fn || console.log;
    handle(this.#store);
    return this;
  }

  //函数方法
  mixin = (name: string, fn: Function) => {
    const newFn = function (this: ISmartifyReactive, ...args: any[]) {
      return fn(this, ...args);
    };
    this.set(`__functions.${name}`, newFn);
    return this;
  };

  // 新增 call 方法
  call = <T extends (...args: any[]) => any>(
    name: string,
    ...args: Parameters<T>
  ): ReturnType<T> => {
    const fn = this.get(`__functions.${name}`) as T;
    if (!fn) throw new Error(`Function ${name} not found in mixin`);
    return fn.call(this, ...args);
  };

  // 新增 exec 方法 - 传递 _self 参数，支持箭头函数
  exec = <T extends (self: this, ...args: any[]) => any>(
    callback: T,
    ...args: any[]
  ): ReturnType<T> => {
    return callback(this, ...args);
  };
}

export default ISmartifyReactive;
export { get, set, pick };
export {isReactive};

