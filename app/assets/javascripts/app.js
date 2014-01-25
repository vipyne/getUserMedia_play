$(document).ready(function(){
/////////////////////////////

  navigator.getUserMedia  = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

  var errorCallback = function(e) {
    console.log('you said no. bummer.', e)
  }

  $('.your-video').hide()

  $('button.click').on('click', $('form.your-name'), function(event) {

    $('button.click').remove()
    $('input').remove()

    if (navigator.getUserMedia) {
      navigator.getUserMedia({video: true}, function(localMediaStream) {
        var video = document.querySelector('video');
        video.src = window.URL.createObjectURL(localMediaStream);
        $('.your-video').show()
        // video.onloadedmetadata = function(e) {
        //   // fun stuff to come
        // }
        }, errorCallback)
    } else {
      document.write("sorry, you don't gots a camera")
    }
  })

/////////////////////////////
})