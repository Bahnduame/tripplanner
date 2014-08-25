/////////////////////////////////////////////////////////////////
//MAP STUFF
////////////////////////////////////////////////////////////////
var map;
function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(40.7075, -74.0112),
          zoom: 15,
        };
        map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
};

function clearMarkers() {
  setAllMap(null);
}

function setAllMap(mapinput) {
  for (var i = 0; i < plan[activeDay].markers.length; i++) {
    plan[activeDay].markers[i].setMap(mapinput);
  }
}

function addMarker(marker) {
    plan[activeDay].markers.push(marker);
    marker.setMap(map);
}

////////////////////////////////////////////////////////////////////////
//Plan and day data
//////////////////////////////////////////////////////////////////////
var plan =[],
    activeDay=0;

var Day = function() {
    this.hotel = [];
    this.thingsToDo = [];
    this.restaurants = [];
    this.markers = [];
};

function addDay(){
    curDay = new Day();
    plan.push(curDay);
};

function addPlace(title,from, dayProp){
    for (var i = from.length - 1; i >= 0; i--) {
        if(from[i].name == title){
            var lat = from[i].place[0].location[0];
            var lon = from[i].place[0].location[1];

            if(dayProp == 'hotel'){
                plan[activeDay].hotel.push(from[i]);
            }else if(dayProp == 'thing'){
                plan[activeDay].thingsToDo.push(all_things_to_do[i]);
            }else if(dayProp == 'restaurant'){
                plan[activeDay].restaurants.push(all_restaurants[i]);
            }
            break;
        }
    }
    var myLatlng = new google.maps.LatLng(lat, lon);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
    });
    addMarker(marker);
}

// function appendToPlan