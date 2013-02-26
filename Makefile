SHELL := /bin/bash

test:
	@mocha -R spec test.js

hint:
	@jshint index.js package.json test.js

# UglifyJS v1.3.4
min:
	@echo -n ';' > kwargs.min.js; uglifyjs -nc kwargs.js >> kwargs.min.js;

.PHONY: test hint min
