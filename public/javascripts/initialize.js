
var plan =[],
    activeDay=0;
function addDay(){
    plan.push({
        hotel:[],
        thingsToDo:[],
        restaurants:[],
        markers:[]
    });
};
//////////////////////////////////////////////////////////////
//INITIALIZE THE MAP
////////////////////////////////////////////////////////////
var map;
function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(40.7075, -74.0112),
          zoom: 15,
        };
        map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
};
google.maps.event.addDomListener(window, 'load', initialize);

function clearMarkers() {
  setAllMap(null);
}

function setAllMap(map) {
  for (var i = 0; i < plan[activeDay].markers.length; i++) {
    plan[activeDay].markers[i].setMap(map);
  }
}

function addMarker(marker) {
    plan[activeDay].markers.push(marker);
    marker.setMap(map);
}

function setAllMap(map) {
      for (var i = 0; i < plan[activeDay].markers.length; i++) {
        plan[activeDay].markers[i].setMap(map);
      }
}
//////////////////////////////////////////////////////////////
//POPULATE SELECTS
/////////////////////////////////////////////////////////////
for(key in all_hotels){
    $("#hotel-select").append("<option>"+all_hotels[key]["name"]+"</option>");
}
for(key in all_things_to_do){
    $("#thing-select").append("<option>"+all_things_to_do[key]["name"]+"</option>");
}
for(key in all_restaurants){
    $("#restaurant-select").append("<option>"+all_restaurants[key]["name"]+"</option>");
}


///////////////////////////////////////////////////////////////
//ADD TO PLAN BTNS
///////////////////////////////////////////////////////////////
$( "#add-hotel" ).click(function() {
    var lat,lon;
    for (var i = all_hotels.length - 1; i >= 0; i--) {
        if(all_hotels[i].name == $("#hotel-select").val()){
            lat = all_hotels[i].place[0].location[0];
            lon = all_hotels[i].place[0].location[1];
            plan[activeDay].hotel[0]=all_hotels[i];
            break;
        }
    }
        $("#hotels-ul").append('<li>'+$("#hotel-select").val()+'</li>');
        var myLatlng = new google.maps.LatLng(lat, lon);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title:$("#hotel-select").val()
        });
        // google.maps.event.addListener(marker, 'click',function toggleBounce() {
        //       if (marker.getAnimation() != null) {
        //         marker.setAnimation(null);
        //       } else {
        //         marker.setAnimation(google.maps.Animation.BOUNCE);
        //       }
        // });
        addMarker(marker);
    $("#add-hotel").prop('disabled',true);
});

$( "#add-thing" ).click(function() {
    $("#things-ul").append('<li>'+$("#thing-select").val()+'</li>');
    var lat,lon;
    for (var i = all_things_to_do.length - 1; i >= 0; i--) {
        if(all_things_to_do[i].name == $("#thing-select").val()){
            lat = all_things_to_do[i].place[0].location[0];
            lon = all_things_to_do[i].place[0].location[1];
            if(plan[activeDay].things === undefined){
                plan[activeDay].things=[];
                plan[activeDay].things[0]=all_things_to_do[i]._id.toString();
            }else{
                plan[activeDay].things[plan[activeDay].things.length]=all_things_to_do[i]._id.toString();
            }
            break;
        }
    }

    var myLatlng = new google.maps.LatLng(lat, lon);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title:$("#thing-select").val()
    });
    // google.maps.event.addListener(marker, 'click',function toggleBounce() {
    //       if (marker.getAnimation() != null) {
    //         marker.setAnimation(null);
    //       } else {
    //         marker.setAnimation(google.maps.Animation.BOUNCE);
    //       }
    // });
    addMarker(marker);
});

$( "#add-restaurant" ).click(function() {
    var lat,lon;
    for (var i = all_restaurants.length - 1; i >= 0; i--) {
        if(all_restaurants[i].name == $("#restaurant-select").val()){
            lat = all_restaurants[i].place[0].location[0];
            lon = all_restaurants[i].place[0].location[1];
            if(plan[activeDay].restaurants === undefined){
                plan[activeDay].restaurants=[];
                plan[activeDay].restaurants[0]=all_restaurants[i]._id.toString();
            }else{
                plan[activeDay].restaurants[plan[activeDay].restaurants.length || 0]=all_restaurants[i]._id.toString();
            }
            break;
        }
    }
    $("#restaurants-ul").append('<li>'+$("#restaurant-select").val()+'</li>');
    var myLatlng = new google.maps.LatLng(lat, lon);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title:$("#restaurant-select").val()
    });
    // google.maps.event.addListener(marker, 'click',function toggleBounce() {
    //     if (marker.getAnimation() != null) {
    //         marker.setAnimation(null);
    //     } else {
    //         marker.setAnimation(google.maps.Animation.BOUNCE);
    //     }
    // });

    addMarker(marker);
    if(plan[activeDay].restaurants.length === 3){
        $("#add-restaurant").prop('disabled',true);
    }
});

///////////////////////////////////////////////////////////////////////////
//ADD DAY BTN
////////////////////////////////////////////////////////////////////////////
$( "#add-day-btn" ).click(function() {
    addDay();
    var count = plan.length;
    $('#add-day-btn').before("<button type=\"button\" class=\"btn btn-default\">Day "+count+"</button>");
    $('#add-day-btn').prev().on('click', function () {
        $('#day-btn-group').children('.btn').each(function(index, elem) {
            $(elem).removeClass('active');
        });
        //this may not work
        //this.addClass('active');
        //clearMarkers();
        $('#hotels-ul').empty();
        $('#things-ul').empty();
        $('#restaurants-ul').empty();
        //add existing markers and elems to dom for the active day
        var hotel = plan[plan.length-1].hotel[0]
        if(hotel != undefined){
            $("#hotels-ul").append('<li>'+hotel.name+'</li>');
            $("#add-hotel").prop('disabled',true);
        }else{
            $("#add-hotel").prop('disabled',false);
        }

        var things = plan[plan.length-1].thingsToDo;
        if(things != undefined){
            for(i = 0; i<things.length; i++){
                $("#things-ul").append('<li>'+things[i].name+'</li>');
            }
        }

        var restaurants = plan[plan.length-1].restaurants;
        if(restaurants != undefined){
            for(i = 0; i<restaurants.length; i++){
                $("#things-ul").append('<li>'+restaurants[i].name+'</li>');
            }
            if(restaurants.length >= 3){
                $("#add-restaurant").prop('disabled',true);
            }else{
                $("#add-restaurant").prop('disabled',false);
            }
        }else{
            $("#add-restaurant").prop('disabled',false);
        }

        if(plan[plan.length-1].markers.length > 1){
            setAllMap();
        }

    });
});