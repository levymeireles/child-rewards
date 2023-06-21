FROM node:latest

WORKDIR /app

COPY . .

ENV PORT=8000

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["node", "index.js"]
