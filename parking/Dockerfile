FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/parking-0.0.1-SNAPSHOT.jar app.jar
COPY lib/payu-java-sdk-1.5.0.jar /app/lib/payu-java-sdk-1.5.0.jar
ENTRYPOINT ["java", "-jar", "app.jar"]