# Primera fase → "construyo la app"
# Imagen base con Maven + Java 21 para compilar el proyecto
FROM maven:3.9.9-eclipse-temurin-21 AS build

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el pom.xml (dependencias y configuración de Maven)
COPY pom.xml .

# Descargas dependencias (SE CACHEA)
RUN mvn dependency:go-offline

# Copia el código fuente del proyecto
COPY src ./src

# Ejecuta Maven para compilar y generar el .jar (sin tests para ir más rápido)
RUN mvn clean package -DskipTests

#Segunda fase → "ejecuto la app"
#imagen más ligera solo con Java (sin Maven)
FROM eclipse-temurin:21-jre

# Directorio donde se ejecutará la app
WORKDIR /app

# Copia el .jar generado en la fase anterior (build) al contenedor final
COPY --from=build /app/target/*.jar app.jar

# Expone el puerto 8080 (donde corre Spring Boot por defecto)
EXPOSE 8080

# Comando que se ejecuta al arrancar el contenedor
ENTRYPOINT ["java","-jar","app.jar"]