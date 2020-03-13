# if 0
emcc \
-O2 \
-s WASM=1 \
-s EXPORT_ALL=1 \
-s EXTRA_EXPORTED_RUNTIME_METHODS='["__heap_base", ccall", "cwrap"]' \
gify.c -o gify.wasm
exit;
# endif
// --post-js app.js \
// gify.c -o gify.js
// -s MODULARIZE=1 \
// use clang/llc/wasm-ld to get global_base
// clang --target=wasm32 -emit-llvm -c -S gify.c
// llc -march=wasm32 -filetype=obj gify.ll
// wasm-ld --no-entry --export-all -o gify.wasm gify.o

////// notes
// -s LLD_REPORT_UNDEFINED \ for debugging
// -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap", "wasi_snapshot_preview1"]' \
// -s EXPORTED_FUNCTIONS="['_gif', '_printf', '_memory']" \
// -s SIDE_MODULE=1   --- "memory" not exported
// -s STANDALONE_WASM --- requires runtime support for `wasi_snapshot_preview1` printf

// emcc -Os -s WASM=1 -s SIDE_MODULE=1 -s EXPORTED_FUNCTIONS="['_gif']" pnarf.c -o narf.wasm

////////////////
// clang --target=wasm32 -emit-llvm -c -S pnarf.c
// llc -march=wasm32 -filetype=obj pnarf.ll
// wasm-ld --no-entry --export-all -o narf.wasm pnarf.o
////////////////

#include <string.h>
#include <stdlib.h>
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
char * gif(char * msg, int length) { // char * secret_message

	// http://giflib.sourceforge.net/whatsinagif/bits_and_bytes.html
	// static char gif_header[6] = {'G', 'I' ,'F' , '8', '9', 'a' };
  // static char logical_screen_descriptor[7] = { 0x0A, 0x00, 0x0A, 0x00, 0x91, 0x00, 0x00};
	// static char global_color_table[] = {0xFF, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00, 0xFF, 0x00, 0x00, 0x00 };
  // static char image_descriptor[] = {0x2C, 0x00, 0x00, 0x00, 0x00, 0x0A, 0x00, 0x0A, 0x00, 0x00 };
  // // mk this random bytes?
  // static char image_data[] = {0x02, 0x16, 0x8C, 0x2D, 0x99, 0x87, 0x2A, 0x1C, 0xDC, 0x33, 0xA0, 0x02, 0x75, 0xEC, 0x95, 0xFA, 0xA8, 0xDE, 0x60, 0x8C, 0x04, 0x91, 0x4C, 0x01, 0x00 };

  // static char secret_message[12] = "narf brain_";
  // static char signature[7] = "vipyne";

  // static char start_msg[8] = { 0x21, 0x01, 0x05, 'n', 'a', 'r', 'f', 0x00 };

  // static char trailer[] = { 0x3B };


  // static char gif[64] = {'G', 'I' ,'F' , '8', '9', 'a', 0x0A, 0x00, 0x0A, 0x00, 0x91, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00, 0xFF, 0x00, 0x00, 0x00, 0x2C, 0x00, 0x00, 0x00, 0x00, 0x0A, 0x00, 0x0A, 0x00, 0x00, 0x02, 0x16, 0x8C, 0x2D, 0x99, 0x87, 0x2A, 0x1C, 0xDC, 0x33, 0xA0, 0x02, 0x75, 0xEC, 0x95, 0xFA, 0xA8, 0xDE, 0x60, 0x8C, 0x04, 0x91, 0x4C, 0x01, 0x00};
  // static char sec_msg = {0x21, 0x01, 0x05, 's', 'e', 'c', 'r', 'e', 't', ' ', 'n', 'a', 'r', 'f', 0x00, 0x3B};
	char *output = (char*)malloc(sizeof(char) * length);

	for (int i = 1; i < length; i++) {
		output[i] = msg[i];
	}

  return output;
}


