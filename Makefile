.PHONY: all build-js-tools

# determine platform
ifeq (Boot2Docker, $(findstring Boot2Docker, $(shell docker info)))
  PLATFORM := OSX
else
  PLATFORM := Linux
endif

USER_PROJECT_NAME=cleverage/
DOCKER_FILES_DIRECTORY=./docker

# map user and group from host to container
ifeq ($(PLATFORM), OSX)
  CONTAINER_USERNAME = root
  CONTAINER_GROUPNAME = root
  HOMEDIR = /root
  CREATE_USER_COMMAND =
  COMPOSER_CACHE_DIR = ~/tmp/composer
  BOWER_CACHE_DIR = ~/tmp/bower
else
  CONTAINER_USERNAME = dummy
  CONTAINER_GROUPNAME = dummy
  HOMEDIR = /home/$(CONTAINER_USERNAME)
  GROUP_ID = $(shell id -g)
  USER_ID = $(shell id -u)
  CREATE_USER_COMMAND = \
    addgroup -g $(GROUP_ID) $(CONTAINER_GROUPNAME) && \
    adduser -u $(USER_ID) -h $(HOMEDIR) -G $(CONTAINER_GROUPNAME) $(CONTAINER_USERNAME) -D &&
  COMPOSER_CACHE_DIR = /var/tmp/composer
	BOWER_CACHE_DIR = /var/tmp/bower
endif

# map SSH identity from host to container
DOCKER_SSH_IDENTITY ?= ~/.ssh/id_rsa
DOCKER_SSH_KNOWN_HOSTS ?= ~/.ssh/known_hosts
ADD_SSH_ACCESS_COMMAND = \
  mkdir -p $(HOMEDIR)/.ssh && \
  test -e /var/tmp/id && cp /var/tmp/id $(HOMEDIR)/.ssh/id_rsa ; \
  test -e /var/tmp/known_hosts && cp /var/tmp/known_hosts $(HOMEDIR)/.ssh/known_hosts ; \
  test -e $(HOMEDIR)/.ssh/id_rsa && chmod 600 $(HOMEDIR)/.ssh/id_rsa ;

# utility commands
EXECUTE_AS = su -s /bin/sh $(CONTAINER_USERNAME) -c

# If the first argument is one of the supported commands...
SUPPORTED_COMMANDS := build-quick bundle bower composer drush grunt npm
SUPPORTS_MAKE_ARGS := $(findstring $(firstword $(MAKECMDGOALS)), $(SUPPORTED_COMMANDS))
ifneq "$(SUPPORTS_MAKE_ARGS)" ""
  # use the rest as arguments for the command
  COMMAND_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(COMMAND_ARGS):;@:)
endif

all: build-js-tools

build-js-tools: build-nodejs build-grunt build-bundle build-bower

bundle:
	@docker run -ti --rm=true \
		-v `pwd`:/srv \
		$(USER_PROJECT_NAME)bundle /bin/sh -ci '\
			$(CREATE_USER_COMMAND) \
			$(ADD_SSH_ACCESS_COMMAND) \
			$(EXECUTE_AS) "bundle $(COMMAND_ARGS)"'

build-bundle:
	cd $(DOCKER_FILES_DIRECTORY)/bundle && docker build -t $(USER_PROJECT_NAME)bundle .

bower:
	@docker run -ti --rm=true \
		-v `pwd`:/srv \
		-v $(BOWER_CACHE_DIR):$(HOMEDIR)/.bower \
		-v $(DOCKER_SSH_IDENTITY):/var/tmp/id \
		-v $(DOCKER_SSH_KNOWN_HOSTS):/var/tmp/known_hosts \
		$(USER_PROJECT_NAME)bower /bin/sh -ci '\
			$(CREATE_USER_COMMAND) \
			$(ADD_SSH_ACCESS_COMMAND) \
			$(EXECUTE_AS) "bower --allow-root \
			--config.interactive=false \
			--config.storage.cache=$(HOMEDIR)/.bower/cache \
			--config.storage.registry=$(HOMEDIR)/.bower/registry \
			--config.storage.empty=$(HOMEDIR)/.bower/empty \
			--config.storage.packages=$(HOMEDIR)/.bower/packages $(COMMAND_ARGS)"'

build-bower:
	cd $(DOCKER_FILES_DIRECTORY)/bower && docker build -t $(USER_PROJECT_NAME)bower .

grunt:
	@docker run -ti --rm=true \
		-v `pwd`:/srv \
		$(USER_PROJECT_NAME)grunt /bin/sh -ci '\
			$(CREATE_USER_COMMAND) \
			$(ADD_SSH_ACCESS_COMMAND) \
			$(EXECUTE_AS) "grunt $(COMMAND_ARGS)"'

build-grunt:
	cd $(DOCKER_FILES_DIRECTORY)/grunt && docker build -t $(USER_PROJECT_NAME)grunt .

npm:
	@docker run -ti --rm=true \
		-v `pwd`:/srv \
		$(USER_PROJECT_NAME)nodejs /bin/sh -ci '\
			$(CREATE_USER_COMMAND) \
			$(ADD_SSH_ACCESS_COMMAND) \
			$(EXECUTE_AS) "npm $(COMMAND_ARGS)"'

build-nodejs:
	cd $(DOCKER_FILES_DIRECTORY)/nodejs && docker build -t $(USER_PROJECT_NAME)nodejs .
