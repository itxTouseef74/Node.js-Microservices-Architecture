FROM node:20.13.1

WORKDIR /app/products

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8002

CMD ["npm", "start"]

