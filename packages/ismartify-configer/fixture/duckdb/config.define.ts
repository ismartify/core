import { type } from "arktype";
import { loadConfig, createDefineConfig } from "c12";

// 定义duckdb.configSchema
export const duckdbConfigType = type({
  base: "string",
  options: {
    memory_limit: "string ?",
    threads: "number.integer > 0 ?",
    access_mode: "'AUTOMATIC' | 'READ_ONLY' | 'READ_WRITE' ?",
  },
  "[string]": "unknown",
});

// 类型定义
type duckdbConfigType = typeof duckdbConfigType.infer;

// 加载系统配置
export const loadDuckDBConfig = async () => {
  const { config } = await loadConfig({ name: "duckdb", dotenv: true });
  return { ...config };
};

export const defineDuckDBConfig = createDefineConfig<duckdbConfigType>();

//ISmartifyConfiger类
class ISmartifyConfiger {
  namespace: string;
  [key: string]: any;
  constructor(namespace: string) {
    this.namespace = namespace;
    this.abc= 'hahah'
  }

  //获取配置
  loadConfig() {

  }

  //定义配置
  defineConfig() {}
}

// type configType = typeof ConfigType.infer;