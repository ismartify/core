import { ISmartifyArkStore } from "../src/index";
import { type } from 'arktype';

// 创建存储实例
const store = new ISmartifyArkStore(type);

// console.log('=== ISmartifyArkStore 示例 ===\n');

// // 1. KV List模式 - 批量定义扁平化的key-schema映射
// console.log('1. KV List模式 - 批量定义');
// store.define({
//     'user.id': 'string',
//     'user.name': 'string.email',
//     'user.age': 'number', 
//     'user.email': 'string.email',
//     'user.isActive': 'boolean'
// });

// // 2. 精确路径定义
// console.log('2. 精确路径定义');
// store.define('app.version', 'string');
// store.define('app.debug', 'boolean');

// // 3. 测试KV List模式的精确验证
// console.log('3. 测试KV List模式验证');

// // 测试正确的数据
// try {
//     store.set('user.name', 'john@example.com'); // ✅ 正确的邮箱格式
//     store.set('user.age', 30); // ✅ 正确的数字
//     store.set('app.version', '1.0.0'); // ✅ 正确的字符串
//     console.log('✅ 正确数据验证通过');
// } catch (error) {
//     console.log('❌ 意外验证失败:', error.message);
// }

// // 测试错误的数据
// try {
//     console.log('尝试设置无效的user.name（应该是邮箱格式）...');
//     store.set('user.name', 'John Doe'); // ❌ 应该失败
//     console.log('❌ 意外通过了验证！');
// } catch (error) {
//     console.log('✅ 正确捕获验证错误:', error.message);
// }

// // 测试无schema的key（应该直接通过）
// try {
//     store.set('random.key', 'any value'); // 无schema，应该通过
//     console.log('✅ 无schema的key直接通过验证');
// } catch (error) {
//     console.log('❌ 无schema验证失败:', error.message);
// }

// // 4. 测试defineByObject方法
// console.log('\n4. 测试defineByObject方法');

// 示例对象
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
    },
    features: {
        darkMode: true,
        notifications: false,
        maxUsers: 1000
    }
};

// 方式1: 自动推断schema类型
console.log('方式1: 自动推断schema类型');
store.defineByObject(sampleConfig);
store.set('database.host', '127.0.0.1');
store.set('database.port', 5432);
store.set('database.username', 'admin@example.com');
store.set('database.ssl', true);
store.set('cache.redis.url', 'redis://localhost:6379');
store.set('cache.redis.ttl', 3600);
store.set('features.darkMode', true);
store.set('features.notifications', false);
store.set('features.maxUsers', 1000);

store.debug();

// 测试新的方法结构
console.log('\n=== 测试新的方法结构 ===');

// 1. 测试 defineByKey 方法
console.log('1. 测试 defineByKey 方法');
store.defineByKey('test.key1', 'string');
store.defineByKey('test.key2', 'number');
store.defineByKey('test.key3', 'string.email');

console.log('✅ defineByKey 方法测试完成');

// 2. 测试 define 方法的智能判断
console.log('\n2. 测试 define 方法的智能判断');

// 2.1 字符串参数 -> 调用 defineByKey
store.define('smart.test1', 'boolean');
console.log('✅ define(string, schema) -> defineByKey');

// 2.2 批量定义 -> 直接使用 defineByKey
store.defineByKey('batch.key1', 'string');
store.defineByKey('batch.key2', 'number');
store.defineByKey('batch.key3', 'boolean');
console.log('✅ 批量 defineByKey');

// 2.3 对象结构 -> 调用 defineByObject
const structureObj = {
  nested: {
    prop1: 'value1',
    prop2: 42,
    prop3: true
  }
};
store.define(structureObj);
console.log('✅ define(structureObject) -> defineByObject');

// 3. 验证所有方法都正常工作
console.log('\n3. 验证定义的 schema');
store.set('test.key1', 'hello');
store.set('test.key2', 123);
store.set('test.key3', 'test@example.com');
store.set('smart.test1', true);
store.set('batch.key1', 'batch value');
store.set('nested.prop1', 'new value');

