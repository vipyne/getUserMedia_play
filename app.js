
;(function(){
/////////////////////////////
  // TODO: something cool with wasm
  // https://dassur.ma/things/c-to-webassembly/ | https://dassur.ma/things/raw-wasm/
  async function runWASM(inputGif) {
    console.log("_____inputGif ", inputGif)
    // when "function import requires a callable", put func in `env` obj
    const config = {
      module: {},
      env: {
        wasi_snapshot_preview1: function(){},
        puts: function(){},
        memory_base: 0,
        __memory_base: 0,
        table_base: 0,
        memory : new WebAssembly.Memory({ initial: 1 }),
        table: new WebAssembly.Table({
          initial: 0,
          element: 'anyfunc',
        }),
        abort: function(){}
      },
      imports: {
        derp: arg => console.log("_____arg ", arg)
      }
    };

    //// you can't stop trying to make it happen
    fetch('./gify.wasm').then(response =>
      response.arrayBuffer()
    ).then(bytes =>
      WebAssembly.instantiate(bytes, config)
      //// resolves to obj
      // {
      // https://emscripten.org/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html#calling-compiled-c-functions-from-javascript-using-ccall-cwrap
      //   module: WebAssembly.Module, // ccall & cwrap
      //   instance: WebAssembly.Instance
      // }
    ).then(( {instance, module} ) => {
      // https://v8.dev/blog/emscripten-standalone-wasm
      // https://namekdev.net/2019/09/webassembly-cpp-and-webgl-for-js13k-game-jam/
      // https://agniva.me/wasm/2018/05/17/wasm-hard-way.html
      // https://dev.to/azure/passing-structured-data-from-c-to-javascript-in-web-assembly-1i0p
      // https://ariya.io/2019/05/basics-of-memory-access-in-webassembly
      // TODO: look at https://github.com/zeux/meshoptimizer/blob/bdc3006532dd29b03d83dc819e5fa7683815b88e/js/meshopt_decoder.js

      console.log("_____instance.exports ", instance.exports);
      console.log("_____module ", module);
      // when compiled STANDALONE_WASM with `emcc`,
      // instance.exports ===
      // memory: Memory {}
      // gif: ƒ 1() <---------- this is the function in the .c file (with EMSCRIPTEN_KEEPALIVE)
      // _start: ƒ 0()
      // module ===

      // when compiled with `clang | llc | wasm-ld`,
      // instance.exports ===
      // memory: Memory {}
      // gif: ƒ 1() <---------- this is the function in the .c file
      // __wasm_call_ctors: ƒ 0()
      // __dso_handle: Global {}
      // __data_end: Global {}
      // __global_base: Global {}
      // __heap_base: Global {}
      // module ===
      // module: Module {} // imports, exports, customSections

      // mem.length // 2 ^15 w clang - 2 ^22 w emcc

      const mem = new Int8Array(instance.exports.memory.buffer);
      const memBase = instance.exports.__global_base.value;
      const gifFileLength = 76;

      for (let i = 0; i < mem.length; i++) {
        // if (0 !== mem[i]) console.log('not zero in mem: ', i, mem[i])
      }

      const blob = new Blob([
        mem.slice(memBase, memBase + gifFileLength)
      ], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'binary-' + Date.now() + '.gif';
      document.body.appendChild(a);
      a.click();
    });
  }

  // https://stackoverflow.com/a/13240395 // nice slice
  function toHex(d) {
    return ("0"+(Number(d).toString(16))).slice(-2);
  }

  /*
  1. file select gif
  2. copy file into wasm memory
  3. write file back (unchanged)
  4. download file
  5. add comment to file
  6. write original gif (record from video/canvas??) & add comment
  */

  navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

  const inputGifSelector = document.getElementById('input-gif');

  const inputName = document.getElementById('input-name');
  const livideo = document.getElementById('li-video');
  const button = document.getElementById('click');
  const canvas = document.querySelector('canvas');
  const video = document.querySelector('video');
  const vid1 = document.getElementById('your-video');
  const form = document.getElementById('your-name');
  const vid3 = document.getElementById('my-border');
  const name = document.getElementById('name');
  let interval = 0;

  inputGifSelector.addEventListener('change', (event) => {
    const inputGif = event.target.files[0];
    inputGif.arrayBuffer().then((blob) => {
      console.log("_____blob ", blob)
      runWASM(blob);
    })
  }, false);
  // runWASM();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    button.click();
  })

  button.addEventListener('click', (event) => {
    showFrame();
    getMediaStream();
    interval = setInterval(function() {
      videoToCanvas(video, canvas);
    },100);
  });

  hideFrame();
  form.focus();
  livideo.classList.add('mirror-animation');

  // TODO: use webworker for this?
  // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas
  function videoToCanvas(video, canvas) {
    let ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 640, 480);
    let frame = ctx.getImageData(0, 0, 640, 480);
    let l = frame.data.length;

    for (let i = 0; i < l; i+=4) {
      let r = frame.data[i + 0];
      let g = frame.data[i + 1];
      let b = frame.data[i + 2];
      let a = frame.data[i + 3];
      frame.data[i + 3] = 255/2; // semi transparent
      if (r < 100 || g > 200) {
        frame.data[i + 2] = 255;
      }
      if (g < 100 || b > 200) {
        frame.data[i + 0] = 255;
      }
      if (b < 100 || r > 200) {
        frame.data[i + 1] = 255;
      }
    }
    ctx.putImageData(frame, 0, 0);
  }

  async function getMediaStream() {
    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      })
      playStream(stream);
    } catch(e) {
      console.log("_____getMediaStream error:", e);
    }
  }

  function playStream(stream) {
    video.srcObject = stream;
    video.onloadedmetadata = function(event) {
      video.play();
    }
  }

  function showFrame() {
    vid1.style.display = 'block';
    video.style.display = 'block';
    vid3.style.display = 'block';
    name.append('hi ' + inputName.value + '!')
  }

  function hideFrame() {
    vid1.style.display = 'none'; // yellow
    video.style.display = 'none';
    vid3.style.display = 'none'; // pink
  }

/////////////////////////////
})(window, document);
