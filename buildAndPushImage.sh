#!/usr/bin/env bash

STAGE=local ./buildJSAR.sh

docker build -t adesso/report-frontend .
# docker push adesso/report-frontend