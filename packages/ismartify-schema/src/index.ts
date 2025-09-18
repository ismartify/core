import { defu } from "defu";
import { type } from "arktype";
import { dicts } from "./arktype.extra";




//prettier-ignore
export class ISmartifyArkSchema {
  #Items: Map<string, any> = new Map();
  #Space: {
    name: string;
    items: { [key: string]: any };
    options: Record<string, any> | undefined;
  };
  constructor(name: string, options?: Record<string, any>) {
    this.#Space = { name, items: {}, options };
  }

  //判断arktype表达式是否合法
  isArkTypeExpressionValid(expr: any): boolean {
    try {
      type(expr);
      return true;
    } catch (e) {
      return false;
    }
  }

  //设置配置项
  setItem(key: string, types: string) {
    const typesList = types.split(/[\s,]/);
    for (const type of typesList) {
      const dict = dicts.get(types);
      if (dict) {
        this.#Space.items[key] = dict;
      } else if (this.isArkTypeExpressionValid(type)) {
        this.#Space.items[key] = dict ? dict : types;
      }
    }
    return this;
  }

  // 设置Ark原始配置项
  setRawItem(key: string,value:any) {

  }

  //toArkType
  toArkType() {
    return type(this.#Space.items);
  }
}
