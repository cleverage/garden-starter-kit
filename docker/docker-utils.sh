#!/bin/bash

# Shorcut for Docker
# Usage: docker-utils.sh [TYPE] [PARAM]
#    TYPES
#      - co : Actions on containers
#      - im : Actions on images
#
#    PARAMS
#      - trash: Special case that doesn't need a TYPE.
#               Remove all images and all containers.
#      - clean: Special case that doesn't need a TYPE.
#               Remove all non commited images and stopped containers.
#      - stopall: Stop all containers.
#      - rms : Remove all already stopped containers.
#      - rmall: Stop and Remove all containers.
#
# Note: functions are used so we need to run a terminal which support them.

#
# Check for parameters
#
if [ -z "${1}" ]
then
  echo "
  No type provided.

  Types available:
    - co : Actions on containers
    - im : Actions on images
  "
  exit 1
elif [ ! "${1}" = "clean" ] || [ ! "${1}" = "trash" ]
then
  type=${1}
fi

if [ "${1}" = "clean" ] || [ "${1}" = "trash" ]
then
  action=${1}
elif [ -z "${2}" ]
then
  echo "
  No params provided.

  Params available:
     - trash: Special case that doesn't need a TYPE.
              Remove all images and all containers.
     - clean: Special case that doesn't need a TYPE.
              Remove all non tagged images and stopped containers.
     - stopall: Stop all containers
     - rms : Remove all already stopped containers or all non used images.
     - rmall: Stop and Remove all containers or images.
  "
  exit 1
else
  action=${2}
fi

#
# Utility functions.
#
function remove-images {
  docker rmi ${@}
}

function remove-images-unused {
  remove-images $(docker images -q --filter "dangling=true")
}

function remove-images-all {
  remove-images -f $(docker images -aq)
}

function remove-containers {
  docker rm ${@}
}

function remove-containers-stopped {
  remove-containers $(docker ps --filter 'status=exited' -q)
}

function remove-containers-all {
  remove-containers $(docker stop $(docker ps -aq))
}

function stop-containers {
  docker stop ${1}
}


#
# Core actions.
#

if [ "${action}" = "clean" ]
then
  remove-containers-stopped
  remove-images-unused
  exit 0
elif [ "${action}" = "trash" ]
then
  remove-containers-all
  remove-images-all
  exit 0
fi

if [ "${type}" = "co" ]
then
  if [ "${action}" = "stopall" ]
  then
    stop-containers $(docker ps -aq)
    exit 0
  elif [ "${action}" = "rms" ]
  then
    remove-containers-stopped
    exit 0
  elif [ "${action}" = "rmall" ]
  then
    remove-containers-all
    exit 0
  fi
fi

if [ "${type}" = "im" ]
then
  if [ "${action}" = "rms" ]
  then
    remove-images-unused
    exit 0
  elif [ "${action}" = "rmall" ]
  then
    remove-images-all
    exit 0
  fi
fi

exit 1
