FROM golang:1.18-alpine3.15


RUN apk add --update git
RUN apk add --update curl
#RUN apk add --update nodejs npm
#RUN addgroup -S node 
#&& adduser -S root -G node
#USER root
#RUN mkdir api
#WORKDIR /home/node/code
#COPY --chown=root:node /api/package.json ./api
#CMD cd api
#RUN npm ci

#COPY --chown=root:node . .

WORKDIR /app
COPY go.mod .
RUN curl -fLo install.sh https://raw.githubusercontent.com/cosmtrek/air/master/install.sh \
    && chmod +x install.sh && sh install.sh && cp ./bin/air /bin/air
#CMD cd api
#RUN npm install
#RUN npm i -g tiktok-scraper
CMD air