# 构建阶段
FROM node:lts-alpine as build-stage

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json (如果存在)
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件和文件夹到工作目录
COPY . .

# 构建应用
RUN npm run build

# 生产阶段
FROM nginx:stable-alpine as production-stage

# 从构建阶段复制构建好的文件到 nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
