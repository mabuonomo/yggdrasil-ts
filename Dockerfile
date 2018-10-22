FROM node:latest
EXPOSE 3000 27017
RUN mkdir -p /home/app
WORKDIR /home/app
COPY . /home/app
RUN npm install
RUN npm install bcrypt
CMD ["npm", "start"]