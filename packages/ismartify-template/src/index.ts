import { type } from "arktype";
import Handlebars from "handlebars";
import { ISmartifyStore } from "@ismartify/common";


  Handlebars.registerHelper("noop", function (this: any, options) {
    return options.fn(this);
  });

export class ISmartifyTemplate extends ISmartifyStore {
  constructor() {
    super();
  }

  // 设置模版
  partial(name: string, templateString: string) {}

  // 设置模版参数配置
  setArkItem(name: string, type: string) {}

  //渲染
  render(data: Object) {
    const templateString = this.get("templateString");
    const template = Handlebars.compile(templateString);
    return template(data);
  }

  debug() {
  
    const t = Handlebars.compile(`<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{#noop}}{{body}}{{/noop}}
  </div>
</div>`);
    const result = t({
      title: "First Post",
      story: {
        intro: "Before the jump",
        body: "After the jump",
      },
    });
    console.log(result);
  }
}
