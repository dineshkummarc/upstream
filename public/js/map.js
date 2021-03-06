$(function() {
  w4lls.load_map = function() {
    var initialLocation = new google.maps.LatLng(52.52, 13.37);
    var myOptions = {
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: initialLocation,
      scrollwheel: false,
      navigationControl: true,
      navigationControlOptions: {
        position: google.maps.ControlPosition.RIGHT
      },
      scaleControl: true,
      scaleControlOptions: {
        position: google.maps.ControlPosition.BOTTOM
      }
    };
    
    w4lls.map = new google.maps.Map(document.getElementById("map"), myOptions);
    google.maps.event.addListener(w4lls.map, 'zoom_changed', w4lls.load_apartments);
    google.maps.event.addListener(w4lls.map, 'dragend', w4lls.load_apartments);
    
    w4lls.load_apartments();
  };
  
  w4lls.show_apartment = function(apartment, map) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(apartment.lat, apartment.lng),
      title: apartment.title,
      icon: new google.maps.MarkerImage('http://' + w4lls.host + '/img/w4lls_custom_marker.png')
    });
    marker.apartment = apartment;
    w4lls.apartments.push(marker);

    google.maps.event.addListener(marker, 'click', function() {
      location.hash = '/apartments/' + apartment._id;
    });
    
    marker.setMap(map);
  };
  
  w4lls.clear_apartments = function() {
    w4lls.apartments.forEach(function(apartment) {
      apartment.setMap(null);
    });
  };
  
  w4lls.load_apartments = function(map, filters) {
    map = map || w4lls.map;

    var url = '/apartments',
      bounds = map.getBounds();
    if(bounds) {
      var shared = $('#filters .shared'),
        entire = $('#filters .entire'),
        min_price = $("#price_range").slider("values", 0),
        max_price = $("#price_range").slider("values", 1),
        min_space = $('#space_range').slider("values", 0),
        max_space = $('#space_range').slider("values", 1),
        tags = $('.tagEditor li').map(function() { return $(this).text(); }).toArray().join(',');
      url = '/apartments?north=' + bounds.T.b + '&south=' + bounds.T.c + 
        '&west=' + bounds.L.b + '&east=' + bounds.L.c +
        '&price_min=' + min_price + '&price_max=' + max_price +
        '&size_min=' + min_space + '&size_max=' + max_space +
        '&tags=' + tags;
    };

    $.get(url, function(apartments) {
      w4lls.clear_apartments();
      apartments.forEach(function(apartment) {
          w4lls.show_apartment(apartment, map);
      });
      $(window).trigger('apartments-loaded');
    });
  };
  
  w4lls.load_map();
  
  $(window).bind('hashchange', function() {
    if(location.hash.match(/apartments\/.+/)) {
      var apartment_id = location.hash.split('/')[2];
      var apartment = _(w4lls.apartments).detect(function(marker) {
        return marker.apartment._id == apartment_id;
      }).apartment;
      w4lls.show_details(apartment);
    };
  });

  $(window).bind('apartments-loaded', (function() {
    var first = true;
    return function() {
      if(first) {
        $(window).trigger('hashchange');
        first = false;
      };
    };
  })())
  
  $(window).bind('reload-apartments', (function() {
    var counter = 0;
    return function() {
      counter += 1;
      window.setTimeout(function() {
        counter -= 1;
        if(counter == 0) {
          w4lls.load_apartments();
        };
      }, 400);
    };
  })());
});