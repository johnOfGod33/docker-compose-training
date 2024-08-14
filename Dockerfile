FROM node:latest

WORKDIR /app

COPY package.json package.json
RUN npm install 

EXPOSE 8000

COPY . .

CMD [ "npm", "run", "start" ]


