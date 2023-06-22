FROM node:latest

WORKDIR /

COPY . .

ENV PORT=8000

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["node", "index.js"]
