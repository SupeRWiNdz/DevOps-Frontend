FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install -g @angular/cli && \
    npm install --legacy-peer-deps && \
    chmod +x node_modules/.bin/*

COPY . .
RUN ./node_modules/.bin/ng build --prod

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/frontend /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]