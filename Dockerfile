FROM node:10
LABEL maintener=Dinara
WORKDIR /api
COPY ./package.json   /api
COPY ./src  /api
COPY ./lib /api
COPY ./index.js /api
RUN npm install
USER node
CMD node index.js
EXPOSE 3000
