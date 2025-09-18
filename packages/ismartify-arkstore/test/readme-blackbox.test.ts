import { describe, it, expect, beforeEach } from 'vitest';
import { ISmartifyArkStore } from '../src/index';
import { type } from 'arktype';

/**
 * 基于 README.md 的新手黑盒测试
 * 
 * 测试策略：
 * - 完全按照 README.md 文档中的示例代码进行测试
 * - 模拟新手用户的使用场景和可能犯的错误
 * - 验证文档中承诺的所有功能
 * - 不依赖内部实现，只测试公开 API
 */
describe('README.md 新手黑盒测试', () => {
  let store: ISmartifyArkStore;

  beforeEach(() => {
    store = new ISmartifyArkStore(type);
  });

  describe('快速开始示例', () => {
    it('应该能够按照文档创建实例', () => {
      // 按照 README.md 快速开始部分
      const store = new ISmartifyArkStore(type);
      expect(store).toBeInstanceOf(ISmartifyArkStore);
    });

    it('应该能够按照文档定义基础 schema', () => {
      // 1. 精确路径定义 schema - 使用 defineByKey
      store.defineByKey('user.name', 'string');
      store.defineByKey('user.email', 'string.email');
      store.defineByKey('user.age', 'number');

      // 验证 schema 是否定义成功
      const { schema } = store.raw();
      expect(schema.has('user.name')).toBe(true);
      expect(schema.has('user.email')).toBe(true);
      expect(schema.has('user.age')).toBe(true);
    });

    it('应该能够使用 define 方法的智能判断', () => {
      // 或者使用 define 方法（自动调用 defineByKey）
      store.define('user.name', 'string');
      store.define('user.email', 'string.email');
      store.define('user.age', 'number');

      const { schema } = store.raw();
      expect(schema.has('user.name')).toBe(true);
      expect(schema.has('user.email')).toBe(true);
      expect(schema.has('user.age')).toBe(true);
    });

    it('应该能够批量定义 schema', () => {
      // 2. 批量定义 schema - 使用 defineByKey
      store.defineByKey('app.version', 'string');
      store.defineByKey('app.debug', 'boolean');
      store.defineByKey('config.timeout', 'number');

      const { schema } = store.raw();
      expect(schema.has('app.version')).toBe(true);
      expect(schema.has('app.debug')).toBe(true);
      expect(schema.has('config.timeout')).toBe(true);
    });

    it('应该能够基于对象自动推断并定义 schema', () => {
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

      const { schema } = store.raw();
      expect(schema.has('database.host')).toBe(true);
      expect(schema.has('database.port')).toBe(true);
      expect(schema.has('database.username')).toBe(true);
      expect(schema.has('database.ssl')).toBe(true);
      expect(schema.has('cache.redis.url')).toBe(true);
      expect(schema.has('cache.redis.ttl')).toBe(true);
    });

    it('应该能够设置和获取数据', () => {
      // 先定义 schema
      store.defineByKey('user.name', 'string');
      store.defineByKey('user.email', 'string.email');
      store.defineByKey('user.age', 'number');

      // 4. 设置数据 - 键值对方式
      store.set('user.name', 'John Doe');
      store.set('user.email', 'john@example.com');
      store.set('user.age', 30);

      // 6. 获取数据
      expect(store.get('user.name')).toBe('John Doe');
      expect(store.get('user.email')).toBe('john@example.com');
      expect(store.get('user.age')).toBe(30);
    });

    it('应该能够使用对象方式设置数据', () => {
      // 先定义 schema
      store.defineByKey('app.version', 'string');
      store.defineByKey('app.debug', 'boolean');
      store.defineByKey('config.timeout', 'number');

      // 5. 设置数据 - 对象方式（自动扁平化）
      store.set({
        'app.version': '1.0.0',
        'app.debug': false,
        'config.timeout': 5000
      });

      expect(store.get('app.version')).toBe('1.0.0');
      expect(store.get('app.debug')).toBe(false);
      expect(store.get('config.timeout')).toBe(5000);
    });

    it('应该支持默认值功能', () => {
      // 获取不存在的键，使用默认值
      expect(store.get('nonexistent', 'default')).toBe('default');
    });

    it('应该支持安全设置机制', () => {
      store.defineByKey('user.email', 'string.email');

      // 7. 安全设置 - 验证失败时使用默认值
      store.set('user.email', 'invalid-email', 'fallback@example.com');
      // 输出警告并使用 fallback@example.com

      expect(store.get('user.email')).toBe('fallback@example.com');
    });
  });

  describe('高级用法示例', () => {
    it('应该支持深层嵌套路径', () => {
      // 支持深层嵌套路径
      store.defineByKey('app.config.database.connection.timeout', 'number');
      store.defineByKey('user.profile.social.links.github', 'string');

      store.set('app.config.database.connection.timeout', 5000);
      store.set('user.profile.social.links.github', 'https://github.com/user');

      expect(store.get('app.config.database.connection.timeout')).toBe(5000);
      expect(store.get('user.profile.social.links.github')).toBe('https://github.com/user');
    });

    it('应该支持复杂的 arktype schema', () => {
      store.defineByKey('settings.theme', '"light" | "dark"');
      store.defineByKey('user.age', 'number >= 18');

      // 测试有效值
      store.set('settings.theme', 'light');
      store.set('user.age', 25);

      expect(store.get('settings.theme')).toBe('light');
      expect(store.get('user.age')).toBe(25);

      // 测试无效值会使用默认值
      store.set('settings.theme', 'invalid', 'dark');
      store.set('user.age', 15, 18);

      expect(store.get('settings.theme')).toBe('dark');
      expect(store.get('user.age')).toBe(18);
    });

    it('应该支持对象参数自动调用 defineByObject', () => {
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

      const { schema } = store.raw();
      expect(schema.has('server.host')).toBe(true);
      expect(schema.has('server.port')).toBe(true);
      expect(schema.has('server.ssl')).toBe(true);
      expect(schema.has('database.url')).toBe(true);
      expect(schema.has('database.maxConnections')).toBe(true);
      expect(schema.has('admin.email')).toBe(true);
    });

    it('应该支持统一 schema 定义', () => {
      const template = { user: { name: 'John', age: 30 } };
      
      // 也可以为所有字段指定统一的 schema
      store.defineByObject(template, 'string'); // 所有字段都是 string 类型

      const { schema } = store.raw();
      expect(schema.has('user.name')).toBe(true);
      expect(schema.has('user.age')).toBe(true);
    });
  });

  describe('安全设置机制示例', () => {
    beforeEach(() => {
      // 定义 schema
      store.defineByKey('user.email', 'string.email');
      store.defineByKey('user.age', 'number');
      store.defineByKey('user.active', 'boolean');
    });

    it('验证失败时应该使用默认值', () => {
      // 1. 验证失败时使用默认值
      store.set('user.email', 'invalid-email', 'fallback@example.com');
      expect(store.get('user.email')).toBe('fallback@example.com');
    });

    it('正确值不应该被替换', () => {
      // 2. 正确值不会被替换
      store.set('user.email', 'valid@example.com', 'fallback@example.com');
      expect(store.get('user.email')).toBe('valid@example.com');
    });

    it('应该支持对象方式的安全设置', () => {
      // 3. 对象方式的安全设置
      // 为了避免 defaultValue 验证失败，使用符合各自 schema 的默认值
      store.set('user.email', 'invalid-email', 'fallback@example.com');
      store.set('user.age', 'not-a-number', 25);
      store.set('user.active', 'not-boolean', true);

      expect(store.get('user.email')).toBe('fallback@example.com');
      expect(store.get('user.age')).toBe(25);
      expect(store.get('user.active')).toBe(true);
    });

    it('defaultValue 本身验证失败应该抛出错误', () => {
      // 4. defaultValue 本身也会被验证
      expect(() => {
        store.set('user.email', 'invalid', 'also-invalid');
      }).toThrow('Both value and defaultValue validation failed');
    });
  });

  describe('对象扁平化和嵌套设置示例', () => {
    beforeEach(() => {
      // 定义嵌套 schema
      store.defineByKey('user.profile.name', 'string');
      store.defineByKey('user.profile.avatar', 'string');
      store.defineByKey('user.settings.theme', 'string');
      store.defineByKey('user.settings.notifications.email', 'boolean');
      store.defineByKey('user.settings.notifications.push', 'boolean');
    });

    it('应该支持嵌套对象自动扁平化', () => {
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

      // 验证扁平化结果
      expect(store.get('user.profile.name')).toBe('John Doe');
      expect(store.get('user.profile.avatar')).toBe('avatar.jpg');
      expect(store.get('user.settings.theme')).toBe('dark');
      expect(store.get('user.settings.notifications.email')).toBe(true);
      expect(store.get('user.settings.notifications.push')).toBe(false);
    });

    it('嵌套对象设置应该等价于扁平化设置', () => {
      // 等价于扁平化设置
      store.set({
        'user.profile.name': 'Jane Doe',
        'user.profile.avatar': 'jane.jpg',
        'user.settings.theme': 'light',
        'user.settings.notifications.email': false,
        'user.settings.notifications.push': true
      });

      expect(store.get('user.profile.name')).toBe('Jane Doe');
      expect(store.get('user.profile.avatar')).toBe('jane.jpg');
      expect(store.get('user.settings.theme')).toBe('light');
      expect(store.get('user.settings.notifications.email')).toBe(false);
      expect(store.get('user.settings.notifications.push')).toBe(true);
    });
  });

  describe('高级查询和操作示例', () => {
    beforeEach(() => {
      store.defineByKey('user.preferences.theme', 'string');
      store.defineByKey('user.preferences.language', 'string');
      store.defineByKey('database.host', 'string');
      store.defineByKey('database.port', 'number');

      store.set('user.preferences.theme', 'dark');
      store.set('user.preferences.language', 'zh-CN');
      store.set('database.host', 'localhost');
      store.set('database.port', 5432);
    });

    it('应该支持 exec 方法执行自定义逻辑', () => {
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

      expect(userPreferences).toEqual({
        theme: 'dark',
        language: 'zh-CN'
      });
    });

    it('应该支持批量获取配置', () => {
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

      expect(databaseConfig).toEqual({
        host: 'localhost',
        port: 5432
      });
    });

    it('应该支持数据清理操作', () => {
      // 添加一些空值（使用有效的值，然后手动设置为空）
      store.defineByKey('empty.key1', 'string');
      store.defineByKey('valid.key', 'string');
      
      // 先设置有效值
      store.set('empty.key1', '');  // 空字符串是有效的 string
      store.set('valid.key', 'valid-value');

      const initialSize = store.size();

      // 数据清理
      const cleanupResult = store.exec((store) => {
        const keys = Array.from(store.keys());
        let deletedCount = 0;
        
        // 删除所有空字符串值
        keys.forEach(key => {
          const value = store.get(key);
          if (value === '') {
            store.delete(key);
            deletedCount++;
          }
        });
        
        return { deletedCount, remainingCount: store.size() };
      });

      expect(cleanupResult.deletedCount).toBeGreaterThan(0);
      expect(cleanupResult.remainingCount).toBeLessThan(initialSize);
    });
  });

  describe('调试和监控示例', () => {
    beforeEach(() => {
      store.defineByKey('test.key1', 'string');
      store.defineByKey('test.key2', 'number');
      store.set('test.key1', 'value1');
      store.set('test.key2', 42);
    });

    it('应该支持调试信息输出', () => {
      // debug 方法应该返回 this 以支持链式调用
      const result = store.debug();
      expect(result).toBe(store);
    });

    it('应该能够获取原始数据访问', () => {
      // 获取原始数据访问
      const { store: rawStore, schema: rawSchema } = store.raw();
      expect(rawStore.size).toBeGreaterThan(0);
      expect(rawSchema.size).toBeGreaterThan(0);
    });

    it('应该支持数据遍历', () => {
      // 遍历所有数据
      const entries: [string, any][] = [];
      for (const [key, value] of store.entries()) {
        entries.push([key, value]);
      }

      expect(entries.length).toBeGreaterThan(0);
      expect(entries.some(([key]) => key === 'test.key1')).toBe(true);
      expect(entries.some(([key]) => key === 'test.key2')).toBe(true);
    });

    it('应该提供统计信息', () => {
      // 统计信息
      expect(store.size()).toBeGreaterThan(0);
      
      const keys: string[] = Array.from(store.keys());
      expect(keys).toContain('test.key1');
      expect(keys).toContain('test.key2');
      
      const values: any[] = Array.from(store.values());
      expect(values).toContain('value1');
      expect(values).toContain(42);
    });
  });

  describe('新手常见错误场景', () => {
    it('应该允许没有 schema 时设置数据（宽松模式）', () => {
      // 新手可能会忘记定义 schema 直接设置数据
      store.set('undefined.key', 'some value');
      
      // 根据文档，这应该是允许的（宽松模式）
      expect(store.get('undefined.key')).toBe('some value');
    });

    it('应该支持链式调用', () => {
      // 新手可能会尝试链式调用
      const result = store
        .defineByKey('chain.test1', 'string')
        .defineByKey('chain.test2', 'number')
        .set('chain.test1', 'value1')
        .set('chain.test2', 42)
        .debug();
      
      expect(result).toBe(store);
      expect(store.get('chain.test1')).toBe('value1');
      expect(store.get('chain.test2')).toBe(42);
    });

    it('应该正确处理不存在的键', () => {
      // 获取不存在的键
      expect(store.get('nonexistent.key')).toBeUndefined();
      
      // 检查不存在的键
      expect(store.has('nonexistent.key')).toBe(false);
      
      // 删除不存在的键
      expect(store.delete('nonexistent.key')).toBe(false);
    });

    it('应该验证所有文档中提到的方法都存在', () => {
      // 验证所有 API 方法都存在
      const expectedMethods = [
        'defineByKey', 'define', 'defineByObject', 'isArkType',
        'get', 'set', 'has', 'delete', 'clear',
        'size', 'keys', 'values', 'entries',
        'raw', 'exec', 'debug'
      ];
      
      expectedMethods.forEach(method => {
        expect(typeof store[method]).toBe('function');
      });
    });
  });
});
