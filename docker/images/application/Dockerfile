FROM openjdk:10-jre
COPY target/loadedquestions-1.0.0.jar /opt/loadedquestions/bin/
EXPOSE 8080/tcp
CMD ["java", "-jar", "/opt/loadedquestions/bin/loadedquestions-1.0.0.jar"]