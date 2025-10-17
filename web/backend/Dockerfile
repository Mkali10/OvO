FROM node:20-bullseye
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci --production
COPY . .
EXPOSE 8080
CMD ["node","server.js"]