console.log('test.key1:', store.get('test.key1'));
console.log('test.key2:', store.get('test.key2'));
console.log('test.key3:', store.get('test.key3'));
console.log('smart.test1:', store.get('smart.test1'));
console.log('batch.key1:', store.get('batch.key1'));
console.log('nested.prop1:', store.get('nested.prop1'));

// 测试 defaultValue 安全设置功能
console.log('\n=== 测试 defaultValue 安全设置功能 ===');

// 1. 测试验证失败时使用 defaultValue
console.log('1. 测试验证失败时使用 defaultValue');

// 先定义一些schema用于测试
store.define('safe.email', 'string.email');
store.define('safe.age', 'number');
store.define('safe.boolean', 'boolean');

// 测试邮箱验证失败时使用默认值
console.log('尝试设置无效邮箱，应该使用默认值...');
store.set('safe.email', 'invalid-email', 'default@example.com');
console.log('safe.email (验证失败 -> 默认值):', store.get('safe.email')); // 应该是 'default@example.com'

// 测试数字验证失败时使用默认值
console.log('尝试设置无效数字，应该使用默认值...');
store.set('safe.age', 'not-a-number', 25);
console.log('safe.age (验证失败 -> 默认值):', store.get('safe.age')); // 应该是 25

// 测试布尔值验证失败时使用默认值
console.log('尝试设置无效布尔值，应该使用默认值...');
store.set('safe.boolean', 'not-boolean', true);
console.log('safe.boolean (验证失败 -> 默认值):', store.get('safe.boolean')); // 应该是 true

// 2. 测试正确值不会被替换
console.log('\n2. 测试正确值不会被替换');

store.set('safe.email', 'valid@example.com', 'fallback@example.com');
console.log('safe.email (正确值):', store.get('safe.email')); // 应该是 'valid@example.com'

store.set('safe.age', 30, 0);
console.log('safe.age (正确值):', store.get('safe.age')); // 应该是 30

// 3. 测试没有defaultValue时仍然抛出错误
console.log('\n3. 测试没有defaultValue时仍然抛出错误');

try {
    store.set('safe.email', 'invalid-email-no-default');
    console.log('❌ 应该抛出错误但没有！');
} catch (error) {
    console.log('✅ 正确抛出验证错误:', error.message);
}

// 4. 测试对象方式的安全设置
console.log('\n4. 测试对象方式的安全设置');

// 定义更多schema
store.define('user.name', 'string');
store.define('user.email', 'string.email');
store.define('user.age', 'number');

// 测试对象中包含无效值时使用默认值
// 注意：需要为不同类型的字段提供合适的默认值
console.log('测试user.name (string类型)...');
store.set({'user.name': 123}, 'Default Name'); // 数字 -> 字符串默认值
console.log('user.name (验证失败 -> 默认值):', store.get('user.name')); // 应该是 'Default Name'

console.log('测试user.email (email类型)...');
store.set({'user.email': 'invalid-email'}, 'default@example.com'); // 无效邮箱 -> 有效邮箱默认值
console.log('user.email (验证失败 -> 默认值):', store.get('user.email')); // 应该是 'default@example.com'

console.log('测试user.age (number类型)...');
store.set({'user.age': 'not-a-number'}, 25); // 字符串 -> 数字默认值
console.log('user.age (验证失败 -> 默认值):', store.get('user.age')); // 应该是 25

// 5. 测试defaultValue本身也需要验证
console.log('\n5. 测试defaultValue本身也需要验证');

try {
    // defaultValue本身也是无效的，应该抛出错误
    store.set('safe.email', 'invalid-email', 'invalid-default-email');
    console.log('❌ 应该抛出错误但没有！');
} catch (error) {
    console.log('✅ 正确抛出defaultValue验证错误:', error.message);
}

// 测试 defineByKey 对点路径的支持
console.log('\n=== 测试 defineByKey 点路径支持 ===');

