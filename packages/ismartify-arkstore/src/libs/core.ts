//prettier-ignore
export class ISmartifyArkStore {
  #store: Map<string, any> = new Map();
  #schemas: Map<string, any> = new Map(); // 存储schema定义
  #arktype: any; // arktype的type函数

  constructor(arktype: any) {
    this.#arktype = arktype;
    this.#store.set("__namespace", "ismartify.arkstore"); //设置命名空间,防止污染命名
  }

  //补充方法
  isArkType(value: any): boolean {
    //不引入arktype,直接用原生JS实现方法
    return (
      value &&
      typeof value === "object" &&
      typeof value.allows === "function" &&
      typeof value.assert === "function"
    );
  }

  // 工具方法：扁平化对象为点路径键值对
  #flattenObject(obj: any, prefix = ""): Record<string, any> {
    const flattened: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (value && typeof value === "object" && !Array.isArray(value)) {
        Object.assign(flattened, this.#flattenObject(value, newKey));
      } else {
        flattened[newKey] = value;
      }
    }

    return flattened;
  }

  // defineByKey方法：精确的键值对定义
  defineByKey(key: string, schema: object | string): this {
    if (!key || !schema) {
      throw new Error('defineByKey requires both key and schema parameters');
    }
    const compiledSchema = this.#arktype(schema);
    this.#schemas.set(key, compiledSchema);
    return this;
  }

  // define方法：智能判断参数类型，自动调用对应的方法
  define(schemaOrKey?: object | string, schema?: object | string): this {
    if (typeof schemaOrKey === "string") {
      // 字符串参数：调用 defineByKey
      if (schema) {
        return this.defineByKey(schemaOrKey, schema);
      } else {
        throw new Error('When first parameter is string, schema parameter is required');
      }
    } else if (schemaOrKey && typeof schemaOrKey === "object") {
      // 对象参数：直接调用 defineByObject
      return this.defineByObject(schemaOrKey, schema);
    }
    return this;
  }

  // defineByObject方法：遍历对象结构，为每个路径设置schema
  defineByObject(obj: object, schemaDefinition?: object | string, prefix = ''): this {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        // 递归处理嵌套对象
        this.defineByObject(value, schemaDefinition, fullKey);
      } else {
        // 为叶子节点设置schema
        let finalSchema: string | object;
        
        if (schemaDefinition) {
          // 使用指定的schema
          finalSchema = schemaDefinition;
        } else {
          // 自动推断schema类型
          finalSchema = this.#inferSchemaFromValue(value);
        }
        
        // 使用 defineByKey 方法保持一致性
        this.defineByKey(fullKey, finalSchema);
        // console.log(`✓ Defined schema for key: "${fullKey}" -> ${JSON.stringify(finalSchema)}`);
      }
    }
    return this;
  }

  // 根据值自动推断schema类型
  #inferSchemaFromValue(value: any): string {
    if (typeof value === 'string') {
      // 简单的邮箱检测
      if (value.includes('@') && value.includes('.')) {
        return 'string.email';
      }
      return 'string';
    }
    if (typeof value === 'number') {
      return 'number';
    }
    if (typeof value === 'boolean') {
      return 'boolean';
    }
    if (Array.isArray(value)) {
      if (value.length > 0) {
        const firstItemType = this.#inferSchemaFromValue(value[0]);
        return `${firstItemType}[]`;
      }
      return 'unknown[]';
    }
    return 'unknown';
  }

  // get方法：获取数据，直接用key从Map获取
  get<T = any>(key: string, defaultValue?: T): T | undefined {
    const value = this.#store.get(key);
    return value !== undefined ? value : defaultValue;
  }

  // 验证单个键值对 - KV List模式：key严格匹配schema，支持defaultValue安全机制
  #validateKeyValue(key: string, value: any, defaultValue?: any): any {
    // KV List模式：只进行精确的key-schema匹配
    const schema = this.#schemas.get(key);
    if (schema) {
      const result = schema(value);
      if (result && typeof result === 'object' && result.constructor.name === 'ArkErrors') {
        // 验证失败时，如果有defaultValue则使用defaultValue，否则抛出错误
        if (defaultValue !== undefined) {
          console.warn(`Validation failed for key "${key}": ${result[0]?.message || 'Invalid value'}. Using defaultValue: ${defaultValue}`);
          // 对defaultValue也进行验证，如果defaultValue也验证失败，则抛出错误
          const defaultResult = schema(defaultValue);
          if (defaultResult && typeof defaultResult === 'object' && defaultResult.constructor.name === 'ArkErrors') {
            throw new Error(`Both value and defaultValue validation failed for key "${key}". DefaultValue error: ${defaultResult[0]?.message || 'Invalid defaultValue'}`);
          }
          return defaultResult;
        } else {
          throw new Error(`Validation failed for key "${key}": ${result[0]?.message || 'Invalid value'}`);
        }
      }
      return result;
    }

    // 无对应schema时直接通过（宽松模式）
    // 如果需要严格模式，可以在这里抛出错误
    return value;
  }

  // set方法：设置数据，支持键值对和对象两种方式，支持defaultValue安全机制
  set(keyOrObject: string | object, value?: any, defaultValue?: any): this {
    if (typeof keyOrObject === "string") {
      // 键值对方式: store.set('key', value, defaultValue) - defaultValue作为验证失败时的安全值
      const validatedValue = this.#validateKeyValue(keyOrObject, value, defaultValue);
      this.#store.set(keyOrObject, validatedValue);
    } else if (keyOrObject && typeof keyOrObject === "object") {
      // 对象方式: store.set({...}, defaultValue) - 扁平化后存储
      const flattened = this.#flattenObject(keyOrObject);
      const objectDefaultValue = value; // 在对象模式下，第二个参数是defaultValue

      // 暂时禁用全局schema验证，避免部分对象更新时的验证冲突
      // TODO: 后续可以添加更智能的全局验证策略

      // 验证所有键值对
      const validatedEntries: [string, any][] = [];
      for (const [key, val] of Object.entries(flattened)) {
        const validatedValue = this.#validateKeyValue(key, val, objectDefaultValue);
        validatedEntries.push([key, validatedValue]);
      }

      // 所有验证通过后再存储
      for (const [key, val] of validatedEntries) {
        this.#store.set(key, val);
      }
    }

    return this;
  }

  // 基础方法
  raw = () => {
    return {
      store: this.#store,
      schema: this.#schemas
    }
  }

  has(key: string): boolean {
    return this.#store.has(key);
  }

  delete(key: string): boolean {
    return this.#store.delete(key);
  }

  clear(): this {
    this.#store.clear();
    this.#schemas.clear();
    this.#store.set("__namespace", "ismartify.arkstore");
    return this;
  }

  size(): number {
    return this.#store.size - 1; // 排除__namespace
  }

  keys(): IterableIterator<string> {
    const keys = Array.from(this.#store.keys()).filter(
      (key) => key !== "__namespace"
    );
    return keys[Symbol.iterator]();
  }

  values(): IterableIterator<any> {
    const values = Array.from(this.#store.entries())
      .filter(([key]) => key !== "__namespace")
      .map(([, value]) => value);
    return values[Symbol.iterator]();
  }

  entries(): IterableIterator<[string, any]> {
    const entries = Array.from(this.#store.entries()).filter(
      ([key]) => key !== "__namespace"
    );
    return entries[Symbol.iterator]();
  }

  exec<T>(fn: (arg: this) => T): T {
    return fn(this);
  }


  debug(): this {
    console.log("=== ISmartifyArkStore 调试信息 ===");
    console.log("存储项数量:", this.size());
    console.log("存储键:", Array.from(this.#store.keys()));
    console.log("定义键:", Array.from(this.#schemas.keys()));
    return this;
  }

  // 受保护的方法，供子类访问 arktype 实例
  protected getArkType() {
    return this.#arktype;
  }
}
