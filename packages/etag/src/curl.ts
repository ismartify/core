import { ISmartifyStore, ISmartifyError } from "@ismartify/common";

const Store = new ISmartifyStore();
Store.set("url", `https://ui.f2i.cn/mock/etag/p02/29237397.txt`);

// 获取文件Tag
Store.mixin('getETag',async (ctx,url:string)=>{
    const result = await fetch(url,{method:'HEAD'});
    const etag = result.headers.get('etag')?.replace(/[^0-9a-f]/ig,"");
    return etag;
})

// 执行
// Store.exec(async (ctx) => {
//   const url = ctx.get("url");
//   const result = await fetch(url, { method: "HEAD" });
//   console.log(result);
// });


Store.exec(async (ctx) => {
  const url = ctx.get("url");
  const result = await ctx.call('getETag',url);
//   console.log(result);
});

Store.exec(async()=>{
    const result = await fetch("https://keepstore-1304770746.cos.ap-guangzhou.myqcloud.com/unstorage/test/11.json",{method:'HEAD'});
    const etag = result.headers.get("etag")?.replace(/[^0-9a-f]/gi, "");
    console.log(result);
})
