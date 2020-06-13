#!/usr/bin/env bash

echo "Building React Frontend"
./build_frontend.sh

#
# Build the jar
#
echo "Building Java Backend"
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

#
# Start the containers
#
echo "Starting containers"
arch=$(uname -m)
if [[ $arch == *"arm"* ]];then
	echo "Using ARM"
	bash ./docker/docker-up-arm.sh
else
	bash ./docker/docker-up.sh
fi
