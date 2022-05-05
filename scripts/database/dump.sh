#!/bin/sh
DATE=`date +%d-%m-%y_%H-%M-%S`
mkdir -p ./database/dumps/
docker exec -t -u postgres postgres_container pg_dumpall -c > ./database/dumps/structure_${DATE}.sql
