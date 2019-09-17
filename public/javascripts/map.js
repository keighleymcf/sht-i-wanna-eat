const yelp = require("index")
// yelp search

// document.getElementById("pac-input").onkeyup = () => {
//   const input = document.getElementById("pac-input").value;
//   getRestaurants(input);
// };

// create map

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 52.520008,
      lng: 13.404954
    },
    zoom: 14,
    styles: mapStyles
  })
  infoWindow = new google.maps.InfoWindow;
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      console.log(pos);
      infoWindow.setPosition(pos);
      infoWindow.setContent('you are here');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  var input = document.getElementById("pac-input");
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location,

      }));
      console.log(place.geometry.location.lng())
      console.log(place.geometry.location.lat())

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }

      let googleLng = place.geometry.location.lng(place);
      let yelpLng = 13.37475649999999;
      // let yelpLat = 50510999999999;
      if (googleLng === yelpLng) {
        console.log("yes we are!")
      }

    });
    map.fitBounds(bounds);
  })




  // var autocomplete = new google.maps.places.Autocomplete(input);
  // autocomplete.bindTo("bounds", map);

  // // Specify just the place data fields that you need.
  // autocomplete.setFields(["place_id", "geometry", "name"]);

  // //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // var infowindow = new google.maps.InfoWindow();
  // var infowindowContent = document.getElementById("infowindow-content");
  // infowindow.setContent(infowindowContent);

  // var marker = new google.maps.Marker({
  //   map: map
  // });

  // marker.addListener("click", function () {
  //   infowindow.open(map, marker);
  // });

  // autocomplete.addListener("place_changed", function () {
  //   infowindow.close();

  //   var place = autocomplete.getPlace();

  //   if (!place.geometry) {
  //     return;
  //   }

  //   if (place.geometry.viewport) {
  //     map.fitBounds(place.geometry.viewport);
  //   } else {
  //     map.setCenter(place.geometry.location);
  //     map.setZoom(17);
  //   }
  //   //Set the position of the marker using the place ID and location.
  //   marker.setPlace({
  //     placeId: place.place_id,
  //     location: place.geometry.location
  //   });

  //   marker.setVisible(true);

  //   infowindowContent.children["place-name"].textContent = place.name;
  //   infowindowContent.children["place-id"].textContent = place.place_id;
  //   infowindowContent.children["place-address"].textContent = place.geometry.location;
  //   console.log(place.geometry.location)
  //   infowindow.open(map, marker);
  // })

};





//   // Set the position of the marker using the place ID and location.
//   marker.setPlace({
//     placeId: place.place_id,
//     location: place.geometry.location
//   });

//   marker.setVisible(true);

//   infowindowContent.children["place-name"].textContent = place.name;
//   infowindowContent.children["place-id"].textContent = place.place_id;
//   infowindowContent.children["place-address"].textContent = place.name;
//   infowindow.open(map, marker);
// });




// // search and place functionalities

// infoWindow = new google.maps.InfoWindow();

// // Try HTML5 geolocation.



// // Create the search box and link it to the UI element.
// var input = document.getElementById("pac-input");
// var searchBox = new google.maps.places.SearchBox(input);
// map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

// // Bias the SearchBox results towards current map's viewport.
// map.addListener("bounds_changed", function() {
//   searchBox.setBounds(map.getBounds());
// });

// var markers = [];

// // Listen for the event fired when the user selects a prediction and retrieve
// // more details for that place.
// searchBox.addListener("places_changed", () => {
//   var places = searchBox.getPlaces();

//   if (places.length == 0) {
//     return;
//   }

//   // Clear out the old markers.
//   markers.forEach(marker => {
//     marker.setMap(null);
//   });

//   markers = [];

//   // For each place, get the icon, name and location.
//   var bounds = new google.maps.LatLngBounds();
//   places.forEach(place => {
//     if (!place.geometry) {
//       console.log("Returned place contains no geometry");
//       return;
//     }
//     var icon = {
//       url: place.icon,
//       size: new google.maps.Size(71, 71),
//       origin: new google.maps.Point(0, 0),
//       anchor: new google.maps.Point(17, 34),
//       scaledSize: new google.maps.Size(25, 25)
//     };

//     // Create a marker for each place.
//     markers.push(
//       new google.maps.Marker({
//         map: map,
//         icon: icon,
//         title: place.name,
//         position: place.geometry.location
//       })
//     );

//     if (place.geometry.viewport) {
//       // Only geocodes have viewport.
//       bounds.union(place.geometry.viewport);
//     } else {
//       bounds.extend(place.geometry.location);
//     }

//     //show popup with place info for one place
//     if (places.length === 1) {
//       marker.setPlace({
//         placeId: place.place_id,
//         location: place.geometry.location
//       });

//       marker.setVisible(true);

//       infowindowContent.children['place-name'].textContent = place.name;
//       infowindowContent.children['place-id'].textContent = place.place_id;
//       infowindowContent.children['place-address'].textContent =
//           place.formatted_address;
//       infowindow.open(map, marker);
//     };

//     map.fitBounds(bounds);
//   });
// });