export const dicts = new Map<string,{ type: string; title?: string; description?: string }>();

dicts.set("字符串", {type: "string", title: "字符串", description: "任意字符串"});
dicts.set("英文字母", {type: "string.alpha", title: "字母串", description: "仅包含字母"});
dicts.set("字母数字串", {type: "string.alphanumeric", title: "字母数字串", description: "仅包含字母和数字"});
dicts.set("base64编码", {type: "string.base64", title: "base64编码", description: "base64 编码字符串"});
dicts.set("base64url编码", {type: "string.base64.url", title: "base64url编码", description: "base64url 编码字符串"});
dicts.set("首字母大写", {type: "string.capitalize", title: "首字母大写", description: "首字母大写的字符串"});
dicts.set("预格式化首字母大写", {type: "string.capitalize.preformatted", title: "预格式化首字母大写", description: "已预格式化的首字母大写字符串"});
dicts.set("信用卡号", {type: "string.creditCard", title: "信用卡号", description: "信用卡号字符串"});
dicts.set("邮箱", {type: "string.email", title: "邮箱", description: "电子邮箱地址"});
dicts.set("十六进制", {type: "string.hex", title: "十六进制", description: "十六进制字符串"});
dicts.set("JSON字符串", {type: "string.json.parse", title: "JSON字符串", description: "可被 JSON.parse 解析的字符串"});
dicts.set("JSON序列化", {type: "string.json.stringify", title: "JSON序列化", description: "可被 JSON.stringify 序列化的字符串"});
dicts.set("长度", {type: "string.length", title: "长度", description: "指定长度的字符串"});
dicts.set("小写字母串", {type: "string.lowercase", title: "小写字母串", description: "仅包含小写字母"});
dicts.set("最大长度", {type: "string.maxLength", title: "最大长度", description: "指定最大长度的字符串"});
dicts.set("最小长度", {type: "string.minLength", title: "最小长度", description: "指定最小长度的字符串"});
dicts.set("数字串", {type: "string.numeric", title: "数字串", description: "仅包含数字的字符串"});
dicts.set("正则匹配", {type: "string.regex", title: "正则匹配", description: "符合正则表达式约束的字符串"});
dicts.set("去除首尾空白", {type: "string.trim", title: "去除首尾空白", description: "去除首尾空白字符后的字符串"});
dicts.set("大写字母串", {type: "string.uppercase", title: "大写字母串", description: "仅包含大写字母"});
dicts.set("网址", {type: "string.url", title: "网址", description: "URL 或网址字符串"});
dicts.set("UUID", {type: "string.uuid", title: "UUID", description: "规范的 UUID 字符串"});

// 数字
dicts.set("数字", {type: "number", title: "数字", description: "任意数字"});
dicts.set("整数", {type: "integer", title: "整数", description: "整数（可正可负），等价于 number 且没有小数部分"});
dicts.set("正整数", {type: "integer>0", title: "正整数", description: "大于 0 的整数"});
dicts.set("非负整数", {type: "integer>=0", title: "非负整数", description: "大于等于 0 的整数"});
dicts.set("负整数", {type: "integer<0", title: "负整数", description: "小于 0 的整数"});
dicts.set("小数", {type: "number & !integer", title: "小数", description: "非整数的数字，即带小数部分的数字"});
dicts.set("正数", {type: "number>0", title: "正数", description: "大于 0 的数字"});
dicts.set("非负数", {type: "number>=0", title: "非负数", description: "大于等于 0 的数字"});
dicts.set("负数", {type: "number<0", title: "负数", description: "小于 0 的数字"});
dicts.set("非正数", {type: "number<=0", title: "非正数", description: "小于等于 0 的数字"});
dicts.set("有限数字", {type: "number.finite", title: "有限数字", description: "不是 Infinity、-Infinity、NaN 的数字"});
dicts.set("无限数字", {type: "number.Infinity", title: "无限数字", description: "Infinity 或 -Infinity"});
dicts.set("NaN", {type: "number.nan", title: "NaN", description: "不是数字（NaN）"});
dicts.set("偶数", {type: "integer % 2 = 0", title: "偶数", description: "2 的倍数的整数"});
dicts.set("奇数", {type: "integer % 2 = 1", title: "奇数", description: "除 2 余 1 的整数"});
dicts.set("指定位数数字", {type: "number & /^\\d{n}$/", title: "指定位数数字", description: "n 位数字（可通过正则表达式指定）"});
dicts.set("百分数", {type: "number>=0 & number<=100", title: "百分数", description: "0-100 之间的数字"});

// 新增的数字类型
dicts.set("Infinity", {type: "number.Infinity", title: "正无穷大", description: "表示正无穷大的数字"});
dicts.set("负无穷大", {type: "number.NegativeInfinity", title: "负无穷大", description: "表示负无穷大的数字"});
dicts.set("时间戳", {type: "number.epoch", title: "时间戳", description: "表示安全 Unix 时间戳的整数"});
dicts.set("安全整数", {type: "number.safe", title: "安全整数", description: "范围在 -9007199254740991 到 9007199254740991 之间的整数"});

//
