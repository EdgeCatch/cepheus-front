FROM node:10-alpine as builder
COPY package.json ./
RUN npm install

COPY . .
RUN npm run build 

FROM nginx:alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /build /usr/share/nginx/html

EXPOSE  80

CMD ["nginx", "-g", "daemon off;"]