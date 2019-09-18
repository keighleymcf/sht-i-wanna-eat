// let mapLat = "";
// let mapLng = "";
// const getMapLocation = () => {
//   navigator.geolocation.getCurrentPosition(function(position) {
//     mapLat = position.coords.latitude;
//     mapLng = position.coords.longitude;
//   });
//   console.log(mapLat, mapLng);
// };

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 52.520008,
      lng: 13.404954
    },
    zoom: 14,
    styles: mapStyles
  });
  infoWindow = new google.maps.InfoWindow();
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(pos);

        infoWindow.setPosition(pos);
        infoWindow.setContent("you are here");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }

  map.controls[google.maps.ControlPosition.TOP_LEFT];
}
