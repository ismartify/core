import { describe, it, expect } from 'vitest';
import { reactive } from "@vue/reactivity";
import { ISmartifyReactive } from "../src";

/**
 * 性能测试脚本
 * 测试 ISmartifyReactive 在各种场景下的性能表现
 */

describe('ISmartifyReactive 性能测试', () => {
  describe('大量数据操作性能', () => {
    it('应该高效处理大量数据的设置操作', () => {
      const data = reactive({});
      const store = new ISmartifyReactive(data);

      const startTime = performance.now();

      // 创建1000个属性
      for (let i = 0; i < 1000; i++) {
        store.set(`item_${i}`, {
          id: i,
          name: `Item ${i}`,
          value: Math.random(),
          metadata: {
            created: new Date().toISOString(),
            tags: ['test', 'performance', `tag_${i % 10}`]
          }
        });
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      console.log(`设置1000个对象耗时: ${duration.toFixed(2)}ms`);
      expect(duration).toBeLessThan(500); // 期望在500ms内完成

      // 验证数据完整性
      expect(store.get('item_0.id')).toBe(0);
      expect(store.get('item_999.name')).toBe('Item 999');
    });

    it('应该高效处理大量数据的读取操作', () => {
      const data = reactive({});
      const store = new ISmartifyReactive(data);

      // 预先设置数据
      for (let i = 0; i < 500; i++) {
        store.set(`data_${i}`, { value: i * 2, nested: { deep: { value: i * 3 } } });
      }

      const startTime = performance.now();

      // 读取所有数据
      let sum = 0;
      for (let i = 0; i < 500; i++) {
        sum += store.get(`data_${i}.value`);
        sum += store.get(`data_${i}.nested.deep.value`);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      console.log(`读取1000个嵌套属性耗时: ${duration.toFixed(2)}ms`);
      expect(sum).toBe(623750); // 验证计算结果：value部分(249500) + nested.deep.value部分(374250)
      expect(duration).toBeLessThan(300); // 期望在300ms内完成
    });
  });

  describe('深层嵌套对象操作性能', () => {
    it('应该高效处理深层嵌套对象的操作', () => {
      const data = reactive({});
      const store = new ISmartifyReactive(data);

      const startTime = performance.now();

      // 创建10层深的嵌套对象
      for (let i = 0; i < 100; i++) {
        const path = Array.from({ length: 10 }, (_, idx) => `level_${idx}`).join('.');
        store.set(`${path}.item_${i}`, { id: i, value: `deep_value_${i}` });
      }

      const endTime = performance.now();
      const setDuration = endTime - startTime;

      console.log(`设置100个10层深嵌套对象耗时: ${setDuration.toFixed(2)}ms`);

      const readStartTime = performance.now();

      // 读取深层嵌套值
      for (let i = 0; i < 100; i++) {
        const path = Array.from({ length: 10 }, (_, idx) => `level_${idx}`).join('.');
        const value = store.get(`${path}.item_${i}.id`);
        expect(value).toBe(i);
      }

      const readEndTime = performance.now();
      const readDuration = readEndTime - readStartTime;

      console.log(`读取100个10层深嵌套属性耗时: ${readDuration.toFixed(2)}ms`);
      expect(setDuration).toBeLessThan(200);
      expect(readDuration).toBeLessThan(150);
    });
  });

  describe('批量操作性能', () => {
    it('应该高效处理批量链式操作', () => {
      const data = reactive({ counter: 0, items: [] });
      const store = new ISmartifyReactive(data);

      const startTime = performance.now();

      // 执行50次链式操作
      for (let i = 0; i < 50; i++) {
        store
          .set('counter', store.get('counter') + 1)
          .set('items', [...store.get('items'), { id: i, value: i * 10 }])
          .set(`computed_${i}`, store.get('counter') * 2);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      console.log(`执行50次链式批量操作耗时: ${duration.toFixed(2)}ms`);
      expect(store.get('counter')).toBe(50);
      expect(store.get('items').length).toBe(50);
      expect(duration).toBeLessThan(100);
    });

    it('应该高效处理 pick 方法的选择性能', () => {
      const data = reactive({});
      const store = new ISmartifyReactive(data);

      // 创建包含多个属性的对象
      const properties: string[] = [];
      for (let i = 0; i < 200; i++) {
        store.set(`prop_${i}`, `value_${i}`);
        if (i % 2 === 0) properties.push(`prop_${i}`);
      }

      const startTime = performance.now();

      // 批量 pick 操作
      for (let i = 0; i < 50; i++) {
        const picked = store.pick(properties);
        expect(Object.keys(picked).length).toBe(100);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      console.log(`执行50次pick操作(100个属性)耗时: ${duration.toFixed(2)}ms`);
      expect(duration).toBeLessThan(200);
    });
  });

  describe('mixin 和 call 方法性能', () => {
    it('应该高效处理 mixin 方法的添加和调用', () => {
      const data = reactive({ value: 0 });
      const store = new ISmartifyReactive(data);

      const startTime = performance.now();

      // 添加多个 mixin 方法
      for (let i = 0; i < 20; i++) {
        store.mixin(`method_${i}`, function(self, multiplier = 1) {
          return self.get('value') * multiplier + i;
        });
      }

      const mixinEndTime = performance.now();
      const mixinDuration = mixinEndTime - startTime;

      console.log(`添加20个mixin方法耗时: ${mixinDuration.toFixed(2)}ms`);

      const callStartTime = performance.now();

      // 调用所有 mixin 方法
      let results: number[] = [];
      for (let i = 0; i < 20; i++) {
        results.push(store.call(`method_${i}`, 2));
      }

      const callEndTime = performance.now();
      const callDuration = callEndTime - callStartTime;

      console.log(`调用20个mixin方法耗时: ${callDuration.toFixed(2)}ms`);
      expect(results.length).toBe(20);
      expect(mixinDuration).toBeLessThan(50);
      expect(callDuration).toBeLessThan(30);
    });

    it('应该高效处理 exec 方法的复杂逻辑执行', () => {
      const data = reactive({
        items: [],
        stats: { total: 0, count: 0 }
      });
      const store = new ISmartifyReactive(data);

      const startTime = performance.now();

      // 执行50次复杂的 exec 操作
      for (let i = 0; i < 50; i++) {
        store.exec((self) => {
          const items = self.get('items');
          const newItem = { id: i, value: Math.random(), processed: false };

          // 模拟复杂业务逻辑
          self.set('items', [...items, newItem]);

          const currentCount = self.get('stats.count') + 1;
          const currentTotal = self.get('stats.total') + newItem.value;

          self.set('stats', {
            count: currentCount,
            total: currentTotal,
            average: currentTotal / currentCount
          });

          return {
            itemId: newItem.id,
            stats: self.get('stats')
          };
        });
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      console.log(`执行50次复杂exec操作耗时: ${duration.toFixed(2)}ms`);

      const finalStats = store.get('stats');
      expect(finalStats.count).toBe(50);
      expect(finalStats.average).toBeGreaterThan(0);
      expect(duration).toBeLessThan(150);
    });
  });

  describe('内存使用和垃圾回收测试', () => {
    it('应该在大量操作后保持稳定的内存使用', () => {
      const data = reactive({});
      const store = new ISmartifyReactive(data);

      // 执行大量操作来测试内存稳定性
      for (let i = 0; i < 100; i++) {
        store.set(`temp_${i}`, {
          data: new Array(100).fill(0).map((_, idx) => ({ value: idx })),
          metadata: { created: Date.now(), index: i }
        });

        // 模拟数据清理
        if (i > 50) {
          store.set(`temp_${i - 51}`, undefined);
        }
      }

      // 验证最终状态
      expect(store.get('temp_99')).toBeDefined();
      expect(store.get('temp_48')).toBeUndefined();

      console.log('内存稳定性测试完成');
    });
  });
});
