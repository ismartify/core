# @ismartify/core



## 安装

```bash 
npm install @ismartify/core
```

## 使用

```ts
import ISmartifyCore from '@ismartify/core';
class MyClass extends ISmartifyCore {
    constructor() {
        super();
        this.set('ismartify.version', '1.0.0');
    }
}

const myClass = new MyClass();
myClass.set('ismartify.name', 'ismartify').tap();
myClass.mixin('test', (_self: MyClass, a: number, b: number) => a + b);
console.log(myClass.call('test',1,2));
console.log(myClass.get('ismartify.name'));
```