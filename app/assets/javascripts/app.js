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
  $('video').hide()
  $('.my-border').hide()

  $('button.click').on('click', $('form.your-name'), function(event) {

    $('button.click').remove()
    $('input').hide()

    if (navigator.getUserMedia) {
      navigator.getUserMedia({video: true}, function(localMediaStream) {
        var video = document.querySelector('video');
        video.src = window.URL.createObjectURL(localMediaStream);
        $('.your-video').show()
        $('video').show()
        $('.my-border').show()
        asciiInit()
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