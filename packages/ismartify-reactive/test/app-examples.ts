import { describe, it, expect } from 'vitest';
import { reactive } from "@vue/reactivity";
import { ISmartifyReactive } from "../src";

/**
 * 应用示例测试用例
 * 演示如何使用 ISmartifyReactive 创建实际应用
 */

describe('ISmartifyReactive 应用示例测试', () => {
  describe('计数器应用', () => {
    it('应该正确实现计数器功能', () => {
      const state = reactive({
        counter: 0,
        history: [] as number[],
        settings: {
          step: 1,
          maxCount: 100
        }
      });

      const store = new ISmartifyReactive(state);

      // 测试增加计数器
      store.set("counter", store.get("counter") + store.get("settings.step"));
      expect(store.get("counter")).toBe(1);

      // 测试批量操作
      store
        .set("counter", store.get("counter") + 5)
        .set("history", [...store.get("history"), store.get("counter")]);

      expect(store.get("counter")).toBe(6);
      expect(store.get("history")).toEqual([6]);

      // 测试 pick 方法选择特定数据
      const displayData = store.pick(["counter", "settings.step"]);
      expect(displayData.counter).toBe(6);
      expect(displayData["settings.step"]).toBe(1);

      // 测试 exec 方法执行复杂逻辑
      const result = store.exec((self) => {
        const current = self.get("counter");
        const step = self.get("settings.step");

        // 模拟一些业务逻辑
        if (current < self.get("settings.maxCount")) {
          const newValue = current + step * 2;
          self.set("counter", newValue);
          self.set("history", [...self.get("history"), newValue]);
          return `计数器更新为: ${newValue}`;
        } else {
          return "达到最大值限制";
        }
      });

      expect(result).toBe("计数器更新为: 8");

      // 测试 mixin 方法添加自定义功能
      store.mixin("reset", function(self: ISmartifyReactive) {
        self.set("counter", 0);
        self.set("history", []);
        return "计数器已重置";
      });

      const resetResult = store.call("reset");
      expect(resetResult).toBe("计数器已重置");
      expect(store.get("counter")).toBe(0);
      expect(store.get("history")).toEqual([]);
    });
  });

  describe('待办事项应用', () => {
    it('应该正确实现待办事项功能', () => {
      const state = reactive({
        todos: [] as Array<{ id: number; text: string; completed: boolean }>,
        filter: "all", // all | active | completed
        nextId: 1
      });

      const store = new ISmartifyReactive(state);

      // 添加待办事项
      store.mixin("addTodo", function(self: ISmartifyReactive, text: string) {
        const newTodo = {
          id: self.get("nextId"),
          text,
          completed: false
        };

        const currentTodos = self.get("todos");
        self.set("todos", [...currentTodos, newTodo]);
        self.set("nextId", self.get("nextId") + 1);

        return newTodo;
      });

      // 切换完成状态
      store.mixin("toggleTodo", function(self: ISmartifyReactive, id: number) {
        const todos = self.get("todos");
        const updatedTodos = todos.map((todo: any) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        self.set("todos", updatedTodos);
        return updatedTodos.find((todo: any) => todo.id === id);
      });

      // 获取过滤后的待办事项
      store.mixin("getFilteredTodos", function(self: ISmartifyReactive) {
        const todos = self.get("todos");
        const filter = self.get("filter");

        switch (filter) {
          case "active":
            return todos.filter((todo: any) => !todo.completed);
          case "completed":
            return todos.filter((todo: any) => todo.completed);
          default:
            return todos;
        }
      });

      // 添加一些待办事项
      store.call("addTodo", "学习 TypeScript");
      store.call("addTodo", "编写测试用例");
      store.call("addTodo", "发布 npm 包");

      expect(store.get("todos")).toEqual([
        { id: 1, text: '学习 TypeScript', completed: false },
        { id: 2, text: '编写测试用例', completed: false },
        { id: 3, text: '发布 npm 包', completed: false }
      ]);

      // 切换第一个任务为完成
      store.call("toggleTodo", 1);
      expect(store.get("todos")).toEqual([
        { id: 1, text: '学习 TypeScript', completed: true },
        { id: 2, text: '编写测试用例', completed: false },
        { id: 3, text: '发布 npm 包', completed: false }
      ]);

      // 过滤活动任务
      store.set("filter", "active");
      const activeTodos = store.call("getFilteredTodos");
      expect(activeTodos).toEqual([
        { id: 2, text: '编写测试用例', completed: false },
        { id: 3, text: '发布 npm 包', completed: false }
      ]);

      // 过滤已完成任务
      store.set("filter", "completed");
      const completedTodos = store.call("getFilteredTodos");
      expect(completedTodos).toEqual([
        { id: 1, text: '学习 TypeScript', completed: true }
      ]);
    });
  });
});
