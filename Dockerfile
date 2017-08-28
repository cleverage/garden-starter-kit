FROM node:6.5.0

# Install Ruby and RubyGems
RUN apt-get update && apt-get install -y \
  ruby-full \
  rubygems

# Install bundler
RUN gem install bundler

# Clean up APT.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Add an gsk user because bower doesn’t like being root
RUN adduser --disabled-password --gecos "" gsk && \
  echo "gsk ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

RUN chown -R gsk:gsk /usr/src/app

USER gsk

ENV PATH ./node_modules/.bin:$PATH

EXPOSE 8000 3001

CMD ["npm", "install"]
