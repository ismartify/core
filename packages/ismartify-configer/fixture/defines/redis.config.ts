export default {
  title: "Redis 配置定义",
  description: "一个极简的 Schema，通过字段定义推断整体结构。",
  types: {
    PortNumber: "number>=1&<=65535",
    HostString: "string>0",
    ClusterNodeAddress:"string#^([a-zA-Z0-9.-]+|\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}):\\d{1,5}$",
    DatabaseNumber: "number>=0&<=15",
  },
  items: {
    host: {
      type: "HostString",
      description: "Redis 服务器的主机名或 IP 地址。",
      extra: {
        title: "Redis 主机",
        examples: ["localhost", "127.0.0.1"],
      },
    },
    port: {
      type: "PortNumber",
      description: "Redis 服务器的端口号。",
      extra: {
        title: "Redis 端口",
        default: 6379,
        examples: [6379, 7000],
      },
    },
    password: {
      type: "string>=1?",
      description: "如果需要，用于 Redis 身份验证的密码。",
      extra: {
        title: "Redis 密码",
        writeOnly: true,
        examples: ["your-strong-password"],
      },
    },
    db: {
      type: "DatabaseNumber",
      description: "要连接的 Redis 数据库编号。",
      extra: {
        title: "Redis 数据库",
        default: 0,
        examples: [0, 1],
      },
    },
    ssl: {
      type: "boolean",
      description: "是否为连接使用 SSL/TLS 加密。",
      extra: {
        title: "SSL/TLS 加密",
        default: false,
      },
    },
    timeout: {
      type: "number>=0?",
      description: "连接超时时间（毫秒）。",
      extra: {
        title: "连接超时",
        default: 10000,
        examples: [5000, 15000],
      },
    },
    clusterNodes: {
      type: "ClusterNodeAddress[]?",
      description: "Redis 集群节点的主机:端口字符串列表。",
      extra: {
        title: "集群节点",
        minItems: 1,
        uniqueItems: true,
        examples: ["node1.example.com:7000", "192.168.1.100:7001"],
      },
    },
  },
};