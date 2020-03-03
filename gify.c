# if 0
emcc -O3 \
-s WASM=1 \
-s STANDALONE_WASM \
gify.c -o gify.wasm
exit;
# endif


////// notes
// -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap", "wasi_snapshot_preview1"]' \
-s SIDE_MODULE=1 \
// -s EXPORTED_FUNCTIONS="['_narf', '_printf', '_memory']" \

// emcc -Os -s WASM=1 -s SIDE_MODULE=1 -s EXPORTED_FUNCTIONS="['_narf']" pnarf.c -o narf.wasm

// clang --target=wasm32 -emit-llvm -c -S pnarf.c
// llc -march=wasm32 -filetype=obj pnarf.ll
// wasm-ld --no-entry --export-all -o narf.wasm pnarf.o

// emcc -Os -s WASM=1 -s STANDALONE_WASM -s EXPORTED_FUNCTIONS="['_narf']" pnarf.c -o narf.wasm

// -s SIDE_MODULE=1   --- "memory" not exported
// -s STANDALONE_WASM --- requires runtime support for `wasi_snapshot_preview1` printf


// #include <stdio.h>
#include <emscripten.h>
EMSCRIPTEN_KEEPALIVE
char * gif(void) {
	static char gif_header[6] = {'G', 'I' ,'F' , '8', '9', 'a'};
  return gif_header;
}
