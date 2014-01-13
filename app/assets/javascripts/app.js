$(document).ready(function(){
/////////////////////////////

navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

var video = document.querySelector('video')

$('button.click').on('click', function(event) {
  console.log('clicked')
  var errorCallback = function(e) {
    console.log('you said no. bummer.', e)
  }

  navigator.getUserMedia({video: true}, function(localMediaStream) {
    var video = document.querySelector('video');
    video.src = window.URL.createObjectURL(localMediaStream);

    video.onloadedmetadata = function(e) {
      // fun stuff to come
    };
  }, errorCallback)
})

/////////////////////////////
})