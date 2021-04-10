.PHONY: server
server: image
	docker run --rm --volume="$$PWD/..:/srv/jekyll" -it -p 4001:4000 jekyll/jekyll:pages jekyll serve --drafts

.PHONY: image
image:
	docker build . -t hotoku/blog:4
