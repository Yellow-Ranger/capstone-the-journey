FROM node:19-alpine as builder
WORKDIR /home/app
COPY . .
RUN npm ci --force && npm cache clean --force
RUN npm run build 

# 1. Nginx & Alpine
FROM nginx:1.21-alpine
# 2. replace nginx's default config with our nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# 3. copy build output from builder to the default static file location
COPY --from=builder /home/app/build /usr/share/nginx/html
EXPOSE 80
# 4. start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]