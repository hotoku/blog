#!/bin/zsh


echo args=$*
echo $(pwd)
echo $(date)
echo ${PATH}


print_usage(){
    echo "run.sh"
}


source $HOME/.zshrc
bundle exec jekyll serve --drafts --livereload --port=14000
