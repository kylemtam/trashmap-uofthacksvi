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
let coordsList = []

// wew i know this code is bad
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

class Trash {
    constructor(lat, lng, type, recylable) {
        this.lat = lat;
        this.lng = lng;
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
    var coordsList = []
    //console.log("coordslist is now " + coordsList);
    coords.on("value", function(ss) {
        ss.forEach(el => {
            //thing.push(new google.maps.LatLng(el.val().latlng[0], el.val().latlng[1]));
            let latlng = {
                lat: el.val().lat,
                lng: el.val().lng
            }
            //x = (el.val().latlng[0]);
            //y = (el.val().latlng[1]);
            used = false
            if (coordsList.length >=19) return;
            coordsList.forEach(function(coord){if (coord.lat == latlng.lat && coord.lng == latlng.lng) used = true;})
            if (used) return;
            console.log("pushing " + el.val().lng)
            coordsList.push(latlng);
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
                    " found at " + el.val().lat + 
                    " " + el.val().lng
                );

                infowindow.open(map, this);
            });
            marker.addListener('mouseout', function() {
                infowindow.close();
            });
            bestpath(coordsList);
        });
    })
    //console.log("coordslist is now " + coordsList);

    //console.log("sdlkfsdjf");
    function querydist(coord1, coord2, edgecache){
        //console.log("&" + coord1 + " " + coord2 +" " + edgecache);
        return edgecache[coord1][coord2];
    }
    var cnt=0
    function dfs(currentNode, visited, dp, nxtnode, edgecache, n){
      //console.log(edgecache);
      //console.log(visited + " " + currentNode + " " + n + " " + dp[visited][currentNode] + " " + edgecache);
      //cnt++;
      //if (cnt > 10000) return;
        if (visited&(1<<currentNode)) return (1<<30);
        visited|=(1<<currentNode);
      if (visited === (1<<n)-1){
        return 0;
      }
        if (dp[visited][currentNode]!=(1<<30)){
        return dp[visited][currentNode];
      }
        for(var l = 0; l < n; ++l){
            if (visited&(1<<l)) continue;
            dp[visited][currentNode] = Math.min(dp[visited][currentNode], 
                dfs(l, visited, dp, nxtnode, edgecache, n) + 
                querydist(currentNode, l, edgecache));
        if (dp[visited][currentNode] ===  
                dfs(l, visited, dp, nxtnode, edgecache, n) + 
                querydist(currentNode, l, edgecache)){
                nxtnode[visited][currentNode] = l;
            }
        }
      //console.log("*" + visited, currentNode, dp[visited][currentNode])
        return dp[visited][currentNode];
    }
    function getPath(currentNode, visited, nxtnode, result, n){
        visited|=(1<<currentNode);
        result.push(currentNode);
        if (visited == (1<<n)-1){
            return;
        }
        getPath(nxtnode[visited][currentNode], visited, nxtnode, result, n);
    }
    function bestpath(){
        coordinates = coordsList;
        //returns 2-element array
        //first element = distance 
        //second element = permutation
    /*coordinates = [
        {lat:50, lng:50},
        {lat:40, lng:30}
    ]*/
        /*for (l = 0; l < n; ++l){
            let tmp = []
            for (l2 = 0; l2 < n; ++l2){
                tmp.push(1);
            }
            edgecache.push(tmp)
        }*/
        let edgecache = [];
    console.log(coordinates);
      var service = new google.maps.DistanceMatrixService();
          service.getDistanceMatrix(
            {
              origins: coordinates,
              destinations: coordinates,
              travelMode: 'DRIVING'

              //APIkey:'AIzaSyClqkYGZ8mfGfCZWyHoa-rVsOD30HQJNFQ'
            }, filltable);
          function filltable(response, status){
            //console.log(status);
            //console.log(response);
            if (status == 'OK') {
              let origins = response.originAddresses;
              let destinations = response.destinationAddresses;
              for (let i = 0; i < origins.length; i++) {
                let results = response.rows[i].elements;
                let tmp = []
                for (let j = 0; j < results.length; j++) {
                  let element = results[j];
                  //console.log(element);
                  if (element.status == "ZERO_RESULTS"){
                      tmp.push(10000000);
                      continue;
                  }
                  tmp.push(element.duration.value);
                }
                edgecache.push(tmp);
              }
            }
            var n = edgecache.length;
            var dp = [];
            var nxtnode = [];
            for (l = 0; l < (1<<n); ++l){
                let tmp = [];
                let tmp2 = [];
                for (l2 = 0; l2 < n; ++l2){
                    tmp.push(1<<30);
                    tmp2.push(1<<30);
                }
                dp.push(tmp);
                nxtnode.push(tmp2);
            }
            //console.log("*" + n);
            console.log(edgecache);
            let distance = dfs(0, 0, dp, nxtnode, edgecache, n);
          //return;
            let result = [] 
            getPath(0, 0, nxtnode, result, n);
            //console.log("HIsdfdsfdsf");
            console.log(distance + " " + result)
            
Path = []
for (l = 0; l < n; ++l){
    Path.push(coordinates[result[l]]);
}
var Path = new google.maps.Polyline({
    path: Path,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  Path.setMap(map);
            return [distance, result]
            //console.log(edgecache);
        }
    }
    //bestpath([new google.maps.LatLng(50.087692, 14.421150), new google.maps.LatLng(50.087692, 14.421150), new google.maps.LatLng(50.087692, 14.421150)])
    
}


handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: Geolocation is not supported.' :
        'Error: Your browser is not supported.');
    infoWindow.open(map);
}


/*
Sample api call to get from point a to point b
https://maps.googleapis.com/maps/api/distancematrix/json?origins=Seattle&destinations=San+Francisco&key=AIzaSyCOVl5mQ2vUfw7A9Qdi_xT7OkyOi9CFmdg
*/

// https://maps.googleapis.com/maps/api/distancematrix/json?origins=41.43206,-81.38992 &destinations=33.86748,151.20699&key=AIzaSyCOVl5mQ2vUfw7A9Qdi_xT7OkyOi9CFmdg


// var thing = new google.maps.LatLng(50.087692, 14.421150);