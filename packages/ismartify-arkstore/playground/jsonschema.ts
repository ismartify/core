import { ISmartifyArkJsonSchema } from '../src/libs/jsonschema';
import { type } from 'arktype';

console.log('=== ISmartifyArkJsonSchema 简单示例 ===\n');

// 创建 JSON Schema 扩展实例
const store = new ISmartifyArkJsonSchema(type);

// 1. 定义基础类型的 schema
console.log('1. 定义基础类型 schema');
store.defineByKey('user.name', 'string');
store.defineByKey('user.email', 'string.email');
store.defineByKey('user.age', 'number >= 18');
store.defineByKey('user.active', 'boolean');

// 2. 定义复杂类型的 schema
console.log('2. 定义复杂类型 schema');
store.defineByKey('user.role', '"admin" | "user" | "guest"');
store.defineByKey('user.tags', 'string[]');
store.defineByKey('user.score', 'number >= 0 <= 100');

// 3. 定义嵌套配置 schema
console.log('3. 定义嵌套配置 schema');
store.defineByKey('config.database.host', 'string');
store.defineByKey('config.database.port', 'number >= 1 <= 65535');
store.defineByKey('config.database.ssl', 'boolean');
store.defineByKey('config.cache.ttl', 'number >= 0');

console.log('✅ Schema 定义完成\n');

// 4. 转换特定键的 schema
console.log('4. 转换特定键的 JSON Schema:');

try {
  const emailSchema = store.toJSONSchema('user.email');
  console.log('user.email schema:');
  console.log(JSON.stringify(emailSchema, null, 2));
  console.log();

  const roleSchema = store.toJSONSchema('user.role');
  console.log('user.role schema:');
  console.log(JSON.stringify(roleSchema, null, 2));
  console.log();

  const portSchema = store.toJSONSchema('config.database.port');
  console.log('config.database.port schema:');
  console.log(JSON.stringify(portSchema, null, 2));
  console.log();
} catch (error) {
  console.error('转换特定键失败:', error);
}

// 5. 转换所有 schema 为嵌套结构
console.log('5. 转换所有 schema 为嵌套 JSON Schema:');

try {
  const allSchemas = store.toJSONSchema();
  console.log('完整的嵌套 schema:');
  console.log(JSON.stringify(allSchemas, null, 2));
  console.log();
} catch (error) {
  console.error('转换所有 schema 失败:', error);
}

// 6. 创建复合 schema
console.log('6. 创建复合 schema:');

try {
  const userSchema = store.createCompositeSchema({
    name: 'string',
    email: 'string.email',
    age: 'number >= 18',
    role: '"admin" | "user" | "guest"',
    'profile?': {
      bio: 'string',
      avatar: 'string'
    }
  });
  
  console.log('复合用户 schema:');
  console.log(JSON.stringify(userSchema, null, 2));
  console.log();
} catch (error) {
  console.error('创建复合 schema 失败:', error);
}

// 7. 获取完整的 JSON Schema 文档
console.log('7. 获取完整的 JSON Schema 文档:');

try {
  const fullSchema = store.getFullJSONSchema(
    'User Management Schema',
    'Complete schema for user management and configuration'
  );
  
  console.log('完整的 JSON Schema 文档:');
  console.log(JSON.stringify(fullSchema, null, 2));
  console.log();
} catch (error) {
  console.error('获取完整 schema 失败:', error);
}

// 8. 导出为字符串
console.log('8. 导出 JSON Schema 字符串:');

try {
  const schemaString = store.exportJSONSchema(false); // 不格式化
  console.log('压缩的 schema 字符串长度:', schemaString.length);
  console.log('前 100 个字符:', schemaString.substring(0, 100) + '...');
  console.log();
  
  const prettySchemaString = store.exportJSONSchema(true); // 格式化
  console.log('格式化的 schema 字符串长度:', prettySchemaString.length);
  console.log('前 200 个字符:');
  console.log(prettySchemaString.substring(0, 200) + '...');
} catch (error) {
  console.error('导出 schema 字符串失败:', error);
}

// 9. 实际数据验证示例
console.log('\n9. 实际数据验证示例:');

// 设置一些测试数据
store.set('user.name', 'John Doe');
store.set('user.email', 'john@example.com');
store.set('user.age', 25);
store.set('user.active', true);
store.set('user.role', 'admin');
store.set('user.tags', ['developer', 'admin']);
store.set('user.score', 85);

store.set('config.database.host', 'localhost');
store.set('config.database.port', 5432);
store.set('config.database.ssl', true);
store.set('config.cache.ttl', 3600);

console.log('✅ 测试数据设置完成');

// 验证数据
console.log('\n当前存储的数据:');
console.log('user.name:', store.get('user.name'));
console.log('user.email:', store.get('user.email'));
console.log('user.age:', store.get('user.age'));
console.log('user.role:', store.get('user.role'));
console.log('user.tags:', store.get('user.tags'));
console.log('config.database.port:', store.get('config.database.port'));

// 测试验证失败的安全设置
console.log('\n测试验证失败的安全设置:');
try {
  store.set('user.age', 15, 18); // 年龄不满足 >= 18，使用默认值 18
  console.log('user.age (验证失败后):', store.get('user.age'));
  
  store.set('user.role', 'invalid-role', 'user'); // 无效角色，使用默认值 'user'
  console.log('user.role (验证失败后):', store.get('user.role'));
  
  store.set('config.database.port', 99999, 5432); // 端口超出范围，使用默认值 5432
  console.log('config.database.port (验证失败后):', store.get('config.database.port'));
} catch (error) {
  console.error('验证失败:', error.message);
}

console.log('\n=== 示例完成 ===');
