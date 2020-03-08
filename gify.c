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
	// http://giflib.sourceforge.net/whatsinagif/bits_and_bytes.html
	// static char gif_header[6] = {'G', 'I' ,'F' , '8', '9', 'a' };
 //  static char logical_screen_descriptor[7] = { 0x0A, 0x00, 0x0A, 0x00, 0x91, 0x00, 0x00};

  static char gif[13] = {'G', 'I' ,'F' , '8', '9', 'a', 0x0A, 0x00, 0x0A, 0x00, 0x91, 0x00, 0x00};
  // static char image_descriptor[] = { 2C 00 00 00 00 0A 00 0A 00 00 };

  // // mk this random bytes?
  // static char image_data[] = { 02 16 8C 2D 99 87 2A 1C DC 33 A0 02 75 EC 95 FA A8 DE 60 8C 04 91 4C 01 00 };

  // static char trailer[] = { 3B };

  return gif;
}
