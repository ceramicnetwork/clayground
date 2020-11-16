#!/bin/bash
# Stop all containers
containers=$(docker ps -a -q --filter="name=clayground*")
if [ -n "$containers" ] ; then
        docker stop $containers
fi
# Delete all containers
containers=$(docker ps -a -q --filter="name=clayground*" )
if [ -n "$containers" ]; then
        docker rm -f -v $containers
fi
# Delete all images
images=$(docker images "clayground*")
if [ -n "$images" ]; then
        docker rmi -f $images
fi
