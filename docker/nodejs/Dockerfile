# Nodejs
#
# VERSION               0.1

FROM alpine:3.2
MAINTAINER Jean-Yves Gastaud "jygastaud@gmail.com"

ENV HOME /root

# Some npm tools need to compile so we should add dependencies in the image.
RUN  apk update \
  && apk add --update nodejs nodejs-dev git \
  && apk add --update build-base gcc make automake autoconf nasm libpng-dev \
  && npm install -g npm@latest \
  && rm -rf /var/cache/apk/*

WORKDIR /srv
