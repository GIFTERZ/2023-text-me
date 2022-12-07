FROM openjdk:11
ARG JAR_FILE="build/libs/*.jar"
COPY ${JAR_FILE} text-me.jar
ENTRYPOINT ["java","-jar","/text-me.jar"]
