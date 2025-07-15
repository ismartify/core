import { ISmartifyStore } from "@ismartify/core";

const core = new ISmartifyStore();
console.log(core.get("__namespace"));
