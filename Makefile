OPTIONS = MODULARIZE=1 SINGLE_FILE=1 USE_WEBGL2=1 FULL_ES3=1 USE_GLFW=3
SOURCES = $(shell find source -type f \( -iname \*.c -o -iname \*.cpp \))

default: build/index.js

build/index.js: build
	@emcc --bind $(SOURCES) -Iinclude -O3 \
		$(addprefix -s $(EMPTY), $(OPTIONS)) -o $^/index.js
	@npm i $^ --silent --no-progress

build:
	@mkdir -p $@
	@cd $@ && npm init -y
	

clean:
	@npm un build --silent --no-progress
	@rm -rf build

.PHONY: clean