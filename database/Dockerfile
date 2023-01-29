# Create mysql server based on the official image from the dockerhub
FROM mysql:8
# Add a database & root password
ENV MYSQL_DATABASE adventure-time-aws
ENV MYSQL_ROOT_PASSWORD=soccerBalls
# optionnaly, run initial scripts for creating tables 
COPY production-ddl.sql /docker-entrypoint-initdb.d/
EXPOSE 3306