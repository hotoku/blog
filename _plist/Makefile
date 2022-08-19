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
	@if [[ -z "$(IMAGE)" ]]; then echo "variable IMAGE is empty. abort"; false; fi
	@if ! docker image inspect $(IMAGE) > /dev/null 2>&1; then docker pull $(IMAGE); fi


.PHONY: clean
clean: unload
	rm -f $(PLIST)


$(PLIST): $(PLIST).jinja
	jinja2 -D pwd=$(PWD) \
		-D container=$(CONTAINER) \
		-D label=$(subst .plist,,$(PLIST)) \
		-D docker=$(DOCKER) \
		-D image=$(IMAGE) \
		$< > $@
