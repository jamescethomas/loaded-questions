#!/usr/bin/env bash

#
# Build the jar
#
mvn package

#
# Build the application container image
#
echo "Building Loaded Questions application image"
docker build -f docker/images/application/Dockerfile -t loadedquestions-app .

#
# Build the static frontend nginx server
#
echo "Building Loaded Questions static frontend server image"
docker build -f docker/images/frontend/Dockerfile -t loadedquestions-frontend .
# docker run --name loadedquestions-frontend -d -p 3000:80 loadedquestions-frontend

#
# Start the containers
#
bash ./docker/docker-up.sh