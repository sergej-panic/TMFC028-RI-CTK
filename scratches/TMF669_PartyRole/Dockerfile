FROM node:16
COPY package*.json /src/
WORKDIR /src
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]