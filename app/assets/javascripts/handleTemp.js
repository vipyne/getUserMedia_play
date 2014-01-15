$(function() {
/////////////////////////////

  var source = $('#your-name').html()
  var template = Handlebars.compile(source)
  var context = { gila: "your name"}

  $('.name').html(template(context))

/////////////////////////////
})