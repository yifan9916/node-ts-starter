#! /bin/bash

set -a
[[ -f .env ]] && source .env
set +a

echo "Installing dependencies..."
docker compose run ${SERVICE_NAME} pnpm install

if [[ $1 == build ]]
then
  echo "Starting container with build..."
  docker compose up --build
else
  echo "Starting container..."
  docker compose up
fi
