#!/bin/bash

declare -a STORES=( "cas" "ceramic" "ipfs" "ganache" "local" )

DATA_PATH=data/default/

CLAYGROUND_BIN_PATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 || exit ; pwd -P )"
CLAYGROUND_ROOT_PATH="$(dirname "$CLAYGROUND_BIN_PATH")"

array_contains() {
  local STORE=$1
  shift
  local IN=1
  for ELEMENT; do
    if [[ $ELEMENT == "$STORE" ]]; then
      IN=0
      break
    fi
  done
  return $IN
}

if [ -z "$1" ]; then
  printf -v stores '%s,' "${STORES[@]}"
  echo "Store not specified. Stores: [${stores%?}]" >&2
  exit 1
fi

[[ -d "$CLAYGROUND_ROOT_PATH/$DATA_PATH$1" ]] && rm -rf "$CLAYGROUND_ROOT_PATH/$DATA_PATH$1"

echo "$CLAYGROUND_ROOT_PATH/$DATA_PATH$1 storage removed"
