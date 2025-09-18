import { describe, it, expect, beforeEach } from 'vitest';
import { ISmartifyArkStore } from '../src/index';
import { type } from 'arktype';

describe('ISmartifyArkStore', () => {
  let store: ISmartifyArkStore;

  beforeEach(() => {
    store = new ISmartifyArkStore(type);
  });

  describe('实例创建', () => {
    it('应该能够创建实例', () => {
      expect(store).toBeInstanceOf(ISmartifyArkStore);
    });

    it('应该包含所有必需的方法', () => {
      const expectedMethods = [
        'defineByKey', 'define', 'defineByObject', 'set', 'get', 
        'has', 'delete', 'clear', 'size', 'keys', 'values', 
        'entries', 'raw', 'exec', 'debug', 'isArkType'
      ];
      
      expectedMethods.forEach(method => {
        expect(typeof store[method]).toBe('function');
      });
    });
  });

  describe('Schema 定义', () => {
    it('应该能够使用 defineByKey 定义基础类型', () => {
      store.defineByKey('test.string', 'string');
      store.defineByKey('test.number', 'number');
      store.defineByKey('test.boolean', 'boolean');
      
      const { schema } = store.raw();
      expect(schema.has('test.string')).toBe(true);
      expect(schema.has('test.number')).toBe(true);
      expect(schema.has('test.boolean')).toBe(true);
    });

    it('应该能够使用 define 方法的智能判断', () => {
      store.define('user.name', 'string');
      store.define('user.email', 'string.email');
      
      const { schema } = store.raw();
      expect(schema.has('user.name')).toBe(true);
      expect(schema.has('user.email')).toBe(true);
    });

    it('应该能够使用 defineByObject 自动推断类型', () => {
      const sampleConfig = {
        database: {
          host: 'localhost',
          port: 5432,
          ssl: true
        },
        cache: {
          ttl: 3600
        }
      };
      
      store.defineByObject(sampleConfig);
      
      const { schema } = store.raw();
      expect(schema.has('database.host')).toBe(true);
      expect(schema.has('database.port')).toBe(true);
      expect(schema.has('database.ssl')).toBe(true);
      expect(schema.has('cache.ttl')).toBe(true);
    });
  });

  describe('数据操作', () => {
    beforeEach(() => {
      store.defineByKey('user.name', 'string');
      store.defineByKey('user.email', 'string.email');
      store.defineByKey('user.age', 'number');
    });

    it('应该能够设置和获取数据', () => {
      store.set('user.name', 'John Doe');
      store.set('user.email', 'john@example.com');
      store.set('user.age', 30);
      
      expect(store.get('user.name')).toBe('John Doe');
      expect(store.get('user.email')).toBe('john@example.com');
      expect(store.get('user.age')).toBe(30);
    });

    it('应该能够使用对象方式设置数据', () => {
      store.set({
        'user.name': 'Jane Doe',
        'user.email': 'jane@example.com',
        'user.age': 25
      });
      
      expect(store.get('user.name')).toBe('Jane Doe');
      expect(store.get('user.email')).toBe('jane@example.com');
      expect(store.get('user.age')).toBe(25);
    });

    it('应该支持安全设置机制', () => {
      // 设置无效邮箱，应该使用默认值
      store.set('user.email', 'invalid-email', 'fallback@example.com');
      expect(store.get('user.email')).toBe('fallback@example.com');
    });

    it('应该支持 get 方法的默认值', () => {
      const value = store.get('nonexistent.key', 'default-value');
      expect(value).toBe('default-value');
    });
  });

  describe('基础操作', () => {
    beforeEach(() => {
      store.defineByKey('test.key', 'string');
      store.set('test.key', 'test value');
    });

    it('应该能够检查键是否存在', () => {
      expect(store.has('test.key')).toBe(true);
      expect(store.has('nonexistent.key')).toBe(false);
    });

    it('应该能够删除键', () => {
      expect(store.delete('test.key')).toBe(true);
      expect(store.has('test.key')).toBe(false);
    });

    it('应该能够获取存储大小', () => {
      expect(store.size()).toBe(1);
      store.set('another.key', 'value');
      expect(store.size()).toBe(2);
    });

    it('应该能够清空存储', () => {
      store.clear();
      expect(store.size()).toBe(0);
    });
  });

  describe('迭代器方法', () => {
    beforeEach(() => {
      store.defineByKey('key1', 'string');
      store.defineByKey('key2', 'number');
      store.set('key1', 'value1');
      store.set('key2', 42);
    });

    it('应该能够迭代键', () => {
      const keys = Array.from(store.keys());
      expect(keys).toContain('key1');
      expect(keys).toContain('key2');
    });

    it('应该能够迭代值', () => {
      const values = Array.from(store.values());
      expect(values).toContain('value1');
      expect(values).toContain(42);
    });

    it('应该能够迭代键值对', () => {
      const entries = Array.from(store.entries());
      const entryMap = new Map(entries);
      expect(entryMap.get('key1')).toBe('value1');
      expect(entryMap.get('key2')).toBe(42);
    });
  });

  describe('工具方法', () => {
    it('应该能够执行自定义逻辑', () => {
      store.defineByKey('test.key', 'string');
      store.set('test.key', 'test value');
      
      const result = store.exec((store) => {
        return {
          value: store.get('test.key'),
          size: store.size()
        };
      });
      
      expect(result.value).toBe('test value');
      expect(result.size).toBe(1);
    });

    it('应该能够获取原始访问', () => {
      store.defineByKey('test.key', 'string');
      store.set('test.key', 'value');
      
      const { store: rawStore, schema: rawSchema } = store.raw();
      expect(rawStore.has('test.key')).toBe(true);
      expect(rawSchema.has('test.key')).toBe(true);
    });

    it('debug 方法应该返回 this', () => {
      const result = store.debug();
      expect(result).toBe(store);
    });
  });

  describe('复杂场景', () => {
    it('应该支持深层嵌套路径', () => {
      store.defineByKey('app.config.database.connection.timeout', 'number');
      store.set('app.config.database.connection.timeout', 5000);
      
      expect(store.get('app.config.database.connection.timeout')).toBe(5000);
    });

    it('应该支持嵌套对象扁平化', () => {
      store.defineByKey('user.profile.name', 'string');
      store.defineByKey('user.settings.theme', 'string');
      
      store.set({
        user: {
          profile: {
            name: 'John Doe'
          },
          settings: {
            theme: 'dark'
          }
        }
      });
      
      expect(store.get('user.profile.name')).toBe('John Doe');
      expect(store.get('user.settings.theme')).toBe('dark');
    });

    it('应该支持链式调用', () => {
      const result = store
        .defineByKey('test1', 'string')
        .defineByKey('test2', 'number')
        .set('test1', 'value1')
        .set('test2', 42);
      
      expect(result).toBe(store);
      expect(store.get('test1')).toBe('value1');
      expect(store.get('test2')).toBe(42);
    });
  });
});
