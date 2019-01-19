
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