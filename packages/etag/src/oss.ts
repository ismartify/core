import "dotenv/config";
import OSSClient from "ali-oss";
import Promise from "bluebird";

const configs = {
  region: process.env.ALIYUNOSS_REGION,
  accessKeyId: process.env.ALIYUNOSS_ACCESSKEYID || "",
  accessKeySecret: process.env.ALIYUNOSS_ACCESSKEYSECRET || "",
  bucket: process.env.ALIYUNOSS_BUCKET,
  cname: true, //是否使用自定义域名
  endpoint: "https://ui.f2i.cn",
};

// 获取oss实例
const getClient = () => {
  const { region, accessKeyId, accessKeySecret, bucket, cname, endpoint } =
    configs;
  return new OSSClient({
    region,
    accessKeyId,
    accessKeySecret,
    bucket,
    cname,
    endpoint,
  });
};

// 获取bucket信息
const getBucketInfo = async (data='hello') => {
  const client = getClient();
  // const result = await client.get('mock/etag/p01/benz.txt');
  // console.log(result.res.headers.etag);
  const result = await client.put(
    "mock/etag/p01/benz.txt",
    Buffer.from(data)
  );
  // console.log(result);
  const { name, url, size, res } = result;

  const etag = res.headers.etag;
  const number = etag.replace(/[^\d]+/ig, "");
  console.log({etag,number});
};

const main = async () => {
  for(let i=0;i<10;i++){
    await getBucketInfo('hello'+i);
  }
  // await getBucketInfo('hello1');
  // await getBucketInfo('hello2');
};

const genID = async () => {
    while (true) {
      const now = Date.now(); // 当前时间戳，单位毫秒
      const minuteTimestamp = Math.floor(now / 60000); // 向下取整到整分钟

      const client = getClient();
      const result = await client.put(
        `mock/etag/p02/${minuteTimestamp}.txt`,
        Buffer.from(`${minuteTimestamp}`)
      );

      const etag = result.res.headers.etag.replace(/"/g, "");

      let numericStr = "";
      for (const ch of etag) {
        const val = parseInt(ch, 16);
        numericStr += val.toString().padStart(2, "0"); // 补齐两位数字
      }

      const numbers = numericStr.replace(/0+/ig,"");

      console.log({ minuteTimestamp, etag, numericStr, numbers });
      await Promise.delay(60 * 1000);
    }
}



// genID();
