import { ISmartifyStore } from "@ismartify/common";

const core = new ISmartifyStore();
console.log(core.get("__namespace"));


import {ISmartifyTemplate} from "@ismartify/template"

const itemp = new ISmartifyTemplate();
itemp.debug();