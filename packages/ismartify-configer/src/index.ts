import { ISmartifyMapStore } from "@ismartify/mapstore";

class ISmartifyConfiger extends ISmartifyMapStore {
  constructor(namespace: string) {
    super();
    this.set("__namespace", namespace);
  }

  defineConfig(defines: Record<string, any>) {
    defines.forEach((value: any, key: string) => {
      this.set(key, value);
    });
  }

  //将一个对象展平
  flatten() {}

  //将一个展平的对象还原
  unflatten() {}
}
