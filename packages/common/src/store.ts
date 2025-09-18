//prettier-ignore
export class ISmartifyStore {
    #store: Map<string, any> = new Map();
    constructor() {
        this.set('__namespace', 'ismartify');   //设置命名空间,防止污染命名
        this.set("__name", "ismartify.store");
        this.set("__description", "ismartify基础运行时存储类");
    }

    // 基础方法
    raw = () => this.#store;
    get = (k: string, def?: any) => (def === undefined ? this.#store.get(k) : this.#store.get(k) || def);
    set = (key: string, value: any) => { this.#store.set(key, value); return this; }; //prettier-ignore
    pick(...keys: string[]): any[] { return keys.map(k => this.#store.get(k)); } //简单扩展
    delete = (key: string) => { this.#store.delete(key); return this; }
    clear = () => { this.#store.clear(); return this; }
    has = (key: string) => this.#store.has(key);

    //函数方法
    mixin = (name: string, fn: Function) => {
        const newFn = function (this: ISmartifyStore, ...args: any[]) { return fn(this, ...args); };
        this.set(`@.${name}`, newFn);
        return this;
    }

    // 新增 call 方法
    call = <T extends (...args: any[]) => any>(
        name: string,
        ...args: Parameters<T>
    ): ReturnType<T> => {
        const fn = this.get(`@.${name}`) as T;
        if (!fn) throw new Error(`Function ${name} not found in mixin`);
        return fn.call(this, ...args);
    }


    // 新增 exec 方法 - 传递 _self 参数，支持箭头函数
    exec = <T extends (self: this, ...args: any[]) => any>(
        callback: T,
        ...args: any[]
    ): ReturnType<T> => {
        return callback(this, ...args);
    }

    // 新增 tap 方法 - 支持正则表达式和字符串规则
    tap = (rule?: string | RegExp) => {
        let regex: RegExp | null= typeof rule === 'string'? new RegExp(rule) : rule instanceof RegExp ? rule : null; // 根据传入的规则创建正则表达式
        const entries = Array.from(this.raw().entries()); // 获取条目
        const filteredEntries = entries.filter(([key]) => !regex || regex.test(key)); // 过滤条目
        const resultArray = filteredEntries.map(([key, value]) => ({ key,value})); // 构建结果数组
        console.table(resultArray); // 输出结果到控制台
        return this; // 返回当前实例
    };
}
