# @ismartify/arkstore

基于 arktype + Map 实现的带类型校验和安全设置功能的 KV 存储管理类。

`ISmartifyArkStore` 是 arktype 的 wrapper 类，提供了便捷的 KV 存储、类型校验和安全默认值功能。

## 特性

- 🔒 **类型安全**: 基于 arktype 提供强类型校验
- 🚀 **高性能**: 使用 Map 作为底层存储，提供 O(1) 的读写性能
- 🛡️ **安全设置**: 支持 defaultValue 安全机制，验证失败时自动使用默认值
- 📝 **灵活配置**: 支持动态 schema 配置和验证规则
- 🎯 **智能推断**: 自动推断数据类型并生成对应的 schema
- 🔧 **扩展性**: 支持批量定义、对象扁平化等高级功能
- 💡 **开发友好**: 提供丰富的调试和监控功能

## 安装

```bash
# 使用 pnpm (推荐)
pnpm add @ismartify/arkstore

# 使用 npm
npm install @ismartify/arkstore

# 使用 yarn
yarn add @ismartify/arkstore
```

## 快速开始

```typescript
import { ISmartifyArkStore } from '@ismartify/arkstore';
import { type } from 'arktype';

// 创建存储实例，必须传入 arktype 的 type 函数
const store = new ISmartifyArkStore(type);

// 1. 精确路径定义 schema - 使用 defineByKey
store.defineByKey('user.name', 'string');
store.defineByKey('user.email', 'string.email');
store.defineByKey('user.age', 'number');

// 或者使用 define 方法（自动调用 defineByKey）
store.define('user.name', 'string');
store.define('user.email', 'string.email');
store.define('user.age', 'number');

// 2. 批量定义 schema - 使用 defineByKey
store.defineByKey('app.version', 'string');
store.defineByKey('app.debug', 'boolean');
store.defineByKey('config.timeout', 'number');

// 3. 基于对象自动推断并定义 schema
const sampleConfig = {
  database: {
    host: 'localhost',
    port: 5432,
    username: 'admin@example.com',
    ssl: true
  },
  cache: {
    redis: {
      url: 'redis://localhost:6379',
      ttl: 3600
    }
  }
};

store.defineByObject(sampleConfig); // 自动推断类型并定义 schema

// 4. 设置数据 - 键值对方式
store.set('user.name', 'John Doe');
store.set('user.email', 'john@example.com');
store.set('user.age', 30);

// 5. 设置数据 - 对象方式（自动扁平化）
store.set({
  'app.version': '1.0.0',
  'app.debug': false,
  'config.timeout': 5000
});

// 6. 获取数据
console.log(store.get('user.name')); // 'John Doe'
console.log(store.get('database.host')); // 'localhost'
console.log(store.get('nonexistent', 'default')); // 'default'

// 7. 安全设置 - 验证失败时使用默认值
store.set('user.email', 'invalid-email', 'fallback@example.com');
// 输出警告并使用 fallback@example.com

console.log(store.get('user.email')); // 'fallback@example.com'
```

## API 参考

### 构造函数

```typescript
new ISmartifyArkStore(type: typeof import('arktype').type)
```

**参数说明**：
- `type: typeof import('arktype').type` - **必需参数**，arktype 的 type 函数，用于后续的类型定义和校验

### Schema 定义方法

| 方法 | 参数 | 返回值 | 描述 |
|------|------|--------|------|
| `defineByKey(key: string, schema: object \| string)` | 键名、schema定义 | `this` | 精确的键值对定义，支持点路径如 'a.b.c' |
| `define(schemaOrKey?: object \| string, schema?: object \| string)` | 字符串或对象、可选schema | `this` | 智能判断参数类型，自动调用 defineByKey 或 defineByObject |
| `defineByObject(obj: object, schemaDefinition?: object \| string, prefix?: string)` | 对象、可选schema、可选前缀 | `this` | 基于对象结构自动推断并定义 schema |
| `isArkType(value: any)` | 任意值 | `boolean` | 检查值是否为 arktype 类型 |

### 数据操作方法

| 方法 | 参数 | 返回值 | 描述 |
|------|------|--------|------|
| `get<T>(key: string, defaultValue?: T)` | 键名、可选默认值 | `T \| undefined` | 获取指定键的值，支持点路径 |
| `set(keyOrObject: string \| object, value?: any, defaultValue?: any)` | 键或对象、值、安全默认值 | `this` | 设置数据，支持安全默认值机制 |
| `has(key: string)` | 键名 | `boolean` | 检查键是否存在 |
| `delete(key: string)` | 键名 | `boolean` | 删除指定键 |
| `clear()` | - | `this` | 清空所有数据（保留命名空间） |

### 遍历和统计方法

