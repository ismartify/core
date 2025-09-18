import { type, scope } from "arktype";

// 定义一个对象
const schema = {
  name: "string",
  email: "string.email",
  website: "string.url ?"
}



// 1. 创建一个 scope，定义别名
const myschema = scope({
  myemail: "string.email", // 邮箱
  myurl: "string.url", // 网址
  t1: "string",
  // t3: "/^a.*z$/",
});


const myschemaType = myschema.type(schema as object);
console.log(myschemaType.toJsonSchema());
console.log(myschemaType.allows({ name: "abc", email: "abc@def.com", website: "https://www.google.com" }));
