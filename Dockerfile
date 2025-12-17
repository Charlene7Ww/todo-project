# 1️⃣ 选择基础镜像：Node 18（和你 CI 用的一致）
FROM node:18-alpine

# 2️⃣ 设置工作目录（container 里的 /app）
WORKDIR /app

# 3️⃣ 先只复制 package 文件（为了缓存）
COPY package*.json ./

# 4️⃣ 安装依赖（生产环境常用 npm ci）
RUN npm ci

# 5️⃣ 再复制剩余代码
COPY . .

# 6️⃣ 暴露端口（Express 默认 3000）
EXPOSE 3000

# 7️⃣ 启动应用
CMD ["npm", "start"]
