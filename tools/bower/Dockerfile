# Bower
#
# VERSION               0.1

FROM cleverage/nodejs
MAINTAINER Jean-Yves Gastaud "jygastaud@gmail.com"

ENV HOME /root

RUN  apk update \
  && rm -rf /var/cache/apk/* \
  && npm install -g bower

WORKDIR /srv