| 方法 | 参数 | 返回值 | 描述 |
|------|------|--------|------|
| `size()` | - | `number` | 获取存储项数量（排除命名空间） |
| `keys()` | - | `IterableIterator<string>` | 获取所有键的迭代器 |
| `values()` | - | `IterableIterator<any>` | 获取所有值的迭代器 |
| `entries()` | - | `IterableIterator<[string, any]>` | 获取所有键值对的迭代器 |

### 工具方法

| 方法 | 参数 | 返回值 | 描述 |
|------|------|--------|------|
| `raw()` | - | `{store: Map, schema: Map}` | 获取底层存储和 schema 的原始访问 |
| `exec<T>(fn: (store: this) => T)` | 回调函数 | `T` | 执行自定义函数并返回结果 |
| `debug()` | - | `this` | 输出调试信息到控制台 |

## 高级用法

### Schema 定义的三种方式

```typescript
import { ISmartifyArkStore } from '@ismartify/arkstore';
import { type } from 'arktype';

const store = new ISmartifyArkStore(type);

// 方式1: 使用 defineByKey 精确定义（推荐）
store.defineByKey('user.name', 'string');
store.defineByKey('user.email', 'string.email');
store.defineByKey('user.age', 'number');
store.defineByKey('settings.theme', '"light" | "dark"');

// 支持深层嵌套路径
store.defineByKey('app.config.database.connection.timeout', 'number');
store.defineByKey('user.profile.social.links.github', 'string');

// 方式2: 使用 define 方法（自动判断）
// 字符串参数 -> 自动调用 defineByKey
store.define('user.name', 'string');
store.define('user.email', 'string.email');

// 对象参数 -> 自动调用 defineByObject
const configTemplate = {
  server: {
    host: 'localhost',        // 推断为 'string'
    port: 3000,              // 推断为 'number'
    ssl: true                // 推断为 'boolean'
  },
  database: {
    url: 'postgres://...',   // 推断为 'string'
    maxConnections: 10       // 推断为 'number'
  },
  admin: {
    email: 'admin@example.com' // 推断为 'string.email'
  }
};

store.define(configTemplate); // 自动调用 defineByObject

// 方式3: 直接使用 defineByObject
store.defineByObject(configTemplate);

// 也可以为所有字段指定统一的 schema
store.defineByObject(configTemplate, 'string'); // 所有字段都是 string 类型
```

### 安全设置机制

```typescript
// 定义 schema
store.define({
  'user.email': 'string.email',
  'user.age': 'number',
  'user.active': 'boolean'
});

// 1. 验证失败时使用默认值
store.set('user.email', 'invalid-email', 'fallback@example.com');
// 输出警告: Validation failed for key "user.email": must be an email address (was "invalid-email"). Using defaultValue: fallback@example.com
console.log(store.get('user.email')); // 'fallback@example.com'

// 2. 正确值不会被替换
store.set('user.email', 'valid@example.com', 'fallback@example.com');
console.log(store.get('user.email')); // 'valid@example.com'

// 3. 对象方式的安全设置
store.set({
  'user.email': 'invalid-email',  // 验证失败
  'user.age': 'not-a-number',     // 验证失败
  'user.active': true             // 验证成功
}, 'safe-default');

console.log(store.get('user.email'));  // 'safe-default'
console.log(store.get('user.age'));    // 'safe-default'
console.log(store.get('user.active')); // true

// 4. defaultValue 本身也会被验证
try {
  store.set('user.email', 'invalid', 'also-invalid');
  // 抛出错误: Both value and defaultValue validation failed
} catch (error) {
  console.error(error.message);
}
```

### 对象扁平化和嵌套设置

```typescript
// 嵌套对象会自动扁平化为点路径
store.set({
  user: {
    profile: {
      name: 'John Doe',
      avatar: 'avatar.jpg'
    },
    settings: {
      theme: 'dark',
      notifications: {
        email: true,
        push: false
      }
    }
  }
});

// 等价于：
store.set({
  'user.profile.name': 'John Doe',
  'user.profile.avatar': 'avatar.jpg',
  'user.settings.theme': 'dark',
  'user.settings.notifications.email': true,
  'user.settings.notifications.push': false
});

// 获取数据
console.log(store.get('user.profile.name'));           // 'John Doe'
console.log(store.get('user.settings.theme'));         // 'dark'
console.log(store.get('user.settings.notifications.email')); // true
```

### 高级查询和操作

```typescript
// 使用 exec 方法执行自定义逻辑
const userPreferences = store.exec((store) => {
  const preferences = {};
  const keys = Array.from(store.keys());
  
  // 获取所有用户偏好设置
  keys.filter(key => key.startsWith('user.preferences.'))
      .forEach(key => {
        const shortKey = key.replace('user.preferences.', '');
        preferences[shortKey] = store.get(key);
      });
  
  return preferences;
});

// 批量获取配置
const databaseConfig = store.exec((store) => {
  const config = {};
  Array.from(store.keys())
    .filter(key => key.startsWith('database.'))
    .forEach(key => {
      const configKey = key.replace('database.', '');
      config[configKey] = store.get(key);
    });
  return config;
});

// 数据清理
const cleanupResult = store.exec((store) => {
  const keys = Array.from(store.keys());
  let deletedCount = 0;
  
  // 删除所有空值
  keys.forEach(key => {
    const value = store.get(key);
    if (value === null || value === undefined || value === '') {
      store.delete(key);
      deletedCount++;
    }
  });
  
  return { deletedCount, remainingCount: store.size() };
});
```

