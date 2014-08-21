for(key in all_hotels){
    $("#hotel-dropdown").append("<option>"+all_hotels[key]["name"]+"</option>");
}
for(key in all_things_to_do){
    $("#thing-dropdown").append("<option>"+all_things_to_do[key]["name"]+"</option>");
}
for(key in all_restaurants){
    $("#restaurant-dropdown").append("<option>"+all_restaurants[key]["name"]+"</option>");
}
