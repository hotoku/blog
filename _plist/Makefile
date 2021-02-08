.PHONY: all install


label=info.hotoku.blog


all: install
	launchctl start $(label)


install: $(label).plist stop a
	mkdir -p ~/Library/LaunchAgents
	cp $< ~/Library/LaunchAgents
	launchctl load ~/Library/LaunchAgents/$<


stop:
	if launchctl list | grep $(label); then \
		launchctl unload ~/Library/LaunchAgents/$(label).plist; \
  fi


clean: stop
	rm -f ./$(label).plist ./server.sh
	rm -f ~/Library/LaunchAgents/$(label).plist


%: %.jinja env
	./render -D pwd=$(shell pwd) -D label=$(label) --env=./env $< > $@