// 测试深层嵌套路径
store.defineByKey('deep.nested.path.email', 'string.email');
store.defineByKey('deep.nested.path.age', 'number');
store.defineByKey('deep.nested.path.active', 'boolean');

// 测试复杂路径
store.defineByKey('app.config.database.connection.timeout', 'number');
store.defineByKey('user.profile.social.links.github', 'string');

console.log('✅ defineByKey 支持点路径定义');

// 设置和获取数据
store.set('deep.nested.path.email', 'test@example.com');
store.set('deep.nested.path.age', 25);
store.set('deep.nested.path.active', true);
store.set('app.config.database.connection.timeout', 5000);
store.set('user.profile.social.links.github', 'https://github.com/user');

console.log('deep.nested.path.email:', store.get('deep.nested.path.email'));
console.log('deep.nested.path.age:', store.get('deep.nested.path.age'));
console.log('deep.nested.path.active:', store.get('deep.nested.path.active'));
console.log('app.config.database.connection.timeout:', store.get('app.config.database.connection.timeout'));
console.log('user.profile.social.links.github:', store.get('user.profile.social.links.github'));

// 测试验证
try {
  store.set('deep.nested.path.email', 'invalid-email', 'fallback@example.com');
  console.log('✅ 点路径验证和安全设置正常工作');
  console.log('验证失败后的值:', store.get('deep.nested.path.email'));
} catch (error) {
  console.log('验证错误:', error.message);
}

// 测试 ISmartifyArkJsonSchema 扩展类
console.log('\n=== 测试 ISmartifyArkJsonSchema 扩展类 ===');

import { ISmartifyArkJsonSchema } from '../src/libs/jsonschema';

// 创建 JSON Schema 扩展实例
const jsonSchemaStore = new ISmartifyArkJsonSchema(type);

// 定义一些 schema
jsonSchemaStore.defineByKey('user.name', 'string');
jsonSchemaStore.defineByKey('user.email', 'string.email');
jsonSchemaStore.defineByKey('user.age', 'number');
jsonSchemaStore.defineByKey('user.active', 'boolean');
jsonSchemaStore.defineByKey('settings.theme', '"light" | "dark"');
jsonSchemaStore.defineByKey('tags', 'string[]');
jsonSchemaStore.defineByKey('config.database.host', 'string');
jsonSchemaStore.defineByKey('config.database.port', 'number');

console.log('✅ 定义了多种类型的 schema');

// 测试转换特定键的 schema
console.log('\n1. 转换特定键的 schema:');
try {
  const userEmailSchema = jsonSchemaStore.toJSONSchema('user.email');
  console.log('user.email schema:', JSON.stringify(userEmailSchema, null, 2));
  
  const themeSchema = jsonSchemaStore.toJSONSchema('settings.theme');
  console.log('settings.theme schema:', JSON.stringify(themeSchema, null, 2));
} catch (error) {
  console.log('转换错误:', error.message);
}

// 测试转换所有 schema
console.log('\n2. 转换所有 schema:');
try {
  const allSchemas = jsonSchemaStore.toJSONSchema();
  console.log('所有 schemas:', JSON.stringify(allSchemas, null, 2));
} catch (error) {
  console.log('转换错误:', error.message);
}

// 测试获取完整的 JSON Schema
console.log('\n3. 获取完整的 JSON Schema:');
try {
  const fullSchema = jsonSchemaStore.getFullJSONSchema(
    'User Configuration Schema',
    'Schema for user and application configuration'
  );
  console.log('完整 schema:', JSON.stringify(fullSchema, null, 2));
} catch (error) {
  console.log('获取完整 schema 错误:', error.message);
}

// 测试导出 JSON Schema 字符串
console.log('\n4. 导出 JSON Schema 字符串:');
try {
  const schemaString = jsonSchemaStore.exportJSONSchema(true);
  console.log('导出的 schema 字符串长度:', schemaString.length);
  console.log('前 200 个字符:', schemaString.substring(0, 200) + '...');
} catch (error) {
  console.log('导出错误:', error.message);
}

