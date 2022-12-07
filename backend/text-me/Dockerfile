FROM openjdk:11
ARG JAR_FILE="build/libs/*.jar"
COPY ${JAR_FILE} text-me.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/text-me.jar"]
