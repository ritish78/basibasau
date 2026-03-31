FROM node:25-alpine

WORKDIR /home/basibasau

ENV NODE_ENV=development

COPY package.json ./

RUN npm install

COPY . .
