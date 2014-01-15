$(function() {
/////////////////////////////

  var source = $('#your-name').html()
  var template = Handlebars.compile(source)
  var context = {}

  $('.container').html(template({}))

/////////////////////////////
})