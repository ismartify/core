import "dotenv/config";
import OSSClient from "ali-oss";


const configs = {
  region: process.env.ALIYUNOSS_REGION,
  accessKeyId: process.env.ALIYUNOSS_ACCESSKEYID || "",
  accessKeySecret: process.env.ALIYUNOSS_ACCESSKEYSECRET || "",
  bucket: process.env.ALIYUNOSS_BUCKET,
  cname: false, //是否使用自定义域名
  endpoint: "",
};

// 获取oss实例
const getStore = () => {
  const { region, accessKeyId, accessKeySecret, bucket } = configs;
  return OSSClient({
    region,
    accessKeyId,
    accessKeySecret,
    bucket,
  });
};

// 获取bucket信息
const getBucketInfo = async () => {
  const client = await getStore();
  console.log(client.agent);

//   const result = await store.listBuckets({"max-keys": 10});
//   console.log(result);

};

const main = async () => {
  await getBucketInfo();
};

main();
