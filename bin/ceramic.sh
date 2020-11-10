#!/bin/bash

# waits for the docker container to finish
function wait_container() {
  ID=$1
  CONTAINER=${ID:0:12}

  docker ps | grep -q "$CONTAINER"
  STATUS=$?

  while [ "$STATUS" -eq 0 ]; do
    sleep .1
    docker ps | grep -q "$CONTAINER"
    STATUS=$?
  done
}

FILE="$(pwd)/data/local/.ceramic/config.json"
if [ ! -e  "$FILE" ]; then
  mkdir -p "$(pwd)/data/local"
  ID=$(echo "cd packages/ceramic-cli && ./bin/ceramic.js config set ceramicHost http://host.docker.internal:7007" | docker run -i -a stdin --mount src="$(pwd)"/data/local,target=/root,type=bind clayground_js-ceramic /bin/bash)
  wait_container "$ID"
fi

CMD=''
for i in "$@"; do
  i="${i//\\/\\\\}"
  CMD="$CMD \"${i//\"/\\\"}\""
done

ID=$(echo "cd packages/ceramic-cli && ./bin/ceramic.js $CMD" | docker run -i -a stdin --mount src="$(pwd)"/data/local,target=/root,type=bind clayground_js-ceramic /bin/bash)
wait_container "$ID"

docker logs "$ID"
