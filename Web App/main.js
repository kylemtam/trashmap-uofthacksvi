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

// wew i know this code is bad
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

class Trash {
    constructor(lng, lat, type, recylable) {
        this.latlng = [lng, lat];
        this.type = type;
        this.recylable = recylable;
    }
}

// this is hard coded, replace this with actual stuff in the future
// let path = db.ref("coords/").push(
//     new Trash(60, 256, "wrapper", false)
// );

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
            map.setZoom(16);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }

    infowindow = new google.maps.InfoWindow({
        content: "",
    });

    messagewindow = new google.maps.InfoWindow({
        content: document.getElementById('message')
    });


    coords.on("value", function(ss) {
        ss.forEach(el => {
            let latlng = {
                lat: el.val().latlng[0],
                lng: el.val().latlng[1]
            }
            marker = new google.maps.Marker({
                position: latlng,
                map: map
            });

            // THIS IS THE ONE PIECE OF CODE I WROTE THAT I THINK IS ACTUALLY WRITTEN PRETTY WELL
            if(["wrapper", "can", "bottle", "chip"].includes(el.val().type))
                marker.setIcon("./media/"+el.val().type+".png")

            // When hovering, displays window
            marker.addListener('mouseover', function() {
                infowindow.setContent(
                    el.val().type.capitalize() + 
                    " found at " + el.val().latlng[0] + 
                    " " + el.val().latlng[1]
                );

                infowindow.open(map, this);
            });

            marker.addListener('mouseout', function() {
                infowindow.close();
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
