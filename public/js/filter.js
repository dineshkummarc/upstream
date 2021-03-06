$(function() {
  var reload_with_given_address = function(evt) {
    $.get('/geolocation?q=' + escape($('#searchform #s').val()), function(geolocation) {
      var location = new google.maps.LatLng(geolocation.lat, geolocation.lng);
      w4lls.map.setCenter(location);
      w4lls.map.setZoom(15);
    });
    evt.preventDefault();
    evt.stopPropagation();
  };
  $('#searchform').submit(reload_with_given_address);
  $('#searchform #s').change(reload_with_given_address);
  
  var price_slider = $("#price_range");
	price_slider.slider({
		range: true,
		min: 10,
		max: 2000,
		step: 50,
		values: [10, 2000],
		slide: function(event, ui) {
			$("#price_amount").text('€ ' + ui.values[0] + ' - € ' + ui.values[1]);
			$(window).trigger('reload-apartments');
		}
	});
	
	var space_slider = $('#space_range');
	space_slider.slider({
		range: true,
		min: 0,
		max: 200,
		step: 5,
		values: [0, 200],
		slide: function(event, ui) {
			$("#space_amount").text(ui.values[0] + ' m²' + ' - ' + ui.values[1] + ' m²');
			$(window).trigger('reload-apartments');
		}
	});
	
	var min = price_slider.slider("values", 0),
	  max = price_slider.slider("values", 1);
	$("#price_amount").text('€ ' + min + ' - € ' + max);

	var min = space_slider.slider("values", 0),
	  max = space_slider.slider("values", 1);
	$("#space_amount").text(min + ' m²' + ' - ' + max + ' m²');
		
});
