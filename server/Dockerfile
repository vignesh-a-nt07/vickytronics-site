FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3001

COPY startup.sh .
RUN chmod +x startup.sh

CMD ["/bin/sh", "./startup.sh"]
