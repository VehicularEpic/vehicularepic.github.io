OPTIONS = USE_WEBGL2=1 FULL_ES3=1 USE_GLFW=3 WASM=1
SOURCES = $(shell find src/native -type f \( -iname \*.c -o -iname \*.cpp \))

default: public/index.js

public/index.js: build
	@mkdir -p public
	@emcc $(shell find build -type f -iname *.o) -O3 \
		$(addprefix -s $(EMPTY), $(OPTIONS)) -o public/index.js

build: $(SOURCES)
	@for file in $^ ; do \
		mkdir -p "$$(echo $$file|sed 's|\(.*\)/.*|\1|; s/src/build/g')" && \
		emcc $$file -Iinclude -O3 \
			-c -o "$$(echo $$file|sed 's/src/build/g; s/\.c.*/\.o/g')" ; \
    done

clean:
	@rm -rf build
	@rm public/index.js
	@rm public/index.wasm

.PHONY: clean