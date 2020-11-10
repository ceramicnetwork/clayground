#!/bin/bash

declare -a STORES=( "cas" "ceramic" "ipfs" "ganache" "local" )

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

[[ -d "$(pwd)/data/$1" ]] && rm -rf "$(pwd)/data/$1"

echo "$(pwd)/data/$1 storage removed"
