OPTIONS = MODULARIZE=1 SINGLE_FILE=1 USE_WEBGL2=1 FULL_ES3=1 USE_GLFW=3
SOURCES = $(shell find source -type f \( -iname \*.c -o -iname \*.cpp \))

default: build/index.js

build/index.js: build
	@emcc --bind $(SOURCES) -Iinclude -Iglm -O3 \
		$(addprefix -s $(EMPTY), $(OPTIONS)) -o $^/index.js
	@npm i $^ --silent --no-progress

build: glm/glm
	@mkdir -p $@
	@cd $@ && npm init -y

glm/glm:
	git submodule update --init

clean:
	@npm un build --silent --no-progress
	@rm -rf build

.PHONY: clean