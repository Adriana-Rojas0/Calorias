#NPM install dependencies
FROM node:18-slim AS dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install  --frozen-lockfile

#NPM RUN BUILD
FROM node:18-slim AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

#NGINX
FROM nginx:1.23.3 AS prod
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]

