FROM registry-internal.cn-beijing.aliyuncs.com/rsq-public/node:10

WORKDIR /usr/src/rsq-app-qywx-front-server

COPY . .
RUN npm install

CMD [ "npm", "start" ]
EXPOSE 3000