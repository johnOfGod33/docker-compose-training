FROM node

WORKDIR /app

COPY package*.json /app/

RUN npm install

EXPOSE 8000

COPY . .

CMD npm run start 
 