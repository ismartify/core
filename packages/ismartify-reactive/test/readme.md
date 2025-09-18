# ISmartify Reactive - 测试设计文档

## 📋 测试概述

`@ismartify/reactive` 的测试套件采用分层测试策略，覆盖从基础功能到应用场景的完整测试范围。测试设计遵循以下原则：

- **渐进式测试**：从单元测试到集成测试，再到应用示例
- **实用优先**：测试不仅仅验证功能，更展示实际使用方式
- **中文友好**：测试描述使用中文，提升本地化体验

## 🏗️ 测试架构

```
test/
├── basic.test.ts          # 基础功能测试
├── app-examples.test.ts   # 应用场景示例
├── local.ts              # 本地开发测试
├── npm.ts                # npm 包测试
└── readme.md             # 测试文档（本文档）
```

## 🧪 测试类型详解

### 1. 基础功能测试 (`basic.test.ts`)

**测试范围**：
- 构造函数参数验证
- 核心 CRUD 操作（get/set）
- 嵌套路径支持
- 链式调用机制
- 工具函数正确性

**测试策略**：
- **断言式测试**：每个功能点都有明确的断言验证
- **边界测试**：包含正常情况和异常情况
- **类型安全**：验证 TypeScript 类型推断的正确性

**示例**：
```typescript
// 构造函数验证 - 确保只接受响应式对象
test("构造函数验证", () => {
  const reactiveObj = reactive({ name: "test" });
  const store = new ISmartifyReactive(reactiveObj);
  assert(store instanceof ISmartifyReactive, "应该使用响应式对象创建实例");
});
```

### 2. 应用场景示例 (`app-examples.test.ts`)

**测试范围**：
- 完整应用工作流
- 业务逻辑集成
- 复杂状态管理
- 自定义功能扩展

**测试策略**：
- **端到端测试**：模拟真实应用的使用场景
- **功能组合测试**：验证多个方法协同工作
- **最佳实践演示**：展示推荐的使用方式

**示例应用**：
- **计数器应用**：演示状态更新、历史记录、自定义方法
- **待办事项应用**：演示 CRUD 操作、数据过滤、状态管理

## 🔬 测试设计原则

### 1. **响应式优先**
```typescript
// 严格验证响应式对象
const store = new ISmartifyReactive(reactive({ data: 1 })); // ✅ 通过
const store2 = new ISmartifyReactive({ data: 1 }); // ❌ 抛出错误
```

### 2. **链式操作友好**
```typescript
// 鼓励链式调用，提高代码可读性
store
  .set("user.name", "John")
  .set("user.age", 30)
  .tap(); // 调试输出
```

### 3. **路径操作直观**
```typescript
// 支持点号路径访问嵌套属性
store.get("user.profile.settings.theme");
store.set("app.config.api.endpoint", "https://api.example.com");
```

### 4. **扩展性强**
```typescript
// 通过 mixin 方法动态添加功能
store.mixin("customMethod", function(self, ...args) {
  // 自定义逻辑
  return result;
});
```

## 📊 测试覆盖范围

### 核心功能覆盖
- ✅ 响应式对象验证
- ✅ 基础 get/set 操作
- ✅ 嵌套路径支持
- ✅ 链式调用机制
- ✅ pick 方法数据选择
- ✅ tap 方法调试支持
- ✅ mixin 方法功能扩展
- ✅ call 方法动态调用
- ✅ exec 方法回调执行
- ✅ raw 方法原始访问

### 工具函数覆盖
- ✅ get 函数路径访问
- ✅ set 函数路径设置
- ✅ pick 函数属性选择
- ✅ isReactive 函数类型检测

### 应用场景覆盖
- ✅ 计数器应用完整流程
- ✅ 待办事项应用 CRUD 操作
- ✅ 数据过滤和状态管理
- ✅ 自定义业务逻辑集成

## 🚀 运行测试

### 运行所有测试
```bash
pnpm test
```

### 运行单个测试文件
```bash
tsx test/basic.test.ts
tsx test/app-examples.test.ts
```

### 开发时测试
```bash
tsx test/local.ts  # 本地开发测试
tsx test/npm.ts    # npm 包集成测试
```

## 📈 测试指标

- **测试文件数**：4 个
- **测试用例数**：26+ 个基础断言 + 2 个完整应用示例
- **覆盖范围**：100% 核心功能 + 实际应用场景
- **执行时间**：< 1 秒

## 🎯 测试目标

1. **功能正确性**：确保所有 API 按预期工作
2. **类型安全**：验证 TypeScript 类型推断的准确性
3. **性能表现**：确保操作在合理时间内完成
4. **使用友好**：提供清晰的错误信息和调试支持
5. **扩展性**：验证动态功能添加和组合使用

## 🔧 测试工具链

- **测试运行器**：tsx (TypeScript 执行环境)
- **断言库**：自定义轻量级断言函数
- **响应式引擎**：@vue/reactivity
- **工具库**：lodash (get, set, pick)

## 📝 测试编写指南

### 添加新测试
1. 在 `test/` 目录下创建新文件
2. 遵循现有命名约定：`*.test.ts`
3. 使用中文描述测试内容
4. 包含必要的导入和设置
5. 添加详细的断言验证

### 测试命名规范
- 文件名：`[功能描述].test.ts`
- 测试名：中文描述，如 `"构造函数验证"`
- 断言消息：中文描述，如 `"应该抛出正确的错误信息"`

### 测试结构模板
```typescript
import { reactive } from "@vue/reactivity";
import { ISmartifyReactive } from "../src";

test("测试名称", () => {
  // 准备测试数据
  const data = reactive({ /* ... */ });
  const store = new ISmartifyReactive(data);

  // 执行测试操作
  // ...

  // 验证结果
  assert(condition, "应该满足条件");
});
```

## 🎉 测试成果

通过精心设计的测试套件，`@ismartify/reactive` 确保了：

- **高质量代码**：全面的功能验证
- **用户友好**：清晰的使用示例
- **维护便利**：完整的测试文档
- **持续集成**：可靠的自动化测试

测试不仅仅是质量保障工具，更是用户学习和理解库功能的最佳指南！
