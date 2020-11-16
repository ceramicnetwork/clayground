#!/bin/bash

CLAYGROUND_BIN_PATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 || exit ; pwd -P )"
CLAYGROUND_ROOT_PATH="$(dirname "$CLAYGROUND_BIN_PATH")"

echo "$CLAYGROUND_ROOT_PATH"

cd "$CLAYGROUND_ROOT_PATH/components/ceramic" || exit

npm run bootstrap
npm run build
