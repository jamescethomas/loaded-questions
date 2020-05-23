#!/usr/bin/env bash

#
# Docker composer stop
#

#docker-compose \
#    -f "docker/containers/mongodb.yaml" \
#    -f "docker/containers/application.yaml" \
#    -f "docker/containers/frontend.yaml" \
#    stop

docker-compose \
    -f "docker/containers/mongodb.yaml" \
    stop
