import { ISmartifyArkSchema } from "../src/index";

const schema = new ISmartifyArkSchema("test");
schema.setItem("name", "string");
schema.setItem("email", "邮箱,必填");
// schema.setItems("age", "正整数");

const arkType = schema.toArkType();
console.log(arkType.toJSON());
