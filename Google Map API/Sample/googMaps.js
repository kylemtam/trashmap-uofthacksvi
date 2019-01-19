let map, infoWindow, marker, messagewindow;

function initMap() {
	let latitude, longitude;
	let myLatLng = {lat: latitude, lng: longitude};

 	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 50, lng: 256},
		zoom: 7
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
		infowindow = new google.maps.InfoWindow({
			content: document.getElementById('form')
		});

		messagewindow = new google.maps.InfoWindow({
			content: document.getElementById('message')
		});

		google.maps.event.addListener(map, 'click', function(event) {
			marker = new google.maps.Marker({
			position: event.latLng,
			map: map
			});
		});


			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map, marker);
				form.hidden = false;
			});

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  	infoWindow.setPosition(pos);
  	infoWindow.setContent(browserHasGeolocation ?
		'Error: Geolocation is not supported.' :
		'Error: Your browser is not supported.');
	  infoWindow.open(map);
}

/*
	 function saveData() {
		 let Location = escape(document.getElementById('Location').value);
		 let type = document.getElementById('type').value;
		 let latlng = marker.getPosition();
		 let url = 'phpsqlinfo_addrow.php?Location=' + Location +
							 '&type=' + type + '&lat=' + latlng.lat() + '&lng=' + latlng.lng();

		 downloadUrl(url, function(data, responseCode) {

			 if (responseCode == 200 && data.length <= 1) {
				 infowindow.close();
				 messagewindow.open(map, marker);
			 }
		 });
	 }

	 function downloadUrl(url, callback) {
		 let request = window.ActiveXObject ?
				 new ActiveXObject('Microsoft.XMLHTTP') :
				 new XMLHttpRequest;

		 request.onreadystatechange = function() {
			 if (request.readyState == 4) {
				 request.onreadystatechange = doNothing;
				 callback(request.responseText, request.status);
			 }
		 };

		 request.open('GET', url, true);
		 request.send(null);
	 }

	 function doNothing () {
	 }
*/
