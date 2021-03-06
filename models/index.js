var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tripplanner');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Place, Hotel, ThingsToDo, Restaurant, DayPlan;
var Schema = mongoose.Schema;

var placeSchema = new Schema({
  address: String,
  city: String,
  state: String,
  phone: String,
  location: [Number, Number]
});

var hotelSchema = new Schema({
  name: String,
  place: [placeSchema],
  num_stars: Number,
  amenities: String
});

var thingToDoSchema = new Schema({
  name: String,
  place: [placeSchema],
  age_range: String
});

var restaurantSchema = new Schema({
  name: String,
  place: [placeSchema],
  cuisine: String,
  num_stars: Number
});

var dayPlanSchema = new Schema({
    day_num: Number,
    hotels: [{type: Schema.Types.ObjectId, ref:'Hotel' }],
    thingtodo: [{type: Schema.Types.ObjectId, ref:'ThingsToDo' }],
    restaurants: [{type: Schema.Types.ObjectId, ref:'Restaurant' }]
});

Place = mongoose.model('Place', placeSchema);
Hotel = mongoose.model('Hotel', hotelSchema);
ThingsToDo = mongoose.model('ThingsToDo', thingToDoSchema);
Restaurant = mongoose.model('Restaurant', restaurantSchema);
DayPlan = mongoose.model('DayPlan', dayPlanSchema);


module.exports = {"Place": Place, "Hotel": Hotel, "ThingsToDo": ThingsToDo, "Restaurant": Restaurant, "DayPlan": DayPlan};