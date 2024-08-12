#!/bin/bash

# kill all processes on port 8080
lsof -ti :8080 | xargs kill -9

# Start the server on localhost:8080
cd ../server
mvn spring-boot:run
