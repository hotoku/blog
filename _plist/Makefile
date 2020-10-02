.PHONY: all install


label=info.hotoku.blog


all: install
	launchctl start $(label)


install: $(label).plist stop
	cp $< ~/Library/LaunchAgents
	launchctl load ~/Library/LaunchAgents/$<


stop:
	if launchctl list | grep $(label); then \
		launchctl unload ~/Library/LaunchAgents/$(label).plist; \
  fi


clean: stop
	rm ./$(label).plist
	rm ~/Library/LaunchAgents/$(label).plist


%: %.jinja
	jinja2 -D pwd=$(shell pwd) -D label=$(label)  $< > $@
