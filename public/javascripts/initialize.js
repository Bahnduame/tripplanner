var plan =[],
    activeDay=0;
plan[0]={};
$('#day1').addClass('active');
//////////////////////////////////////////////////////////////
//INITIALIZE THE MAP
////////////////////////////////////////////////////////////
var map;
var markersArray = [];
markersArray.length=0;
function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(40.7075, -74.0112),
          zoom: 15,
        };
        map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
};
google.maps.event.addDomListener(window, 'load', initialize);

// function clearOverlays() {
//   for (var i = 0; i < markersArray.length; i++ ) {
//     markersArray[i].setMap(null);
//   }
//   markersArray.length = 0;
// }

function clearMarkers() {
  setAllMap(null);
}

function setAllMap(map) {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(map);
  }
}

function addMarker(marker) {
    markersArray.push(marker);
    marker.setMap(map);
}

function deleteMarkers() {
  clearMarkers();
  markersArray = [];
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
            plan[activeDay].hotel=all_hotels[i]._id.toString()
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
//day buttons
//////////////////////////////////////////////////////////////////////////
$( "#day2" ).click(function() {
    deleteMarkers();
    $('#hotels-ul').empty();
    $('#things-ul').empty();
    $('#restaurants-ul').empty();

    $('#day1').removeClass('active');
    $('#day2').addClass('active');
});