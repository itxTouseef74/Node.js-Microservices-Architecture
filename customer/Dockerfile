FROM node:20.13.1

WORKDIR /app/customer

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8001

CMD ["npm", "start"]

