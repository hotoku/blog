#!/bin/bash


echo $(date) $*
echo ${PATH}


print_usage(){
    echo "run.sh"
}


export PATH=/usr/local/bin:${PATH}
source $(brew --prefix)/opt/chruby/share/chruby/chruby.sh
source $(brew --prefix)/opt/chruby/share/chruby/auto.sh


jekyll serve --drafts --livereload
