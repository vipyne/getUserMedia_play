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

  static char gif[49] = {'G', 'I' ,'F' , '8', '9', 'a', 0x0A, 0x00, 0x0A, 0x00, 0x91, 0x00, 0x00, 0x2C, 0x00, 0x00, 0x00, 0x00, 0x0A, 0x00, 0x0A, 0x00, 0x00, 0x02, 0x16, 0x8C, 0x2D, 0x99, 0x87, 0x2A, 0x1C, 0xDC, 0x33, 0xA0, 0x02, 0x75, 0xEC, 0x95, 0xFA, 0xA8, 0xDE, 0x60, 0x8C, 0x04, 0x91, 0x4C, 0x01, 0x00, 0x3B};

  // static char image_descriptor[] = {0x2C, 0x00, 0x00, 0x00, 0x00, 0x0A, 0x00, 0x0A, 0x00, 0x00 };
  // // mk this random bytes?
  // static char image_data[] = {0x02, 0x16, 0x8C, 0x2D, 0x99, 0x87, 0x2A, 0x1C, 0xDC, 0x33, 0xA0, 0x02, 0x75, 0xEC, 0x95, 0xFA, 0xA8, 0xDE, 0x60, 0x8C, 0x04, 0x91, 0x4C, 0x01, 0x00 };

  // static char trailer[] = { 0x3B };

  return gif;
}
