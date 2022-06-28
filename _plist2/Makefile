IMAGE := jekyll/jekyll:4
DEST := ~/Library/LaunchAgents
PLIST := info.hotoku.blog.plist
CONTAINER := hotoku-blog
PWD := $(shell pwd)
DOCKER := $(shell which docker)


.PHONY: load
load: $(PLIST) image unload
	echo docker=$(DOCKER)
	cp $< $(DEST)
	launchctl load $(DEST)/$<

.PHONY: unload
unload: stop
	launchctl unload $(DEST)/$(PLIST)
	rm -f $(DEST)/$(PLIST)

.PHONY: stop
stop:
	docker stop $(CONTAINER) || true

.PHONY: image
image:
	docker pull $(IMAGE)

.PHONY: clean
clean: unload
	rm -f $(PLIST)


%: %.jinja	
	jinja2 -D pwd=$(PWD) \
		-D container=$(CONTAINER) \
		-D label=$(subst .plist,,$(PLIST)) \
		-D docker=$(DOCKER) \
		$< > $@
