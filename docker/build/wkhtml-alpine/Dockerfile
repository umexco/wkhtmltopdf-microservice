FROM surnet/alpine-node-wkhtmltopdf:18.12.1-0.12.6-full

RUN apk update
RUN apk add bash
RUN apk add nano
RUN apk add zip
RUN apk add ttf-dejavu ttf-droid ttf-freefont ttf-liberation

RUN mkdir /var/www
COPY ./ /var/www/wkhtmltopdf-microservice

WORKDIR /var/www/wkhtmltopdf-microservice
RUN npm run build

ENTRYPOINT [ "/var/www/wkhtmltopdf-microservice/start-server.sh" ]