// const { store: storeData, schema: schemaData } = store.raw();

// console.log(schemaData.keys());

// // 方式2: 为所有字段指定相同的schema
// console.log('\n方式2: 为所有字段指定统一schema');
// const simpleObj = {
//     title: 'Test Title',
//     description: 'Test Description',
//     nested: {
//         subtitle: 'Nested Title'
//     }
// };
// store.defineByObject(simpleObj, 'string');

// // 测试自动推断的schema验证
// console.log('\n测试自动推断的schema验证:');
// try {
//     store.set('database.host', 'new-host'); // ✅ string
//     store.set('database.port', 3306); // ✅ number  
//     store.set('database.ssl', false); // ✅ boolean
//     store.set('database.username', 'user@test.com'); // ✅ string.email
//     console.log('✅ 自动推断schema验证通过');
// } catch (error) {
//     console.log('❌ 自动推断schema验证失败:', error.message);
// }

// // 测试验证失败的情况
// try {
//     console.log('尝试设置错误类型的database.port...');
//     store.set('database.port', 'not-a-number'); // ❌ 应该是number
//     console.log('❌ 意外通过了验证！');
// } catch (error) {
//     console.log('✅ 正确捕获类型错误:', error.message);
// }

// // 2. 定义嵌套路径模式
// console.log('2. 定义嵌套路径模式');
// store.define('user.profile', {
//     avatar: 'string',
//     bio: 'string',
//     preferences: {
//         theme: '"light" | "dark"',
//         language: 'string'
//     }
// });

// store.define('user.settings.notifications', {
//     email: 'boolean',
//     push: 'boolean',
//     sms: 'boolean'
// });

// // 3. 设置数据 - 键值对方式
// console.log('\n3. 设置数据 - 键值对方式');
// store.set('id', 'user_001');
// store.set('name', 'John Doe');
// store.set('age', 30);
// store.set('email', 'john@example.com');
// store.set('isActive', true);

// // 设置嵌套路径数据
// store.set('user.profile.avatar', 'https://example.com/avatar.jpg');
// store.set('user.profile.bio', 'Full-stack developer');
// store.set('user.profile.preferences.theme', 'dark');
// store.set('user.profile.preferences.language', 'zh-CN');

// store.set('user.settings.notifications.email', true);
// store.set('user.settings.notifications.push', false);
// store.set('user.settings.notifications.sms', true);

// console.log('✅ 数据设置完成');

// // 4. 设置数据 - 对象方式
// console.log('\n4. 设置数据 - 对象方式');
// // 注意：这里不使用全局schema验证的对象，而是设置独立的字段
// store.set({
//     role: 'admin',
//     permissions: ['read', 'write', 'delete'],
//     'app.config.theme': 'dark',
//     'app.config.version': '1.0.0',
//     'app.features.darkMode': true,
//     'app.features.notifications': false
// });

// console.log('✅ 对象数据设置完成');

// // 5. 获取数据
// console.log('\n5. 获取数据示例');
// console.log('用户名:', store.get('name'));
// console.log('年龄:', store.get('age'));
// console.log('头像:', store.get('user.profile.avatar'));
// console.log('主题偏好:', store.get('user.profile.preferences.theme'));
// console.log('邮件通知:', store.get('user.settings.notifications.email'));
// console.log('应用版本:', store.get('app.config.version'));
// console.log('暗黑模式:', store.get('app.features.darkMode'));

// // 获取不存在的键（带默认值）
// console.log('不存在的键（带默认值）:', store.get('nonexistent', 'default_value'));

// // 6. 检查键是否存在
// console.log('\n6. 检查键是否存在');
// console.log('name 存在:', store.has('name'));
// console.log('user.profile.avatar 存在:', store.has('user.profile.avatar'));
// console.log('nonexistent 存在:', store.has('nonexistent'));

