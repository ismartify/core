class ISmartifyCore {
    #mapStore: Map<string, any> = new Map();
    constructor() {}
    set = (key: string, value: any) => {this.#mapStore.set(key, value); return this;};
    get = (key: string, def?: any) => {return this.#mapStore.get(key) || def;}; 
    raw = () => {return this.#mapStore;};
    tap = () => {console.table([...this.#mapStore.keys()]);return this;};

    // 扩展函数
    mixin = (name: string, fn: Function) => {const newFn = (...args: any[]) => fn(this, ...args);this.set(`#function.${name}`, newFn);return this;};
    call = (name: string, ...args: any[]) => {return this.get(`#function.${name}`)(...args);};
  }
  export default ISmartifyCore;
