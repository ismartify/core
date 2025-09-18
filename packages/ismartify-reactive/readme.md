# ISmartify Reactive

[![npm version](https://badge.fury.io/js/%40ismartify%2Freactive.svg)](https://badge.fury.io/js/%40ismartify%2Freactive)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

一个基于 Vue 3 Reactivity 和 Lodash 的响应式对象操作工具库，为响应式数据提供简洁易用的链式操作接口。

## ✨ 特性

- 🎯 **基于 Vue 3 Reactivity**：充分利用 Vue 3 的响应式系统
- 🔗 **链式操作**：支持流畅的链式调用
- 🛠️ **Lodash 集成**：集成强大的 Lodash 工具函数
- 🛡️ **类型安全**：完整的 TypeScript 支持
- 📦 **轻量级**：零依赖，只依赖 Vue 3 Reactivity 和 Lodash

## 📦 安装

```bash
# 使用 npm
npm install @ismartify/reactive

# 使用 pnpm
pnpm add @ismartify/reactive

# 使用 yarn
yarn add @ismartify/reactive
```

## 🚀 快速开始

```typescript
import { reactive } from '@vue/reactivity';
import { ISmartifyReactive } from '@ismartify/reactive';

// 创建响应式对象
const reactiveObj = reactive({
  user: {
    name: 'John Doe',
    age: 30,
    settings: {
      theme: 'dark',
      notifications: true
    }
  },
  posts: []
});

// 创建 ISmartifyReactive 实例
const store = new ISmartifyReactive(reactiveObj);

// 链式操作
store
  .set('user.age', 31)
  .set('posts', [{ id: 1, title: 'Hello World' }])
  .tap(); // 输出当前状态

// 获取嵌套属性
const userName = store.get('user.name'); // 'John Doe'
const theme = store.get('user.settings.theme'); // 'dark'

// 挑选属性
const userInfo = store.pick(['user.name', 'user.age']);
// { 'user.name': 'John Doe', 'user.age': 31 }

// 获取原始响应式对象
const raw = store.raw();
```

## 📚 API 文档

### ISmartifyReactive 类

#### 构造函数

```typescript
new ISmartifyReactive(reactiveObject?: Record<string, any>)
```

- `reactiveObject`: 可选的 Vue 响应式对象。如果不传入，将创建一个空的响应式对象。

**注意**：传入的对象必须是使用 `reactive()` 创建的响应式对象，否则会抛出错误。

#### 实例方法

##### `get<T>(key: string, defaultValue?: T): T | undefined`

获取指定路径的值，支持嵌套路径。

```typescript
const value = store.get('user.settings.theme');
const valueWithDefault = store.get('user.email', 'default@email.com');
```

##### `set<T>(key: string, value: T): this`

设置指定路径的值，返回实例本身支持链式调用。

```typescript
store.set('user.name', 'Jane Doe').set('user.age', 25);
```

##### `pick(pattern: string | string[]): Record<string, any>`

从对象中挑选指定的属性。

```typescript
// 单个属性
const name = store.pick('user.name'); // { 'user.name': 'Jane Doe' }

// 多个属性
const userInfo = store.pick(['user.name', 'user.age']);
```

##### `tap(fn?: (store: Record<string, any>) => void): this`

调试方法，用于查看当前存储状态，默认输出到控制台。

```typescript
// 默认输出
store.tap();

// 自定义处理
store.tap((data) => {
  console.log('Current state:', data);
  // 进行其他操作...
});
```

##### `mixin<T>(name: string, fn: (self: this, ...args: any[]) => T): this`

添加自定义方法到存储实例，返回实例本身支持链式调用。

```typescript
// 添加自定义方法
store.mixin('double', function(self, multiplier = 2) {
  const current = self.get('value');
  return current * multiplier;
});

// 链式调用
store.mixin('reset', function(self) {
  self.set('value', 0);
  return '已重置';
});
```

##### `call<T>(name: string, ...args: any[]): T`

调用通过 mixin 方法添加的自定义函数。

```typescript
// 调用混入的方法
const result = store.call('double', 3); // 返回 30
const resetMsg = store.call('reset'); // 返回 '已重置'
```

##### `exec<T>(fn: (self: this) => T): T`

执行回调函数，可以在回调中操作存储并返回结果。

```typescript
// 执行复杂逻辑
const result = store.exec((self) => {
  const current = self.get('counter');
  self.set('counter', current + 10);
  self.set('history', [...self.get('history'), current + 10]);
  return `计数器更新为: ${current + 10}`;
});
```

##### `raw(): Record<string, any>`

返回原始的响应式对象。

```typescript
const original = store.raw();
// 直接操作原始对象，但会失去响应式特性
```

### 工具函数

#### `get(object: any, path: string, defaultValue?: any): any`

Lodash 的 get 函数，用于安全地获取嵌套对象属性。

#### `set(object: any, path: string, value: any): any`

Lodash 的 set 函数，用于设置嵌套对象属性。

#### `pick(object: any, paths: string | string[]): Record<string, any>`

Lodash 的 pick 函数，用于从对象中挑选指定的属性。

#### `isReactive(value: unknown): boolean`

检查一个值是否为 Vue 响应式对象。

```typescript
import { reactive } from '@vue/reactivity';
import { isReactive } from '@ismartify/reactive';

const obj = { name: 'test' };
const reactiveObj = reactive(obj);

console.log(isReactive(obj)); // false
console.log(isReactive(reactiveObj)); // true
```

## 💡 使用场景

- **状态管理**：在 Vue 应用中管理复杂的状态
- **配置管理**：处理应用的配置对象
- **数据缓存**：缓存 API 响应数据
- **表单管理**：处理表单数据的响应式更新

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

## 📄 许可证

ISC License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系我们

- Email: ismartify@keepdb.com
- Author: Benz Zeng