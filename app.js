;(function(){
/////////////////////////////

  // TODO: something cool with wasm
  // https://dassur.ma/things/c-to-webassembly/ | https://dassur.ma/things/raw-wasm/
  async function run() {
    const {instance} = await WebAssembly.instantiateStreaming(
      fetch("./somethingcool.wasm")
    );
    const r = instance.exports.somethingcool('arg1', 'arg2');
    console.log(r);
  }
  // run();


  navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

  const vid1 = document.getElementById('your-video');
  const video = document.querySelector('video');
  const canvas = document.querySelector('canvas');
  const vid3 = document.getElementById('my-border');
  const name = document.getElementById('name');
  const inputName = document.getElementById('input-name');
  const form = document.getElementById('your-name');
  const button = document.getElementById('click');
  const livideo = document.getElementById('li-video');
  let interval = 0;

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
