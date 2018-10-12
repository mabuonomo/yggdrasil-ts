FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
COPY config.json.dist /usr/src/app/dist/config.json
RUN npm install
RUN npm install bcrypt
EXPOSE 3000
CMD [ "npm", "start"]