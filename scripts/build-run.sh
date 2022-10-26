#! /bin/bash

set -a
[[ -f .env ]] && source .env
set +a

if [[ $1 == buildkit ]]
then
  echo "Building image with BUILDKIT..."
  DOCKER_BUILDKIT=1 docker image build -t ${IMAGE_NAME} .
else
  echo "Building image..."
  docker image build -t ${IMAGE_NAME} .
fi

echo "Starting container..."
docker container run --rm --env-file=.env -p 3000:3000 ${IMAGE_NAME}
