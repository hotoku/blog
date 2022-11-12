#!/bin/bash


echo args=$*
echo $(pwd)
echo $(date)
echo ${PATH}


print_usage(){
    echo "run.sh"
}


if [[ $(hostname) = "hotoku-macmini-2020.local" ]]; then
    export PATH=/opt/homebrew/bin:${PATH}
else
    export PATH=/usr/local/bin:${PATH}
fi
eval "$(anyenv init -)"


bundle exec jekyll serve --drafts --livereload
