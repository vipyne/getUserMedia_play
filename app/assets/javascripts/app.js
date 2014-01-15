$(document).ready(function(){
/////////////////////////////

  navigator.getUserMedia  = navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia;

  var errorCallback = function(e) {
    console.log('you said no. bummer.', e)
  }

  $('button.click').on('click', 'input[type=text]', function(event) {
    console.log(this.val())
    console.log("*****************************************")
    console.log($(this))
    console.log('clicked')
    // debugger

    navigator.getUserMedia({video: true}, function(localMediaStream) {
      var video = document.querySelector('video');
      video.src = window.URL.createObjectURL(localMediaStream);

      // video.onloadedmetadata = function(e) {
      //   // fun stuff to come
      // }
    }, errorCallback)

  })



  // $('button.work-click').on('change', function(event) {
  //   console.log(this)
  //   console.log('clicked')

  //   navigator.getUserMedia({video: true}, function(localMediaStream) {
  //     var video = document.querySelector('video');
  //     video.src = window.URL.createObjectURL(localMediaStream);

  //     // video.onloadedmetadata = function(e) {
  //     //   // fun stuff to come
  //     // }
  //   }, errorCallback)

  // })
/////////////////////////////
})