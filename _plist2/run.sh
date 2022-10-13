#!/bin/bash


echo args=$*
echo $(pwd)
echo $(date)
echo ${PATH}


print_usage(){
    echo "run.sh"
}


export PATH=/usr/local/bin:${PATH}
eval "$(anyenv init -)"


bundle exec jekyll serve --drafts --livereload
