import { describe, it, expect } from 'vitest';
import { reactive } from "@vue/reactivity";
import { ISmartifyReactive, get, set, pick, isReactive } from "../src";

/**
 * 基础功能测试脚本
 * 测试 ISmartifyReactive 类的所有核心功能
 */

describe('ISmartifyReactive 基础功能测试', () => {
  describe('构造函数验证', () => {
    it('应该接受有效的响应式对象', () => {
      const reactiveObj = reactive({ name: "test" });
      const store = new ISmartifyReactive(reactiveObj);
      expect(store).toBeInstanceOf(ISmartifyReactive);
    });

    it('应该拒绝非响应式对象', () => {
      expect(() => {
        const plainObj = { name: "test" };
        new ISmartifyReactive(plainObj);
      }).toThrow("传入的对象必须是响应式的");
    });
  });

  describe('基本 get/set 操作', () => {
    it('set() 应该返回 this 以支持链式调用', () => {
      const data = reactive({ user: { name: "John", age: 30 } });
      const store = new ISmartifyReactive(data);
      const result = store.set("user.name", "Jane");
      expect(result).toBe(store);
    });

    it('应该获取更新的值', () => {
      const data = reactive({ user: { name: "John", age: 30 } });
      const store = new ISmartifyReactive(data);
      store.set("user.name", "Jane");
      expect(store.get("user.name")).toBe("Jane");
    });

    it('应该为缺失的键返回默认值', () => {
      const data = reactive({ user: { name: "John", age: 30 } });
      const store = new ISmartifyReactive(data);
      const email = store.get("user.email", "default@email.com");
      expect(email).toBe("default@email.com");
    });
  });

  describe('嵌套路径操作', () => {
    it('应该正确设置嵌套路径', () => {
      const data = reactive({
        app: {
          config: {
            theme: "light",
            features: { notifications: true }
          }
        }
      });
      const store = new ISmartifyReactive(data);
      store.set("app.config.theme", "dark");
      store.set("app.config.features.notifications", false);
      expect(store.get("app.config.theme")).toBe("dark");
      expect(store.get("app.config.features.notifications")).toBe(false);
    });
  });

  describe('pick 方法', () => {
    it('应该挑选单个属性', () => {
      const data = reactive({
        user: { name: "John", age: 30, email: "john@test.com" },
        settings: { theme: "dark" }
      });
      const store = new ISmartifyReactive(data);
      const singlePick = store.pick("user.name");
      expect(singlePick["user.name"]).toBe("John");
    });

    it('应该挑选多个属性', () => {
      const data = reactive({
        user: { name: "John", age: 30, email: "john@test.com" },
        settings: { theme: "dark" }
      });
      const store = new ISmartifyReactive(data);
      const multiPick = store.pick(["user.name", "user.age", "settings.theme"]);
      expect(multiPick["user.name"]).toBe("John");
      expect(multiPick["user.age"]).toBe(30);
      expect(multiPick["settings.theme"]).toBe("dark");
    });
  });

  describe('tap 方法', () => {
    it('tap() 应该被调用', () => {
      const data = reactive({ counter: 0 });
      const store = new ISmartifyReactive(data);
      let tapCalled = false;
      store.tap(() => {
        tapCalled = true;
      });
      expect(tapCalled).toBe(true);
    });

    it('应该将存储数据传递给自定义函数', () => {
      const data = reactive({ counter: 0 });
      const store = new ISmartifyReactive(data);
      let customCalled = false;
      let customData: any = null;
      store.tap((data) => {
        customCalled = true;
        customData = data;
      });
      expect(customCalled).toBe(true);
      expect(customData.counter).toBe(0);
    });
  });

  describe('mixin 和 call 方法', () => {
    it('mixin() 应该返回 this 以支持链式调用', () => {
      const data = reactive({ value: 10 });
      const store = new ISmartifyReactive(data);
      const mixinResult = store.mixin("double", function(self: ISmartifyReactive, multiplier: number = 2) {
        const current = self.get("value");
        return current * multiplier;
      });
      expect(mixinResult).toBe(store);
    });

    it('应该正确调用混入的函数', () => {
      const data = reactive({ value: 10 });
      const store = new ISmartifyReactive(data);
      store.mixin("double", function(self: ISmartifyReactive, multiplier: number = 2) {
        const current = self.get("value");
        return current * multiplier;
      });
      const result = store.call("double", 3);
      expect(result).toBe(30);
    });

    it('应该在混入的函数中使用默认参数', () => {
      const data = reactive({ value: 10 });
      const store = new ISmartifyReactive(data);
      store.mixin("double", function(self: ISmartifyReactive, multiplier: number = 2) {
        const current = self.get("value");
        return current * multiplier;
      });
      const defaultResult = store.call("double");
      expect(defaultResult).toBe(20);
    });
  });

  describe('exec 方法', () => {
    it('应该执行回调并返回结果', () => {
      const data = reactive({ counter: 5 });
      const store = new ISmartifyReactive(data);
      const result = store.exec((self) => {
        self.set("counter", self.get("counter") + 10);
        return self.get("counter");
      });
      expect(result).toBe(15);
    });

    it('应该在 exec 回调中修改存储数据', () => {
      const data = reactive({ counter: 5 });
      const store = new ISmartifyReactive(data);
      store.exec((self) => {
        self.set("counter", self.get("counter") + 10);
        return self.get("counter");
      });
      expect(store.get("counter")).toBe(15);
    });
  });

  describe('raw 方法', () => {
    it('应该返回原始响应式对象', () => {
      const originalData = reactive({ secret: "hidden" });
      const store = new ISmartifyReactive(originalData);
      const raw = store.raw();
      expect(raw).toBe(originalData);
    });

    it('原始对象应该仍然是响应式的', () => {
      const originalData = reactive({ secret: "hidden" });
      const store = new ISmartifyReactive(originalData);
      const raw = store.raw();
      expect(isReactive(raw)).toBe(true);
    });
  });

  describe('导出的工具函数', () => {
    it('get() 工具函数应该工作', () => {
      const obj = { a: { b: { c: 1 } } };
      expect(get(obj, "a.b.c")).toBe(1);
    });

    it('set() 工具函数应该工作', () => {
      const obj = { a: { b: { c: 1 } } };
      set(obj, "a.b.d", 2);
      expect((obj.a.b as any).d).toBe(2);
    });

    it('pick() 工具函数应该处理顶级属性', () => {
      const obj = { a: { b: { c: 1 } } };
      const picked = pick(obj, ['a']);
      expect(picked.a).toBeDefined();
      expect(picked.a.b.c).toBe(1);
    });

    it('isReactive() 应该检测响应式对象', () => {
      const reactiveObj = reactive({ x: 10 });
      expect(isReactive(reactiveObj)).toBe(true);
    });

    it('isReactive() 应该对普通对象返回 false', () => {
      const obj = { x: 10 };
      expect(isReactive(obj)).toBe(false);
    });
  });
});
