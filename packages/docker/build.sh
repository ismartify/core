#!/bin/bash
set -ex

# 确保脚本有执行权限
chmod +x "$0"

# 设置输出到标准输出
echo "=== 脚本开始执行 ==="
echo "脚本路径: $0"
echo "当前目录: $(pwd)"

# 检查源目录
echo -e "\n=== 检查源目录 ==="
ls -la /app/src

# 清理目标目录并复制文件
echo -e "\n=== 清理目标目录 ==="
rm -rf /app/* 2>/dev/null || true

# 复制文件
echo -e "\n=== 复制文件 ==="
find /src -mindepth 1 -maxdepth 1 ! -name 'build.sh' ! -name 'node_modules' -exec cp -r {} /app/ \;

# 检查工作目录
echo -e "\n=== 最终工作目录 ==="
pwd
ls -la /app

# 3. 安装依赖并构建
echo -e "\n3. 正在安装依赖..."
cd /app
pnpm install --no-frozen-lockfile

echo -e "\n4. 开始构建应用..."
pnpm run build

# 5. 启动服务器进行测试
echo -e "\n5. 启动测试服务器..."
cd /app
node .output/server/index.mjs &
SERVER_PID=$!

# 等待服务器启动
echo "等待服务器启动..."
sleep 5

# 6. 测试 API
echo -e "\n6. 测试 API..."
if wget -qO- http://127.0.0.1/api/health >/dev/null 2>&1; then
  echo "API 测试成功"
  
  # 7. 准备输出目录
  echo -e "\n7. 准备输出目录..."
  VERSION=$(node -p 'require("/app/package.json").version')
  OUTPUT_DIR=/src/.output/docker-$VERSION
  mkdir -p "$OUTPUT_DIR"

  # 8. 复制构建输出到 /src/.output/docker-{version}
  echo -e "\n8. 复制构建输出到 /src/.output/docker-$VERSION..."
  cp -r /app/.output/nitro.json /app/.output/public /app/.output/server "$OUTPUT_DIR/"

  # 9. 设置输出目录权限
  echo -e "\n9. 设置输出目录权限..."
  chmod -R 755 "$OUTPUT_DIR"

  echo -e "\n=== 构建完成 ==="
  echo "构建版本: $VERSION"
  echo "输出目录: $OUTPUT_DIR"

  # 10. 停止测试服务器
  echo -e "\n10. 停止测试服务器..."
  kill $SERVER_PID

  echo -e "\n=== 所有操作完成 ==="
  echo "构建版本: $VERSION"
  echo "输出目录: $OUTPUT_DIR"

  exit 0
else
  echo "API 测试失败"
  kill $SERVER_PID 2>/dev/null || true
  exit 1
fi

echo -e "\n构建完成，容器即将退出..."