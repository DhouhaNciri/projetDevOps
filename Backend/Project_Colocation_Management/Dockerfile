
FROM openjdk:17-jdk-alpine


ARG JAR_FILE=target/Project_Colocation_Management.jar

COPY ${JAR_FILE} app.jar

ENV PORT=9090


EXPOSE 9090


VOLUME /tmp


ENTRYPOINT ["java", "-jar", "/app.jar"]
