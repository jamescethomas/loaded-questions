# Loaded Questions

Technologies used:
* Java Spring Boot - backend
* MongoDB - database
* ReactJS - frontend
* Docker - deployment

## Dependencies and deployment
This application has the following dependencies:
* Maven - build the backend application jar
* Docker - deploy the application
* npm - required to run frontend tests and build the frontend manually

### Deploy with docker
Make sure docker is running and, in the base directory, run
```bash
sh ./build.sh
```
This script will build the jar and deploy the containers used by the application.
The following containers are used:
* openjdk - web backend
* mongodb - database
* nginx - serve static frontend application

Once the build script finishes the application will be accessible at `http://localhost:3000`

Since the service is running on localhost it is possible for pieces of the application to conflict with existing
services running on the same ports.
Here are the ports used by the application:
* 8080 - backend application
* 27017 - MongoDB
* 3000 - static frontend webserver

### Deploy manually
For convenience the frontend application has been minified in `./frontend/build`.
This can be accomplished manually with the additional requirement of `npm`.
To build the frontend for deployment run do the following:
```bash
cd frontend
npm install
npm run build
```
The frontend can also be run directly for development purposes with the following:
```bash
cd frontend
npm start
```
The frontend can then be access at `http://localhost:3000`.
Please note that since this uses the same port as the docker container used to serve the static frontend,
the ports have the potential to come in conflict with one another.

## Run tests
### Backend tests
Backend tests should be run from the base directory. The tests will also be run when calling the build script.
```bash
mvn test
```
### frontend tests
```bash
cd frontend
npm install
npm test
```
###Important docker commands
```bash
docker exec -it loadedquestions-mongodb mongo
```
docker deploy - update application.propeties to
spring.data.mongodb.host=loadedquestions-mongodb