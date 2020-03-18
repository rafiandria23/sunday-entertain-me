FROM node:12.16.1-alpine

WORKDIR /usr/local/application

ENV PORT=4000

RUN apk add --no-cache tini

COPY package.json package-lock.json* yarn.lock* ./

RUN npm i -g nodemon

RUN chown -R node:node .

USER node

RUN npm i && npm cache clean --force

COPY . .

EXPOSE 4000

ENTRYPOINT [ "/sbin/tini", "--" ]

CMD ["nodemon", "app.js"]

