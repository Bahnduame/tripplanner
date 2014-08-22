var plan =[];
//////////////////////////////////////////////////////////////
//INITIALIZE THE MAP
////////////////////////////////////////////////////////////
var ourmap;
function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(40.7075, -74.0112),
          zoom: 15,
        };
        ourmap = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
};
google.maps.event.addDomListener(window, 'load', initialize);

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
    $("#hotels-ul").append('<li>'+$("#hotel-select").val()+'</li>');
    var lat,lon;
    for (var i = all_hotels.length - 1; i >= 0; i--) {
        if(all_hotels[i].name == $("#hotel-select").val()){
            lat = all_hotels[i].place[0].location[0];
            lon = all_hotels[i].place[0].location[1];
            plan[0].hotel=all_hotels[i]._id.toString()
            break;
        }
    }

    var myLatlng = new google.maps.LatLng(lat, lon);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: ourmap,
        title:$("#hotel-select").val()
    });
    google.maps.event.addListener(marker, 'click',function toggleBounce() {
          if (marker.getAnimation() != null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
    });
});

$( "#add-thing" ).click(function() {
    $("#things-ul").append('<li>'+$("#thing-select").val()+'</li>');
    var lat,lon;
    for (var i = all_things_to_do.length - 1; i >= 0; i--) {
        if(all_things_to_do[i].name == $("#thing-select").val()){
            lat = all_things_to_do[i].place[0].location[0];
            lon = all_things_to_do[i].place[0].location[1];
            plan[0].things[plan[0].things.length]=all_things_to_do[i]._id.toString();
            break;
        }
    }

    var myLatlng = new google.maps.LatLng(lat, lon);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: ourmap,
        title:$("#thing-select").val()
    });
        google.maps.event.addListener(marker, 'click',function toggleBounce() {
          if (marker.getAnimation() != null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
    });
});

$( "#add-restaurant" ).click(function() {
    $("#restaurants-ul").append('<li>'+$("#restaurant-select").val()+'</li>');
        var lat,lon;
    for (var i = all_restaurants.length - 1; i >= 0; i--) {
        if(all_restaurants[i].name == $("#restaurant-select").val()){
            lat = all_restaurants[i].place[0].location[0];
            lon = all_restaurants[i].place[0].location[1];
            plan[0].restaurants[plan[0].restaurants.length]=all_restaurants[i]._id.toString();
            break;
        }
    }

    var myLatlng = new google.maps.LatLng(lat, lon);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: ourmap,
        title:$("#restaurant-select").val()
    });
        google.maps.event.addListener(marker, 'click',function toggleBounce() {
          if (marker.getAnimation() != null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
    });
});