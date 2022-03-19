FROM node:16

# Create app directory
RUN mkdir -p /usr/offbeat_backend
WORKDIR /usr/offbeat_backend

# Install app dependencies
COPY package*.json /usr/offbeat_backend

RUN npm install
# Bundle app source
COPY . /usr/offbeat_backend

EXPOSE 8888
CMD [ "node", "./server.js" ]