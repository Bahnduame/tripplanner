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

Day.prototype.addActivity = function(type, id) {
    this[type].push(findbyId(type, id));
};

function addDay(){
    curDay = new Day();
    plan.push(curDay);
};

function addPlace(title, from, type){
    for (var i = from.length - 1; i >= 0; i--) {
        if(from[i].name == title){
            var lat = from[i].place[0].location[0];
            var lon = from[i].place[0].location[1];
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

var findbyId = function(type, id){
    if(type == 'hotel'){
        activities = all_hotels;
    }else if(type == 'thingsToDo'){
        activities = all_things_to_do;
    }else if(type == 'restaurants'){
        activities = all_restaurants
    }
    for (var i = activities.length - 1; i >= 0; i--) {
        if(activites[i].id == id){
            return activities[i];
        }
    }
}

// day view class
// days class
// activities view class
// function appendToPlan