var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
    models.Hotel.find(function(err, hotels) {
        models.Restaurant.find(function(err, restaurants) {
            models.ThingsToDo.find(function(err, thingsToDos) {
                models.DayPlan.find().populate("hotels restaurants thingtodo").exec(function(err, dayPlan){
                    res.render('index', {
                        hotels: hotels,
                        restaurants: restaurants,
                        thingsToDos: thingsToDos,
                        dayPlans: dayPlan,
                        title: "Trip Planner"
                    });
                });
            });
        });
    });
});

//issue after implementation: we do not auto populate page from day plan
router.post('/addHotel',function(req, res){
    //grab hotel from dropdown, grab day from active button

    //update mongo dayplan with hotel on correct day

    //do the same as the get above
});

module.exports = router;
