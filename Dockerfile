FROM node:8.11
MAINTAINER Lia Kirsch

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY . .

RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]
