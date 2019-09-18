const getLocation = () => {
  navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    // console.log(lat, lng);
    document.getElementById("lat").value = lat;
    document.getElementById("lng").value = lng;
  });
};
