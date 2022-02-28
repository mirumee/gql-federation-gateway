FROM node:16
ENV POLLING_INTERVAL=6000

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 4000
CMD [ "node", "service.js" ]
