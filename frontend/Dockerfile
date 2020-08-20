FROM node:12-alpine
RUN mkdir -p /usr/src/app
ADD package.json /usr/src/app
ADD package-lock.json /usr/src/app
WORKDIR /usr/src/app
RUN npm install
ADD public /usr/src/app/public
ADD src /usr/src/app/src
EXPOSE 3000
CMD npm start