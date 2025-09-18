import { reactive } from "@vue/reactivity";
import { get, set, pick, isReactive, ISmartifyReactive } from "../src";

const reactiveObj = reactive({ name: "ismartify", version: "1.0.0" });


const store = new ISmartifyReactive(reactiveObj);
store.mixin("test", (ctx,...args) => {
    console.log(args);
}).tap();

store.call("test",1,2,3);

store.exec(async (ctx) => {
    ctx.set("name", "ismartify-reactive");
    console.log(ctx.get("name"));
});
