# @ismartify/common

轻量的通用工具库，提供运行时存储容器 `ISmartifyStore` 与标准错误对象 `ISmartifyError`，适用于 Node.js 与前端 TypeScript 项目。

- 包名：`@ismartify/common`
- 导出：`ISmartifyStore`、`ISmartifyError`
- 类型：内置 d.ts，无需额外安装类型

## 安装

中国区建议使用 npmmirror 源，项目默认 `.npmrc` 已配置：

```bash
pnpm add @ismartify/common
# 或
npm i @ismartify/common
```

## 快速开始

```ts
import { ISmartifyStore, ISmartifyError } from '@ismartify/common';

// Store 基础用法
const store = new ISmartifyStore();
store.set('token', 'abc').set('user', { id: 1 });

console.log(store.get('token')); // 'abc'
console.log(store.pick('token', 'user')); // ['abc', { id: 1 }]
console.log(store.has('user')); // true

// Error 基础用法
try {
  throw new ISmartifyError('403.无权限#NO_PERMISSION@auth');
} catch (err) {
  if (err instanceof ISmartifyError) {
    console.log(err.statusCode); // 403
    console.log(err.code);       // 'NO_PERMISSION'
    console.log(err.module);     // 'auth'
    console.log(err.json());     // 标准化响应结构
  }
}
```

## ESM / CJS 引入

```ts
// ESM（推荐）
import { ISmartifyStore, ISmartifyError } from '@ismartify/common';
```

```js
// CommonJS
const { ISmartifyStore, ISmartifyError } = require('@ismartify/common');
```

## API 文档

### ISmartifyStore

基于 `Map` 的运行时存储容器，默认带有命名空间信息，提供便捷的数据读写、函数混入与调试输出能力。

- 基础方法：
  - `raw(): Map<string, any>` 获取底层 Map
  - `get(key: string, def?: any): any` 读取（带默认值）
  - `set(key: string, value: any): this` 写入（可链式）
  - `pick(...keys: string[]): any[]` 批量读取（按键顺序返回数组）
  - `delete(key: string): this` 删除键
  - `clear(): this` 清空
  - `has(key: string): boolean` 是否存在

- 函数相关：
  - `mixin(name: string, fn: Function): this`
    - 注册可复用函数到容器，内部以 `_mixin.${name}` 保存。
  - `call<T>(name: string, ...args): ReturnType<T>`
    - 调用通过 `mixin` 注册的函数，`this` 自动绑定为当前 `ISmartifyStore` 实例。
  - `exec<T>(callback: (self: this, ...args) => any, ...args): ReturnType<T>`
    - 直接执行回调，并将 `self` 传入，适配箭头函数写法。

- 调试：
  - `tap(rule?: string | RegExp): this`
    - 以表格形式输出满足规则的键值对（无规则时输出全部），常用于排查存储状态。

示例：

```ts
const store = new ISmartifyStore();

// 注册并调用 mixin 函数
store
  .mixin('greet', (self: ISmartifyStore, name: string) => {
    const ns = self.get('__namespace');
    return `hello ${name} from ${ns}`;
  });

const msg = store.call<(name: string) => string>('greet', 'Benz');
console.log(msg); // hello Benz from ismartify

// 使用 exec 执行箭头函数
const result = store.exec((self, a: number, b: number) => a + b, 1, 2);
console.log(result); // 3

// 调试输出
store.set('a', 1).set('b', 2).tap(/[ab]/); // 打印 a、b 两个键
```

### ISmartifyError

标准错误类型，便于在服务端与客户端统一错误响应结构。支持在 message 中按约定格式解析：

- 格式：`[statusCode.]message[#errorCode][@module]`
- 示例：`"500.服务器错误#INTERNAL_ERROR@core"`

属性与方法：

- `statusCode: number` HTTP 状态码（默认 500）
- `code: string` 错误代码（默认 `UNKNOWN_ERROR`）
- `module?: string` 归属模块（默认 `noname`）
- `json(stack?: boolean)` 标准化响应对象（可选包含 `stack`）
- `throw()` 直接抛出当前错误实例

示例：

```ts
try {
  new ISmartifyError('404.资源不存在#NOT_FOUND@asset').throw();
} catch (e) {
  if (e instanceof ISmartifyError) {
    const resBody = e.json();
    // { success:false, error:{ code, message, module }, status }
  }
}
```

## 构建与发布（维护者）

- 构建：`pnpm -F @ismartify/common build`（内部使用 tsup）
- 本地测试：`pnpm -F @ismartify/common test`
- 发布到 npm 官方源（作用域包需 public）：

```bash
# 确保已登录 npm，并有发布权限
pnpm -F @ismartify/common npm:publish
# 等价于：
# npm run ver+ && npm run build && npm publish --registry https://registry.npmjs.org/ --access public --no-git-checks
```

## 许可

ISC
