#!/usr/bin/env bash

#
# Docker compose
#

docker-compose \
    -f "docker/containers/mongodb-arm.yaml" \
    -f "docker/containers/application.yaml" \
    -f "docker/containers/frontend.yaml" \
    up --build -d

echo "Complete"
