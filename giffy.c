# if 0
emcc \
-O3 \
giffy.c -o giffy.wasm \
-s WASM=1
exit;
# endif

// -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"], ["ccall"]' \
// -s STANDALONE_WASM \

// -O3 \
// -s EXPORT_ALL=1 \
// -s EXIT_RUNTIME=0 \
// -o giffyGlue.html
// --js-opts 0 \

// #include <stdio.h>
// #include <stdlib.h>
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
void copy_gif_file(int* source, int source_size, int* giffy)
{
  // fseek(source, 0, SEEK_END);
  // int source_size = ftell(source);
  // rewind(source);

  // char *source_buffer = (char*)malloc(sizeof(char) * source_size);

  // for (int i = 0; i < source_size; ++i) {
  //   fread(source_buffer, sizeof(char), source_size, source);
  //   fputc(source_buffer[i], giffy);
  // }
}

EMSCRIPTEN_KEEPALIVE
int main(int argc, char* argv[])
{
  // FILE* source = fopen(argv[2], "rb");
  // FILE* giffy = fopen(argv[3], "wbx");
  // char* secret_message = argv[4];

  // if (*argv[1] == 'e') {
    // encode secret message in file
    // copy_gif_file(source, giffy);
    // write_entire_comment(giffy, secret_message);
    // fclose(giffy);
  // } else if (*argv[1] == 'm') {
  //   printf(" ^^^^ start m\n");
  //   write_header(giffy);
  //   write_compressed_image_data(source, giffy);
  //   write_entire_comment(giffy, secret_message);
  // } else {
  //   // decode secret message in file
  //   parse_out_secret_message(source);
  //   fclose(source);
  // }

  return 0;
}