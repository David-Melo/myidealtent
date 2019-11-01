#!/usr/bin/env bash
####################################################

####################################################
## Change Working Directory To laradock
####################################################
cd /opt/myidealtent/docker

####################################################
## Run Docker Commands
####################################################
docker-compose -p myidealtent -f docker-compose-prod.yml build
docker-compose down
docker-compose -p myidealtent -f docker-compose-prod.yml up -d
