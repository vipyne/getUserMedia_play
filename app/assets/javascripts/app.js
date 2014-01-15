$(document).ready(function(){
/////////////////////////////

  navigator.getUserMedia  = navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia;

  var errorCallback = function(e) {
    console.log('you said no. bummer.', e)
  }

  $('button.click').on('change', function(event) {
    console.log('clicked')

    navigator.getUserMedia({video: true}, function(localMediaStream) {
      var video = document.querySelector('video');
      video.src = window.URL.createObjectURL(localMediaStream);

      // video.onloadedmetadata = function(e) {
      //   // fun stuff to come
      // }
    }, errorCallback)

    $('p#your_name').css('color', 'blue')
  })

/////////////////////////////
})