#!/usr/bin/env bash

docker rm -f report-frontend

docker run -d \
  --name report-frontend \
  -p 8888:8080 \
  adesso/report-frontend

docker logs -f report-frontend