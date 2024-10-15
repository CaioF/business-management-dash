FROM node:22-alpine

WORKDIR /app/front/dash

COPY front/dash/package*.json /app/front/dash

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]