// // 7. 查看存储统计
// console.log('\n7. 存储统计');
// console.log('存储项数量:', store.size());
// console.log('所有键:', Array.from(store.keys()));

// // 8. 删除数据
// console.log('\n8. 删除数据');
// console.log('删除 role:', store.delete('role'));
// console.log('删除 user.profile.bio:', store.delete('user.profile.bio'));
// console.log('删除后存储项数量:', store.size());

// // 9. 查看原始Map数据
// console.log('\n9. 原始Map数据');
// console.log('原始存储:', store.raw());

// // 10. 遍历所有数据
// console.log('\n10. 遍历所有数据');
// for (const [key, value] of store.entries()) {
//     console.log(`${key}: ${JSON.stringify(value)}`);
// }

// // 11. exec方法示例 - 执行自定义函数
// console.log('\n11. exec方法示例');

// // 示例1: 统计特定前缀的键数量
// const userKeysCount = store.exec((store) => {
//     const keys = Array.from(store.keys());
//     return keys.filter(key => key.startsWith('user.')).length;
// });
// console.log('以"user."开头的键数量:', userKeysCount);

// // 示例2: 批量获取用户配置
// const userConfig = store.exec((store) => {
//     const config = {};
//     const keys = Array.from(store.keys());
    
//     keys.filter(key => key.startsWith('user.profile.preferences.'))
//         .forEach(key => {
//             const shortKey = key.replace('user.profile.preferences.', '');
//             config[shortKey] = store.get(key);
//         });
    
//     return config;
// });
// console.log('用户偏好配置:', userConfig);

// // 示例3: 数据验证和清理
// const cleanupResult = store.exec((store) => {
//     const keys = Array.from(store.keys());
//     let deletedCount = 0;
    
//     // 删除所有空值
//     keys.forEach(key => {
//         const value = store.get(key);
//         if (value === null || value === undefined || value === '') {
//             store.delete(key);
//             deletedCount++;
//         }
//     });
    
//     return { deletedCount, remainingCount: store.size() };
// });
// console.log('清理结果:', cleanupResult);

// // 示例4: 链式操作
// const chainResult = store.exec((store) => {
//     return store
//         .set('temp.test', 'test_value')
//         .set('temp.count', 42)
//         .get('temp.test');
// });
// console.log('链式操作结果:', chainResult);

// // 12. arktype验证示例
// console.log('\n12. arktype验证示例');

// // 首先定义一些具体的字段schema用于测试
// store.define('testAge', 'number');
// store.define('testEmail', 'string.email');

// try {
//     // 正确的数据 - 应该通过验证
//     store.set('validUser', 'user_002');
//     store.set('testAge', 25);
//     store.set('testEmail', 'test@example.com');
//     console.log('✅ 正确数据验证通过');
    
//     // 错误的数据类型 - 应该抛出错误
//     console.log('尝试设置错误的年龄类型...');
//     store.set('testAge', 'not_a_number'); // 应该是number类型
// } catch (error) {
//     console.log('❌ 验证失败:', error.message);
// }

// try {
//     // 测试邮箱验证
//     console.log('尝试设置无效邮箱...');
//     store.set('email', 'invalid_email'); // 应该是有效邮箱格式
// } catch (error) {
//     console.log('❌ 邮箱验证失败:', error.message);
// }

// try {
//     // 测试嵌套路径验证
//     console.log('尝试设置无效的主题偏好...');
//     store.set('user.profile.preferences.theme', 'invalid_theme'); // 应该是 "light" | "dark"
// } catch (error) {
//     console.log('❌ 主题验证失败:', error.message);
// }

// // 测试批量对象验证
// try {
//     console.log('尝试批量设置包含错误数据的对象...');
//     store.set({
//         validField: 'valid_value',
//         age: 'invalid_age', // 错误类型
//         email: 'valid@email.com'
//     });
// } catch (error) {
//     console.log('❌ 批量验证失败:', error.message);
// }

// console.log('\n=== 示例完成 ===');

// store.debug();