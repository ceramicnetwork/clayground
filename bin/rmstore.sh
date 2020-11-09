#!/bin/bash

declare -a STORES=( "cas" "ceramic" "ipfs" "ganache" "local" )

array_contains() {
  local store=$1
  shift
  local in=1
  for element; do
    if [[ $element == "$store" ]]; then
      in=0
      break
    fi
  done
  return $in
}

if [ -z "$1" ]; then
  printf -v stores '%s,' "${STORES[@]}"
  echo "Store not specified. Stores: [${stores%?}]" >&2
  exit 1
fi

[[ -d "$(pwd)/data/$1" ]] && rm -rf "$(pwd)/data/$1"

echo "$(pwd)/data/$1 storage removed"
