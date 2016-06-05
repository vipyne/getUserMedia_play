$(document).ready(function(){
/////////////////////////////

  navigator.getUserMedia  = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

//   (function asciiInit() {
//   var width = 640
//   var height  = 480

//   renderer = new THREE.CanvasRenderer();
//   renderer.setSize( width, height );
//   // container.appendChild( renderer.domElement );

//   effect = new THREE.AsciiEffect( renderer );
//   effect.setSize( width, height );
//   container.appendChild( effect.domElement );

// }());

  var errorCallback = function(e) {
    console.log('you said no. bummer.', e)
  }
  // var userMedia = navigator.getUserMedia;

  $('.your-video').hide()
  $('video').hide()
  $('.my-border').hide()

  $('button.click').on('click', $('form.your-name'), function(event) {

    $('button.click').remove()
    $('input').hide()

    if (navigator.getUserMedia) {
      navigator.getUserMedia({video: { 'optional': [{ width: 200}, {height: 200 }] } }, function(localMediaStream) {
        var video = document.querySelector('video');
        video.src = window.URL.createObjectURL(localMediaStream);
        $('.your-video').show()
        $('video').show()
        $('.my-border').show()
        // asciiInit()
        var source = $('#your-name').html()
        var template = Handlebars.compile(source)
        var data = {
          name: $('input.wtf').val()
        }
        $('.name').append(template(data))
        }, errorCallback)
    } else {
      document.write("sorry, you don't gots a camera")
    }
  })

/////////////////////////////
})
