FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

#CMD npm install && npm run dev

CMD npm install && npm run dev