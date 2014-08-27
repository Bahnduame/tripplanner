var express = require('express');
var router = express.Router();
var models = require('../models');

router.post('/addDay/:daynum', function(req,res){
  var day_num = req.params.daynum;
  models.DayPlan.create({day_num: day_num}, function(err, day){
        res.json(day);
  });
});

router.post('/:dayId/attractions',function(req,res){
    //get variables
    var dayID = req.params.dayId;
    var attractionID = req.body.attraction_id;
    var type = req.body.attraction_type;

    models.DayPlan.findById(dayID, function(err,doc){
        //set new shit
        doc[type].push(attractionID);
        doc.save(function(err,doc){
            console.log("sweet, sweet victory!");
        })
    })
});


router.get('/', function(req,res){
  //...list all days...
});

module.exports = router;
