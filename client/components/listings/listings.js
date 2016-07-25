Template.listings.helpers({
  listingsCollection() {
    //console.log(Listings.find({}, { sort: { createdAt:  -1} }) );
    return Listings.find({}, { sort: { createdAt:  -1} }) ;
  }
});

Template.map.helpers({
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 8
      };
    }
  }

});

Template.map.onRendered(function() {
  GoogleMaps.load({
    v: '3',
    //Authentic Rentflees key: 'AIzaSyC9amBqawUy7qsmaCoQ7eMZkuNxadgn24g',
    key: 'AIzaSyBYV0r7tOHoNY0kKA14nyKxvAxhzZ3v8M8',

    libraries: 'geometry,places'
  });
});
Template.map.onCreated(function() {
  var marker;
  GoogleMaps.ready('map', function(map) {

    marker = new google.maps.Marker(
      {
        position: {lat: -37.8136, lng: 144.9631}, map: map.instance, draggable: true
      });

    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);

    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }
      if (places.length == 1){
        map.instance.panTo(places[0].geometry.location);
        marker.setPosition(places[0].geometry.location);
      console.log(places[0].geometry.location.lat());
      longitude = places[0].geometry.location.lat();
      latitude = places[0].geometry.location.lng();
    //coords = new google.maps.LatLng(latitude,longitude);
    coords = {lat: latitude, lng: longitude};
      console.log(places[0].geometry.location.lng());
      //Implement Search
       var result = Listings.find( { loc : { $near : [longitude,latitude] } } ).fetch();
      console.log(result);
      i = 1;
      result.forEach(function print(obj) {
        while(i < 6)
        {
          console.log("Nearby Entry : " + i++);
          console.log(obj); 
          //marker.setPosition(coords);



        }
      });



      }
    });

    google.maps.event.addListener(map.instance, 'click', function(event) {
      marker.setPosition(event.latLng);
    });
  });
});
