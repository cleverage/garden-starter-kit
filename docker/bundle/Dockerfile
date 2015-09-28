# Bundle
#
# VERSION               0.1

FROM alpine:edge
MAINTAINER Jean-Yves Gastaud "jygastaud@gmail.com"

ENV HOME /root

RUN  apk update \
  && apk --update add ca-certificates ruby ruby-bundler ruby-io-console \
  && rm -rf /var/cache/apk/*

WORKDIR /srv
