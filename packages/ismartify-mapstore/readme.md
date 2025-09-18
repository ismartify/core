# ISmartify MapStore

[![npm version](https://badge.fury.io/js/%40ismartify%2Fmapstore.svg)](https://badge.fury.io/js/%40ismartify%2Fmapstore)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

一个基于 Map 的轻量级存储工具库，提供链式操作、函数混入、调试等功能的简洁易用接口。

## ✨ 特性

- 🗺️ **基于原生 Map**：利用 JavaScript 原生 Map 的高性能
- 🔗 **链式操作**：支持流畅的链式调用
- 🔧 **函数混入**：支持动态添加和调用自定义函数
- 🎯 **执行器模式**：支持 call、exec 等多种函数执行方式
- 🐛 **调试友好**：内置 tap 方法支持正则过滤和表格输出
- 🛡️ **类型安全**：完整的 TypeScript 支持
- 📦 **零依赖**：无外部依赖，轻量级设计

## 📦 安装

```bash
npm install @ismartify/mapstore
# 或
pnpm add @ismartify/mapstore
# 或
yarn add @ismartify/mapstore
```

## 🚀 快速开始

```typescript
import { ISmartifyMapStore } from '@ismartify/mapstore';

// 创建存储实例
const store = new ISmartifyMapStore();

// 基础操作
store
  .set('user', { name: 'John', age: 30 })
  .set('config', { theme: 'dark' })
  .set('count', 0);

// 获取数据
const user = store.get('user');
const theme = store.get('config.theme', 'light'); // 带默认值

// 检查和删除
if (store.has('count')) {
  store.delete('count');
}

// 调试输出
store.tap(); // 输出所有数据到控制台表格
```

## 📖 API 文档

### 基础方法

#### `set(key: string, value: any): this`
设置键值对，支持链式调用。

```typescript
store.set('name', 'John').set('age', 30);
```

#### `get(key: string, defaultValue?: any): any`
获取值，支持默认值。

```typescript
const name = store.get('name');
const age = store.get('age', 0); // 如果不存在返回 0
```

#### `has(key: string): boolean`
检查键是否存在。

```typescript
if (store.has('user')) {
  console.log('用户存在');
}
```

#### `delete(key: string): this`
删除键值对，支持链式调用。

```typescript
store.delete('temp').delete('cache');
```

#### `clear(): this`
清空所有数据，支持链式调用。

```typescript
store.clear();
```

#### `pick(...keys: string[]): any[]`
提取多个键的值。

```typescript
const [name, age] = store.pick('name', 'age');
```

#### `raw(): Map<string, any>`
获取原始 Map 对象。

```typescript
const rawMap = store.raw();
```

### 函数混入

#### `mixin(name: string, fn: Function): this`
添加自定义函数到存储中。

```typescript
store.mixin('increment', (self, key, step = 1) => {
  const current = self.get(key, 0);
  return self.set(key, current + step);
});
```

#### `call<T>(name: string, ...args: any[]): ReturnType<T>`
调用混入的函数。

```typescript
store.set('counter', 5);
store.call('increment', 'counter', 2); // counter 变为 7
```

### 执行器模式

#### `exec<T>(callback: T, ...args: any[]): ReturnType<T>`
执行回调函数，自动传入当前实例作为第一个参数。

```typescript
store.exec((self, multiplier) => {
  const count = self.get('count', 0);
  return self.set('count', count * multiplier);
}, 2);
```

### 调试方法

#### `tap(rule?: string | RegExp): this`
调试输出，支持正则过滤。

```typescript
// 输出所有数据
store.tap();

// 只输出以 'user' 开头的键
store.tap('^user');

// 使用正则表达式
store.tap(/config|setting/);
```

## 🎯 使用场景

### 1. 配置管理

```typescript
const config = new ISmartifyMapStore();

config
  .set('api.baseUrl', 'https://api.example.com')
  .set('api.timeout', 5000)
  .set('ui.theme', 'dark')
  .set('ui.language', 'zh-CN');

// 获取配置
const apiUrl = config.get('api.baseUrl');
const timeout = config.get('api.timeout', 3000);
```

### 2. 状态管理

```typescript
const state = new ISmartifyMapStore();

// 添加状态更新函数
state.mixin('updateUser', (self, userData) => {
  return self.set('user', { ...self.get('user', {}), ...userData });
});

state.mixin('incrementCounter', (self, key = 'counter') => {
  return self.set(key, self.get(key, 0) + 1);
});

// 使用
state.call('updateUser', { name: 'Alice', age: 25 });
state.call('incrementCounter');
```

### 3. 缓存系统

```typescript
const cache = new ISmartifyMapStore();

// 添加缓存逻辑
cache.mixin('setWithTTL', (self, key, value, ttl = 60000) => {
  const expiry = Date.now() + ttl;
  return self.set(key, { value, expiry });
});

cache.mixin('getValid', (self, key) => {
  const item = self.get(key);
  if (!item) return null;
  
  if (Date.now() > item.expiry) {
    self.delete(key);
    return null;
  }
  
  return item.value;
});

// 使用缓存
cache.call('setWithTTL', 'user:123', { name: 'John' }, 30000);
const user = cache.call('getValid', 'user:123');
```

### 4. 调试和监控

```typescript
const store = new ISmartifyMapStore();

// 开发环境下的调试
if (process.env.NODE_ENV === 'development') {
  store
    .set('debug.requests', [])
    .set('debug.errors', [])
    .tap('^debug'); // 只显示调试相关的数据
}
```

## 🔧 高级用法

### 链式操作组合

```typescript
const result = new ISmartifyMapStore()
  .set('data', [])
  .mixin('addItem', (self, item) => {
    const items = self.get('data', []);
    return self.set('data', [...items, item]);
  })
  .call('addItem', { id: 1, name: 'Item 1' })
  .call('addItem', { id: 2, name: 'Item 2' })
  .tap('^data') // 调试输出
  .get('data');
```

### 函数式编程风格

```typescript
const store = new ISmartifyMapStore();

// 函数式数据处理
store.exec((self) => {
  const numbers = [1, 2, 3, 4, 5];
  const sum = numbers.reduce((a, b) => a + b, 0);
  const avg = sum / numbers.length;
  
  return self
    .set('numbers', numbers)
    .set('sum', sum)
    .set('average', avg);
});
```

## 📝 注意事项

1. **命名空间**：构造函数会自动设置 `__namespace` 键，避免手动修改
2. **函数混入**：混入的函数以 `@.` 前缀存储，避免与普通数据冲突
3. **类型安全**：虽然内部使用 `any`，但建议在使用时进行类型断言
4. **调试输出**：`tap` 方法在生产环境中可能影响性能，建议条件性使用

## 🔧 开发

```bash
# 安装依赖
pnpm install

# 运行测试
pnpm test

# 构建项目
pnpm build

# 发布到 npm
pnpm run npm:publish
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系我们

- Email: ismartify@keepdb.com
- Author: Benz Zeng

## 📄 许可证

ISC License
