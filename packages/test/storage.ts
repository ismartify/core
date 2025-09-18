import { createStorage } from 'unstorage';
import { ofetch } from "ofetch";

const storage = createStorage();
await storage.setItem("ismartify.title", "baz");
await storage.setItem("ismartify.description", "description");
await storage.setItem("ismartify.keywords", "keywords");
await storage.setItem("ismartify.author", "author");
await storage.setItem("ismartify.copyright", "copyright");
await storage.setItem("ismartify.version", "version");

await storage.setItem("space.name", "space");
await storage.setMeta('space.name',{
    type:'string',
    format:'url',
    description:'space name'
});
await storage.setItem("space.url", "https://www.baidu.com");
await storage.setItem("template:bar", "baz");

await storage.getItem("template:bar");
await storage.getItem("foo:bar");

console.log(await storage.getKeys());


// await ofetch("https://api.github.com/users/ismartify").then(console.log);