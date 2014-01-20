$(function() {
/////////////////////////////

  $('form.click').on('submit', function(event) {
    var source = $('#your-name').html()
    var template = Handlebars.compile(source)
    debugger

    $.ajax({
      url: "/",
      type: 'POST',
      data: { name: "your name"} // this.serialize()
    })
      .done(function(data){
        console.log("data ", data)
        $('.name').html(template(data))
    })
  })
  // var context = { name: "your name"}


/////////////////////////////
})