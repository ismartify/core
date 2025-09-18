FROM node:20-alpine

# 设置 Alpine 镜像源为阿里云
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

# 安装必要的工具
RUN apk add --no-cache wget

# 设置 pnpm 镜像源并安装 pnpm
RUN npm config set registry https://registry.npmmirror.com/ && \
    npm install -g pnpm

# 设置工作目录
WORKDIR /app

# 暴露端口
EXPOSE 80

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=80
ENV NITRO_PORT=80
ENV NITRO_HOST=0.0.0.0
ENV NUXT_HOST=0.0.0.0

# 设置文件权限
RUN chmod -R 755 /app

# 设置默认命令
CMD ["/bin/sh"]