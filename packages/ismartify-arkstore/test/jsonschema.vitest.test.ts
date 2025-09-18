import { describe, it, expect, beforeEach } from 'vitest';
import { ISmartifyArkJsonSchema } from '../src/libs/jsonschema';
import { type } from 'arktype';

describe('ISmartifyArkJsonSchema', () => {
  let store: ISmartifyArkJsonSchema;

  beforeEach(() => {
    store = new ISmartifyArkJsonSchema(type);
  });

  describe('实例创建', () => {
    it('应该能够创建 ISmartifyArkJsonSchema 实例', () => {
      expect(store).toBeInstanceOf(ISmartifyArkJsonSchema);
    });

    it('应该继承 ISmartifyArkStore 的所有方法', () => {
      const expectedMethods = [
        'defineByKey', 'define', 'defineByObject', 'set', 'get',
        'toJSONSchema', 'createCompositeSchema', 'getFullJSONSchema', 'exportJSONSchema'
      ];
      
      expectedMethods.forEach(method => {
        expect(typeof store[method]).toBe('function');
      });
    });
  });

  describe('基础类型转换', () => {
    beforeEach(() => {
      store.defineByKey('test.string', 'string');
      store.defineByKey('test.number', 'number');
      store.defineByKey('test.boolean', 'boolean');
    });

    it('应该能够转换 string 类型', () => {
      const schema = store.toJSONSchema('test.string');
      expect(schema.type).toBe('string');
      expect(schema.$schema).toBe('https://json-schema.org/draft/2020-12/schema');
    });

    it('应该能够转换 number 类型', () => {
      const schema = store.toJSONSchema('test.number');
      expect(schema.type).toBe('number');
    });

    it('应该能够转换 boolean 类型', () => {
      const schema = store.toJSONSchema('test.boolean');
      expect(schema.type).toBe('boolean');
    });
  });

  describe('高级类型转换', () => {
    it('应该能够转换 email 类型', () => {
      store.defineByKey('test.email', 'string.email');
      const schema = store.toJSONSchema('test.email');
      
      expect(schema.type).toBe('string');
      expect(schema.format).toBe('email');
      expect(schema.pattern).toBeDefined();
    });

    it('应该能够转换联合类型', () => {
      store.defineByKey('test.role', '"admin" | "user" | "guest"');
      const schema = store.toJSONSchema('test.role');
      
      expect(schema.enum).toEqual(expect.arrayContaining(['admin', 'user', 'guest']));
    });

    it('应该能够转换数组类型', () => {
      store.defineByKey('test.tags', 'string[]');
      const schema = store.toJSONSchema('test.tags');
      
      expect(schema.type).toBe('array');
      expect(schema.items.type).toBe('string');
    });

    it('应该能够转换带约束的数字类型', () => {
      store.defineByKey('test.age', 'number >= 18');
      const schema = store.toJSONSchema('test.age');
      
      expect(schema.type).toBe('number');
      expect(schema.minimum).toBe(18);
    });

    it('应该能够转换带范围约束的数字类型', () => {
      store.defineByKey('test.port', 'number >= 1 <= 65535');
      const schema = store.toJSONSchema('test.port');
      
      expect(schema.type).toBe('number');
      expect(schema.minimum).toBe(1);
      expect(schema.maximum).toBe(65535);
    });
  });

  describe('嵌套结构转换', () => {
    beforeEach(() => {
      store.defineByKey('user.name', 'string');
      store.defineByKey('user.email', 'string.email');
      store.defineByKey('user.age', 'number');
      store.defineByKey('config.database.host', 'string');
      store.defineByKey('config.database.port', 'number');
    });

    it('应该能够转换所有 schema 为嵌套结构', () => {
      const allSchemas = store.toJSONSchema();
      
      expect(allSchemas.type).toBe('object');
      expect(allSchemas.properties).toBeDefined();
      expect(allSchemas.properties.user).toBeDefined();
      expect(allSchemas.properties.config).toBeDefined();
      
      expect(allSchemas.properties.user.properties.name).toBeDefined();
      expect(allSchemas.properties.user.properties.email).toBeDefined();
      expect(allSchemas.properties.config.properties.database).toBeDefined();
    });
  });

  describe('复合 Schema 创建', () => {
    it('应该能够创建复合 schema', () => {
      const compositeSchema = store.createCompositeSchema({
        name: 'string',
        email: 'string.email',
        age: 'number >= 18',
        'profile?': {
          bio: 'string',
          avatar: 'string'
        }
      });
      
      expect(compositeSchema.type).toBe('object');
      expect(compositeSchema.properties).toBeDefined();
      expect(compositeSchema.required).toEqual(
        expect.arrayContaining(['name', 'email', 'age'])
      );
      expect(compositeSchema.required).not.toContain('profile');
    });
  });

  describe('完整 JSON Schema 文档', () => {
    beforeEach(() => {
      store.defineByKey('user.name', 'string');
      store.defineByKey('user.email', 'string.email');
    });

    it('应该能够获取完整的 JSON Schema 文档', () => {
      const fullSchema = store.getFullJSONSchema(
        'Test Schema',
        'Test description'
      );
      
      expect(fullSchema.$schema).toBe('https://json-schema.org/draft/2020-12/schema');
      expect(fullSchema.$id).toBe('https://ismartify.com/schemas/arkstore');
      expect(fullSchema.title).toBe('Test Schema');
      expect(fullSchema.description).toBe('Test description');
      expect(fullSchema.type).toBe('object');
    });

    it('应该能够导出 JSON Schema 字符串', () => {
      const compactString = store.exportJSONSchema(false);
      const prettyString = store.exportJSONSchema(true);
      
      expect(typeof compactString).toBe('string');
      expect(typeof prettyString).toBe('string');
      expect(prettyString.length).toBeGreaterThan(compactString.length);
      
      // 验证是否为有效的 JSON
      const parsed = JSON.parse(compactString);
      expect(parsed.$schema).toBeDefined();
    });
  });

  describe('错误处理', () => {
    it('转换不存在的键应该抛出错误', () => {
      expect(() => {
        store.toJSONSchema('nonexistent.key');
      }).toThrow('Schema not found');
    });
  });

  describe('数据验证集成', () => {
    beforeEach(() => {
      store.defineByKey('validation.age', 'number >= 18');
      store.defineByKey('validation.email', 'string.email');
    });

    it('应该支持数据验证和安全设置', () => {
      // 测试正常值
      store.set('validation.age', 25);
      store.set('validation.email', 'test@example.com');
      
      expect(store.get('validation.age')).toBe(25);
      expect(store.get('validation.email')).toBe('test@example.com');
      
      // 测试安全设置
      store.set('validation.age', 15, 18);
      store.set('validation.email', 'invalid-email', 'default@example.com');
      
      expect(store.get('validation.age')).toBe(18);
      expect(store.get('validation.email')).toBe('default@example.com');
    });
  });

  describe('复杂嵌套 Schema', () => {
    it('应该支持复杂的嵌套 schema 验证', () => {
      const complexSchema = store.createCompositeSchema({
        user: {
          name: 'string',
          email: 'string.email',
          age: 'number >= 18',
          roles: 'string[]',
          'profile?': {
            bio: 'string',
            avatar: 'string',
            social: {
              github: 'string',
              twitter: 'string'
            }
          }
        },
        config: {
          theme: '"light" | "dark"',
          notifications: 'boolean',
          'advanced?': {
            debugMode: 'boolean',
            logLevel: '"info" | "warn" | "error"'
          }
        }
      });
      
      expect(complexSchema.type).toBe('object');
      expect(complexSchema.properties.user).toBeDefined();
      expect(complexSchema.properties.config).toBeDefined();
      
      // 验证嵌套结构
      const userSchema = complexSchema.properties.user;
      expect(userSchema.type).toBe('object');
      expect(userSchema.properties.name).toBeDefined();
      expect(userSchema.properties.profile).toBeDefined();
      
      // 验证可选字段
      expect(userSchema.required).not.toContain('profile');
      expect(complexSchema.properties.config.required).not.toContain('advanced');
    });
  });
});
