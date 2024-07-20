FROM node:20.12-alpine3.18

RUN apk update && apk add git

WORKDIR /app

COPY . .

# RUN apk add --no-cache bash
# RUN source .env || true

ENV connectionString=
ENV PORT=3000
ENV SECRET_KEY=
ENV EXPIRES_TIME=23h
ENV AVATART_DIR=avatars
ENV SENDGRID_API_KEY=
ENV SENDGRID_FROM=
ENV BASE_URL=http://localhost:3000/api

#RUN git clone -b hw06-email https://github.com/oshuster/goit-node-rest-api

#WORKDIR /app/goit-node-rest-api

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]