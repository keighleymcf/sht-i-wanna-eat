document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(position => {

//     const center = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude
//     };
//     console.log('center: ', center)
//     // User granted permission
//     // Center the map in the position we got
//   }, function () {
//     // If something goes wrong
//     console.log('Error in the geolocation service.');
//   });
// } else {
//   // Browser says: Nah! I do not support this.
//   console.log('Browser does not support geolocation.');
// }

const map = new google.maps.Map(document.getElementById('map'), {
  center: {
    lat: 52.52437,
    lng: 13.41053
  },
  zoom: 13,
  styles: [{
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#444444"
    }]
  }, {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [{
      "color": "#f2f2f2"
    }]
  }, {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "road",
    "elementType": "all",
    "stylers": [{
      "saturation": -100
    }, {
      "lightness": 45
    }]
  }, {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [{
      "visibility": "simplified"
    }]
  }, {
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [{
      "color": "#46bcec"
    }, {
      "visibility": "on"
    }]
  }]
});