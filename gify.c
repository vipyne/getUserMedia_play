# if 0
emcc \
-O2 \
-s WASM=1 \
-s EXPORT_ALL=1 \
-s EXTRA_EXPORTED_RUNTIME_METHODS='["__heap_base", ccall", "cwrap"]' \
gify.c -o gify.wasm
exit;
# endif
// -fsanitize=address \
// -s ALLOW_MEMORY_GROWTH=1 \
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
char * gif(char * gif, int gifLength, char * msg, int msgLength) { // char * secret_message

	// http://giflib.sourceforge.net/whatsinagif/bits_and_bytes.html
	// static char gif_header[6] = {'G', 'I' ,'F' , '8', '9', 'a' };
  // static char logical_screen_descriptor[7] = { 0x0A, 0x00, 0x0A, 0x00, 0x91, 0x00, 0x00};
	// static char global_color_table[] = {0xFF, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00, 0xFF, 0x00, 0x00, 0x00 };
  // static char image_descriptor[] = {0x2C, 0x00, 0x00, 0x00, 0x00, 0x0A, 0x00, 0x0A, 0x00, 0x00 };
  // // mk this random bytes?
  // static char image_data[] = {0x02, 0x16, 0x8C, 0x2D, 0x99, 0x87, 0x2A, 0x1C, 0xDC, 0x33, 0xA0, 0x02, 0x75, 0xEC, 0x95, 0xFA, 0xA8, 0xDE, 0x60, 0x8C, 0x04, 0x91, 0x4C, 0x01, 0x00 };
  // static char trailer[] = { 0x3B };

	// total length == gif length + message length + 3 bytes for message header
	char *output = (char*)malloc(sizeof(char) * (gifLength + 3 + msgLength));

	for (int i = 0; i < gifLength - 1; i++) {
		output[i] = gif[i];
	}

	// secret message header
	static char sec_msg[2] = {0x21, 0x01};
	output[gifLength - 1] = sec_msg[0];
	output[gifLength]     = sec_msg[1];
	output[gifLength + 1] = (char)msgLength;

	for (int i = gifLength + 2; i < gifLength + 3 + msgLength; i++) {
		output[i] = msg[i - (gifLength + 2)];
	}

	// trailer
	output[gifLength + 3 + msgLength - 1] = 0x3B;

  return output;
}


