class ISmartifyCore {
  #mapStore: Map<string, any> = new Map();
  constructor() {
    this.set('ismartify.name', 'ISmartifyCore');
    this.set('ismartify.version', '1.0.0');
  }
  set = (key: string, value: any) => { this.#mapStore.set(key, value); return this; };
  get = (key: string, def?: any) => { return this.#mapStore.get(key) || def; };
  raw = () => { return this.#mapStore; };
  #getTypes = (value: any) => {
    const type = Object.prototype.toString.call(value);
    return type.slice(8, -1);
  }

  // 打印对象
  tap = (length: number = 50) => {
    const result: any = {};
    this.#mapStore.forEach((value, key)  => {
      const type = this.#getTypes(value);
      result[key] = {type,value};
      switch (type) {
        case 'Array':
        case 'Map':
          result[key].value = [...value].toString().slice(0, length);
          break;
        case 'Object':
        case 'Set':
        case 'Symbol':
        case 'BigInt':
        case 'Function':
        case 'Promise':
        case 'Date':
          result[key].value = value.toString().slice(0, length);
          break;
        default:
          result[key].value = new String(value).slice(0, length);
      }
    })
    console.table(result,['type','value']);
    return this;
  };

  // 扩展函数
  mixin = (name: string, fn: Function) => { const newFn = (...args: any[]) => fn(this, ...args); this.set(`#function.${name}`, newFn); return this; };
  call = (name: string, ...args: any[]) => { return this.get(`#function.${name}`)(...args); };
}
export default ISmartifyCore;