#!/bin/bash


echo $(date) $*


print_usage(){
    echo "run.sh"
}


jekyll serve --drafts --livereload
