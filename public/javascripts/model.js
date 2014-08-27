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
}

function clearMarkers() {
  setAllMap(null);
}

function setAllMap(mapinput) {
    // debugger;
  for (var i = 0; i < plan.days[plan.activeDay].markers.length; i++) {
    plan.days[plan.activeDay].markers[i].setMap(mapinput);
  }
}

function addMarker(marker) {
    plan.days[plan.activeDay].markers.push(marker);
    marker.setMap(map);
}

////////////////////////////////////////////////////////////////////////
//Plan and day data
//////////////////////////////////////////////////////////////////////

var plan = new Days();

function Days(){
    this.days=[];
    this.activeDay = 0;
}

Days.prototype.addDay = function(){
    var newDay = new Day();
    this.days.push( newDay);
    return newDay;
};

var Day = function(){
    this.objID;
    this.dayNum;
    this.hotel = [];
    this.thingsToDo = [];
    this.restaurants = [];
    this.markers = [];
};

Day.prototype.addActivity = function(type, id){
    this[type].push(findbyId(type, id));
};

function addPlace(title, from, type){
    // debugger;
    for (var i = from.length - 1; i >= 0; i--) {
        if(from[i].name == title){
            var lat = from[i].place[0].location[0];
            var lon = from[i].place[0].location[1];
            var id=from[i]._id.toString();
        //    debugger;
            plan.days[plan.activeDay][type].push(from[i]);
  //                      debugger;
            break;
        }
    }
    var myLatlng = new google.maps.LatLng(lat, lon);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
    });
  addMarker(marker);
  return id;
}

function pushMarker(title, from, dayNum){
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
   plan.days[dayNum].markers.push(marker);
}

var findbyId = function(type, id){
    if(type == 'hotel'){
        activities = all_hotels;
    }else if(type == 'thingsToDo'){
        activities = all_things_to_do;
    }else if(type == 'restaurants'){
        activities = all_restaurants;
    }
    for (var i = activities.length - 1; i >= 0; i--) {
        if(activities[i].id == id){
            return activities[i];
        }
    }
};

///////////////////////\||\\\\\//////////////////\\/\\\\|||||/////////
////////////////////////////////////////////////////////////////////////|\\\

// var days = [];
// var Day = function() {
//     this.dayNum=days.length+1;
//     this.hotel = [];
//     this.thingsToDo = [];
//     this.restaurants = [];
//     this.markers = [];
//     this.dayView = new DayView(this);
//     this.dayBtnView = new DayBtnView(this);
// };

// Day.prototype.addActivity = function(type, id) {
//     this[type].push(findbyId(type, id));
// };

// var DayView = function(day){
//     this.day = day;
//     this.$el=$(this.render());
//     this.$hotelContainer = this.$el.find('.hotelContainer');
//     this.$thingsToDoContainer = this.$el.find('.thingsToDoContainer');
//     this.$restaurantsContainer = this.$el.find('.restaurantsContainer');
// }

// DayView.prototype.render = function(){
//     return "<div>"+
//                 "<h2>Day "+this.day.dayNum+"</h2>"+
//                 "<p>Hotels</p>"+
//                 "<div class='hotelContainer'></div>"+
//                 "<p>Things to Do</p>"+
//                 "<div class='thingsToDoContainer'></div>"+
//                 "<p>Restaurants</p>"+
//                 "<div class='restaurantsContainer'></div>"+
//             "</div>";
// };

// function Days(){
//     this.days=[];
//     this.activeDay = 0;
// }

// Days.prototype.addDay = function() {
//     var newDay = new Day()
//     this.days.push( newDay);
//     return newDay;
// };

// DayBtnView = function(day){
//     this.day= day;
//     this.$el=$(this.render());
//     //todo add click listener
// }

// DayBtnView.prototype.render = function() {
//     return "<button class='btn'>"+this.day.dayNum+"</button>"
// };
// var DaysView = function(){
//     this.$el=$(this.render());
//     this.$addDay = this.$el.find('.addDay');
//     this.$daysBtnContainer = this.$el.find('.daysBtnContainer');
//     this.$dayBtnContainer = this.$el

//     var self = this;

//     this.$addDay.on('click',function(){
//         var newDay = plan.addDay();
//         self.$daysBtnContainer.append(newDay.dayBtnView.$el);
//     })
// }

// DaysView.prototype.render = function() {
//     return "<div>"+
//                 "<div class ='daysBtnContainer'></div>"+
//                 "<button class='btn addDay'></button>"+
//             "</div>";
// }

// var Activity = function(){

// }

// var ActivityView = function(){

// }