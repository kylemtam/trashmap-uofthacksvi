// you know its good when everything is in one file <3

let map, infoWindow, marker, messagewindow;


firebase.initializeApp({
    apiKey: "AIzaSyClqkYGZ8mfGfCZWyHoa-rVsOD30HQJNFQ",
    authDomain: "uofthacks18.firebaseapp.com",
    databaseURL: "https://uofthacks18.firebaseio.com",
    projectId: "uofthacks18",
    storageBucket: "uofthacks18.appspot.com",
    messagingSenderId: "33526292057"
});

const db = firebase.database();
const coords = db.ref("coords/");

class Trash {
    constructor(lng, lat, type, recylable) {
        this.latlng = [lng, lat];
        this.type = type;
        this.recylable = recylable;
    }
}

let path = db.ref("coords/").push(
    new Trash(60, 256, "wrapper", false)
);

initMap = () => {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 60,
            lng: 256
        },
        zoom: 4
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
        handleLocationError(false, infoWindow, map.getCenter());
    }

    infowindow = new google.maps.InfoWindow({
        content: document.getElementById('form')
    });

    messagewindow = new google.maps.InfoWindow({
        content: document.getElementById('message')
    });

    coords.on("value", function(ss) {
        ss.forEach(el => {
            let latlng = {lat: el.val().latlng[0], lng: el.val().latlng[1]}
            console.log(latlng);
            marker = new google.maps.Marker({
                position: latlng,
                map: map
            });
        });
    })
}

handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: Geolocation is not supported.' :
        'Error: Your browser is not supported.');
    infoWindow.open(map);
}
