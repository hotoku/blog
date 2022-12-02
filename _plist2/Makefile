DEST := ~/Library/LaunchAgents
PLIST := info.hotoku.blog.plist
PWD := $(shell pwd)


.PHONY: load
load: $(PLIST) unload
	cp $< $(DEST)
	launchctl load $(DEST)/$<


.PHONY: unload
unload:
	launchctl unload $(DEST)/$(PLIST)
	rm -f $(DEST)/$(PLIST)


.PHONY: clean
clean: unload
	rm -f $(PLIST)
	rm -f jekyll.log jekyll.err


%: %.jinja
	jinja2 -D pwd=$(PWD) \
		-D label=$(subst .plist,,$(PLIST)) \
		$< > $@
