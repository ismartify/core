import { describe, it,test, expect,beforeAll,afterAll } from 'vitest';
import ISmartifyCore from '@ismartify/core';
import { setupOrderTestData } from './order-storage';

const core = new ISmartifyCore();

// 测试core
describe('core', () => {
  beforeAll(() => {
    core.set('test', 'test');
  });
  it('定义正确', () => {
    expect(core.get('test')).toBe('test');
  });


  // 测试继承
  it('继承2', () => {
     class MyClass extends ISmartifyCore{
        constructor(){
          super();
          this.set('test', 'test');
        }
      test = () => {
        return this.get('test');
      }
     }

     const myClass = new MyClass();
     expect(myClass.test()).toBe('test');
  });

  test.todo('todo');
});
