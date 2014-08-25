$("#add-hotel").prop('disabled',true);
$("#add-thing").prop('disabled',true);
$("#add-restaurant").prop('disabled',true);

//////////////////////////////////////////////////////////////
//INITIALIZE THE MAP
////////////////////////////////////////////////////////////
google.maps.event.addDomListener(window, 'load', initialize);

//////////////////////////////////////////////////////////////
//POPULATE SELECTS
/////////////////////////////////////////////////////////////
var Activities = function () {

};

Activities.populate = function (array, element) {
    for( var key in array){
        $(element).append("<option>"+array[key].name+"</option>");
    }
};

Activities.populate(all_hotels, "#hotels-select");
Activities.populate(all_things_to_do, "#thing-select");
Activities.populate(all_restaurants, "#restaurant-select");

// for( key in all_hotels){
//     $("#hotels-select").append("<option>"+all_hotels[key]["name"]+"</option>");
// }
// for(key in all_things_to_do){
//     $("#thing-select").append("<option>"+all_things_to_do[key]["name"]+"</option>");
// }
// for(key in all_restaurants){
//     $("#restaurant-select").append("<option>"+all_restaurants[key]["name"]+"</option>");
// }

// debugger;
///////////////////////////////////////////////////////////////
//ADD TO PLAN BTNS
///////////////////////////////////////////////////////////////
$( "#add-hotel" ).click(function() {
    var title = $("#hotels-select").val();
    addPlace(title, all_hotels, 'hotel');
    $("#hotels-ul").append('<li>'+title+'</li>');
    $("#add-hotel").prop('disabled',true);
});

$( "#add-thing" ).click(function() {
    var title = $("#thing-select").val();
    addPlace(title, all_things_to_do, 'thingsToDo');
    $("#things-ul").append('<li>'+title+'</li>');
});

$( "#add-restaurant" ).click(function() {
    var title = $("#restaurant-select").val();
    addPlace(title, all_restaurants, 'restaurants');
    $("#restaurants-ul").append('<li>'+title+'</li>');
    if(plan.days[plan.activeDay].restaurants.length === 3){
            $("#add-restaurant").prop('disabled',true);
    }
});

///////////////////////////////////////////////////////////////////////////
//ADD DAY BTN
////////////////////////////////////////////////////////////////////////////
$( "#add-day-btn" ).click(function() {
    plan.addDay();
    var count = plan.days.length;

    $('#add-day-btn').before("<button type=\"button\" class=\"btn btn-default\" id=\""+count+"\"> Day "+count+"</button>");

    $('#add-day-btn').prev().on('click', function () {
        $('#day-btn-group').children('.btn').each(function(index, elem) {
            $(elem).removeClass('active');
        });
        clearMarkers();
        plan.activeDay = this.id-1;
        $("#itenerary-title").html("Plan for Day "+parseInt(plan.activeDay+1));
        $(this).addClass('active');
        $('#hotels-ul').empty();
        $('#things-ul').empty();
        $('#restaurants-ul').empty();
        $("#add-thing").prop('disabled',false);


        var hotel = plan.days[this.id-1].hotel[0];
        if(hotel != undefined){

            $("#hotels-ul").append('<li>'+hotel.name+'</li>');
            $("#add-hotel").prop('disabled',true);
        }else{
            $("#add-hotel").prop('disabled',false);
        }

        var things = plan.days[this.id-1].thingsToDo;
        for(i = 0; i<things.length; i++){
            $("#things-ul").append('<li>'+things[i].name+'</li>');
        }


        var restaurants = plan.days[this.id-1].restaurants;
        if(restaurants != undefined){

            for(i = 0; i<restaurants.length; i++){
                $("#restaurants-ul").append('<li>'+restaurants[i].name+'</li>');
            }
            if(restaurants.length >= 3){
                $("#add-restaurant").prop('disabled',true);
            }else{
                $("#add-restaurant").prop('disabled',false);
            }
        }else{
            $("#add-restaurant").prop('disabled',false);
        }

        if(plan.days[this.id-1].markers.length >= 1){
            setAllMap(map);
        }

    });
});
