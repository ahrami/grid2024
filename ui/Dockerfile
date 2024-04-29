FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN npm install -d

COPY . .

EXPOSE 5173

RUN npm run build

CMD ["npm", "run", "preview"]