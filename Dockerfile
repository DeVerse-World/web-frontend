FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
# Bundle app source
COPY . ./

RUN npm install
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start" ]