### 调试和监控

```typescript
// 调试信息
store.debug();
// 输出:
// === ISmartifyArkStore 调试信息 ===
// 存储项数量: 15
// 存储键: ['user.name', 'user.email', ...]
// 定义键: ['user.name', 'user.email', ...]

// 获取原始数据访问
const { store: rawStore, schema: rawSchema } = store.raw();
console.log('原始存储大小:', rawStore.size);
console.log('定义的 schema 数量:', rawSchema.size);

// 遍历所有数据
for (const [key, value] of store.entries()) {
  console.log(`${key}: ${JSON.stringify(value)}`);
}

// 统计信息
console.log('存储项数量:', store.size());
console.log('所有键:', Array.from(store.keys()));
console.log('所有值:', Array.from(store.values()));
```

## 类型定义

```typescript
export class ISmartifyArkStore {
  constructor(arktype: any);
  
  // Schema 定义方法
  defineByKey(key: string, schema: object | string): this;
  define(schemaOrKey?: object | string, schema?: object | string): this;
  defineByObject(obj: object, schemaDefinition?: object | string, prefix?: string): this;
  isArkType(value: any): boolean;
  
  // 数据操作方法
  get<T = any>(key: string, defaultValue?: T): T | undefined;
  set(keyOrObject: string | object, value?: any, defaultValue?: any): this;
  has(key: string): boolean;
  delete(key: string): boolean;
  clear(): this;
  
  // 遍历和统计方法
  size(): number;
  keys(): IterableIterator<string>;
  values(): IterableIterator<any>;
  entries(): IterableIterator<[string, any]>;
  
  // 工具方法
  raw(): { store: Map<string, any>, schema: Map<string, any> };
  exec<T>(fn: (store: this) => T): T;
  debug(): this;
}
```

## 自动推断的类型映射

| JavaScript 类型 | 推断的 arktype Schema | 示例 |
|-----------------|---------------------|------|
| `string` | `'string'` | `'hello'` → `'string'` |
| `string` (包含@和.) | `'string.email'` | `'user@example.com'` → `'string.email'` |
| `number` | `'number'` | `42` → `'number'` |
| `boolean` | `'boolean'` | `true` → `'boolean'` |
| `Array<T>` | `'T[]'` | `[1, 2, 3]` → `'number[]'` |
| `Array<unknown>` | `'unknown[]'` | `[]` → `'unknown[]'` |
| `其他` | `'unknown'` | `null` → `'unknown'` |

## 最佳实践

### 1. Schema 定义策略

```typescript
// ✅ 推荐：使用 defineByKey 精确定义 schema
store.defineByKey('user.email', 'string.email');
store.defineByKey('app.config.timeout', 'number');
store.defineByKey('deep.nested.path.value', 'string');

// ✅ 推荐：使用 define 方法的智能判断
store.define('user.email', 'string.email'); // 自动调用 defineByKey
store.define(configObject); // 自动调用 defineByObject

// ✅ 推荐：使用 defineByObject 快速建立基础结构
const template = { user: { name: 'John', age: 30 } };
store.defineByObject(template);

// ❌ 避免：没有 schema 的情况下设置复杂数据
store.set('user.profile.complex', someComplexObject); // 无验证
```

### 2. 安全设置使用

```typescript
// ✅ 推荐：为关键字段提供合理的默认值
store.defineByKey('config.timeout', 'number');
store.set('config.timeout', userInput, 5000);

store.defineByKey('user.email', 'string.email');
store.set('user.email', userEmail, 'noreply@example.com');

// ✅ 推荐：确保 defaultValue 符合 schema 要求
store.defineByKey('user.age', 'number');
store.set('user.age', 'invalid', 18); // defaultValue 是有效的 number

// ❌ 避免：defaultValue 也不符合 schema
store.set('user.age', 'invalid', 'also-invalid'); // 会抛出错误
```

### 3. 性能优化

```typescript
// ✅ 推荐：批量定义 schema
store.defineByKey('user.name', 'string');
store.defineByKey('user.email', 'string.email');
store.defineByKey('user.age', 'number');

// ✅ 推荐：批量操作使用对象方式
store.set({
  'user.name': 'John',
  'user.email': 'john@example.com',
  'user.age': 30
});

// ❌ 避免：频繁的单个设置
store.set('user.name', 'John');
store.set('user.email', 'john@example.com');
store.set('user.age', 30);
```

## 许可证

ISC

## 作者

iSmartify Team - ben.zeng@keepdb.com
