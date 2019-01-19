let map, infoWindow;

function initMap() {
	let latitude, longitude;
	let myLatLng = {lat: latitude, lng: longitude};

 	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 50, lng: 256},
		zoom: 3.8
  	});
  	infoWindow = new google.maps.InfoWindow;

  	// Try HTML5 geolocation.
  	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
	  	let pos = {
			lat: position.coords.latitude,
			lng: position.coords.longitude,
		};
		infoWindow.setPosition(pos);
		infoWindow.setContent('Location found');
	  	infoWindow.open(map);
	  	map.setCenter(pos);
	  	map.setZoom(15);
	}, function() {
		handleLocationError(true, infoWindow, map.getCenter());
	});
  	} else {
	// Browser doesn't support Geolocation
	handleLocationError(false, infoWindow, map.getCenter());
  	}

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  	infoWindow.setPosition(pos);
  	infoWindow.setContent(browserHasGeolocation ?
		'Error: Geolocation is not supported.' :
		'Error: Your browser is not supported.');
	  infoWindow.open(map);
}
