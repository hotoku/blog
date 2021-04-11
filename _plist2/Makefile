IMAGE := jekyll/jekyll:4

.PHONY: server
server: image
	docker run --rm --volume="$$PWD/..:/srv/jekyll" -it -p 4001:4000 $(IMAGE) jekyll serve --drafts --incremental

.PHONY: image
image:
	docker pull $(IMAGE)
