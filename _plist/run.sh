#!/bin/bash


echo $(date) $*


CONTAINER=""
WORKDIR=""
DOCKER=""
IMAGE_ID="aecf9b34cb20"


while getopts c:d:e: OPT; do
    case ${OPT} in
        c) CONTAINER=${OPTARG}   ;;
        d) WORKDIR=${OPTARG}     ;;
        e) DOCKER=${OPTARG}      ;;
        ?) print_usage; exit 1   ;;
    esac
done


echo CONTAINER=${CONTAINER}
echo WORKDIR=${WORKDIR}
echo DOCKER=${DOCKER}


print_usage(){
    echo "run.sh -c <container name> -d <working directory> -e <docker executable path>"
}


check_variable(){
    if [ -z "$1" ]; then
        echo $(date) "$2 is missed."
        exit 1;
    fi
}


check_variable "${CONTAINER}" -c
check_variable "${WORKDIR}" -d
check_variable "${DOCKER}" -e


cd ${WORKDIR}
${DOCKER} run \
          --rm\
          --volume=$(pwd):/srv/jekyll \
          -p 4000:4000 \
          --name=${CONTAINER} \
          ${IMAGE_ID} \
          jekyll serve --drafts --livereload
