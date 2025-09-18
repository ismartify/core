import { globSync } from "glob";
import { resolve } from "node:path";
import { loadConfig } from "c12";
import { type } from "arktype";

const loadDefines = async (dir = import.meta.dirname) => {
  const configFile = resolve("./fixture/defines/redis.config.ts");
  const result = await loadConfig({
    configFile,
  });

  console.log(result);
  // const files = await globSync("./**/*.define.ts");
  // files.forEach(async (file) => {
  //   const { config, configFile, layers } = await loadConfig({
  //     configFile: resolve(file),
  //   });
  //     console.log(config);
  // });
};

// loadDefines();

const T = type({
  ports: "string[] ?",
  '+':'ignore'
});

const out = T({
  b:1
});


if (out instanceof type.errors) {
  console.error(out.summary);
} else {
  console.log(out.b);
}


// const Device = type({
//   platform: "'android' | 'ios'",
//   "versions?": "(number | string)[]",
// });
// const User = type({
//   name: "string",
//   device: Device,
// });